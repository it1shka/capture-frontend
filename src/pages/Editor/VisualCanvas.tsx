import { Stage } from 'react-konva'
import SizeTracker from '../../components/SizeTracker'

const VisualCanvas = () => {
  return (
    <SizeTracker>
      {({ width, height }) => <Stage width={width} height={height}></Stage>}
    </SizeTracker>
  )
}

export default VisualCanvas
