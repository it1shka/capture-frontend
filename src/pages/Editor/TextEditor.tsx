import 'katex/dist/katex.min.css'
import 'suneditor/dist/css/suneditor.min.css'
import SunEditor from 'suneditor-react'
import katex from 'katex'
import { useEditorState } from './state'

const TextEditor = () => {
  const { textContent, setTextContent } = useEditorState()

  return (
    <SunEditor
      placeholder="Start writing your notes here..."
      setContents={textContent}
      onChange={setTextContent}
      height="600px"
      setOptions={{
        buttonList: [
          ['undo', 'redo'],
          ['formatBlock', 'list'],
          ['math', 'subscript', 'superscript'],
          ['table', 'image'],
        ],
        katex: katex,
        showPathLabel: false,
      }}
    />
  )
}

export default TextEditor
