'use client'

import React, { useRef } from 'react'
import { usePlateEditor, Plate } from '@udecode/plate/react'
import { Editor as PlateEditor, EditorContainer, EditorProps } from './components/editor'
import { plugins, pluginComponents } from './plugins'
import { getEditorHandlers } from './handlers'
import ActionMenu from './components/action-menu'
import { createEditorStore } from './state'
import Toolbar from './components/toolbar'

const value = [
  {
    type: 'heading',
    children: [
      {
        text: 'This is heading',
      },
    ],
  },
  {
    type: 'general',
    children: [
      {
        text: 'This is editable plain text with react and history plugins, just like a <textarea>!',
      },
    ],
  },
  {
    type: 'action',
    children: [
      {
        text: 'This is action',
      },
    ],
  },
  {
    type: 'character',
    children: [
      {
        text: 'This is character',
      },
    ],
  },
  {
    type: 'dialogue',
    children: [
      {
        text: 'This is dialogue',
      },
    ],
  },
  {
    type: 'parenthetical',
    children: [
      {
        text: 'This is parenthetical',
      },
    ],
  },
  {
    type: 'transition',
    children: [
      {
        text: 'This is transition',
      },
    ],
  },
]

function Editor({ id, readOnly }: EditorProps) {
  const editorStore = useRef(createEditorStore()).current

  const editor = usePlateEditor({
    id,
    value,
    plugins: [...plugins],
    override: {
      components: pluginComponents,
    },
    handlers: getEditorHandlers(editorStore),
  })

  return (
    <main className='font-courierPrime w-full relative text-black bg-white px-20'>
      {!readOnly ? <Toolbar editor={editor} editorStore={editorStore} /> : null}
      <Plate editor={editor} readOnly={readOnly}>
        <EditorContainer>
          <PlateEditor
            variant='fullWidth'
            placeholder='Type something...'
            style={{ paddingLeft: 0, paddingRight: 0 }}
          />
          <ActionMenu editor={editor} editorStore={editorStore} />
        </EditorContainer>
      </Plate>
    </main>
  )
}

export default Editor
