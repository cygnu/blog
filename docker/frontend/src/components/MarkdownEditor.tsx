import React, { useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import marked from 'marked'
// @ts-ignore
import highlight from 'highlightjs'
import 'highlightjs/styles/shades-of-purple.css'


marked.setOptions({
  highlight: function (code, lang) {
    return highlight.highlightAuto(code, [lang.split(':')[0]]).value
  }
})

export const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('')

  return (
    <React.Fragment>
      <SimpleMDE onChange={(e) => setMarkdown(e)} />
      <div>
        <span dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
      </div>
    </React.Fragment>
  )
}
