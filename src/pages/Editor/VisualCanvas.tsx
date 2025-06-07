import { Layer, Line, Stage } from 'react-konva'
import Konva from 'konva'
import SizeTracker from '../../components/SizeTracker'
import { useEditorState } from './state'
import { useRef } from 'react'

const VisualCanvas = () => {
  const { lines, brushColor, strokeWidth, tool, addLine, updateLine } =
    useEditorState()

  const isDrawing = useRef(false)

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
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
    if (!isDrawing.current || lines.length <= 0) {
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
    const lastLine = lines[lines.length - 1]
    updateLine({
      ...lastLine,
      points: [...lastLine.points, x, y],
    })
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  return (
    <SizeTracker>
      {({ width, height }) => (
        <Stage
          width={width}
          height={height}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
        >
          <Layer>
            {lines.map(({ points, color, width, tool }, index) => {
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
  )
}

export default VisualCanvas
