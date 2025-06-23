import { Layer, Line, Stage } from 'react-konva'
import Konva from 'konva'
import { useRef } from 'react'
import SizeTracker from '../../components/SizeTracker'
import {
  useEditorState,
  useEditorStateComputedProps,
  useEraseLinesWithConfirmation,
} from './state'
import KeyListener from '../../components/KeyListener'
import { useGetDocumentPermissionQuery } from '../../queries/getDocumentPermission'
import { Route } from '../../routes/editor/$documentId'
import { canEdit } from '../../lib'

const VisualCanvas = () => {
  const { documentId } = Route.useParams()
  const { data: permission } = useGetDocumentPermissionQuery(documentId)
  const editionEnabled = canEdit(permission)

  const {
    brushColor,
    strokeWidth,
    tool,
    addLine,
    updateLine,
    undoLine,
    redoLine,
  } = useEditorState()
  const { activeLines, lastLine } = useEditorStateComputedProps()

  const isDrawing = useRef(false)

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!editionEnabled) {
      return
    }
    const stage = event.target.getStage()
    if (stage === null) {
      return
    }
    const position = stage.getPointerPosition()
    if (position === null) {
      return
    }
    const { x, y } = position
    addLine({
      tool,
      width: strokeWidth,
      color: brushColor,
      points: [x, y],
    })
    isDrawing.current = true
  }

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current || lastLine === null) {
      return
    }
    const stage = event.target.getStage()
    if (stage === null) {
      return
    }
    const position = stage.getPointerPosition()
    if (position === null) {
      return
    }
    const { x, y } = position
    updateLine({
      ...lastLine,
      points: [...lastLine.points, x, y],
    })
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  const eraseLines = useEraseLinesWithConfirmation()

  return (
    <KeyListener
      hotkeys={{
        'meta+z.prevent.stop': undoLine,
        'meta+u.prevent.stop': redoLine,
        'meta+x.prevent.stop': eraseLines,
      }}
    >
      <SizeTracker>
        {({ width, height }) => (
          <Stage
            width={width}
            height={height}
            onMouseDown={event => {
              // TODO: for some reason, when you directly pass
              // TODO: the function, it gets called twice
              // TODO: therefore, we additionally wrap it in another function
              handleMouseDown(event)
            }}
            onMouseMove={event => {
              handleMouseMove(event)
            }}
            onMouseUp={() => {
              handleMouseUp()
            }}
          >
            <Layer>
              {activeLines.map(({ points, color, width, tool }, index) => {
                return (
                  <Line
                    key={index}
                    points={points}
                    stroke={color}
                    strokeWidth={width}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                      tool === 'eraser' ? 'destination-out' : 'source-over'
                    }
                  />
                )
              })}
            </Layer>
          </Stage>
        )}
      </SizeTracker>
    </KeyListener>
  )
}

export default VisualCanvas
