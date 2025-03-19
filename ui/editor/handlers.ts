import { EditorHandlers } from '../types/editor'
import { PluginType } from '../types/plugin'
import { elements } from './constants'
import { createEditorStore } from './state'
import { setBlockType } from './transforms'

export const getEditorHandlers: (
  editorStore: ReturnType<typeof createEditorStore>,
) => EditorHandlers = editorStore => ({
  onChange: ({ editor }) => {
    const currentBlock = editor.api.blocks({ mode: 'lowest' })?.[0]?.[0]
    const currentBlockState = editorStore.getState().get('currentBlock')
    if (
      currentBlock &&
      currentBlock?.type in elements &&
      (currentBlockState?.id !== currentBlock?.id || currentBlockState?.type !== currentBlock?.type)
    ) {
      editorStore.getState().set({
        currentBlock: { id: (currentBlock?.id as string) ?? null, type: currentBlock.type as PluginType },
      })
    }
  },
  onKeyDown: ({ editor, event }) => {
    if (event.key === 'Enter') {
      const currentBlock = editor.api.blocks({ mode: 'lowest' })?.[0]?.[0]
      if (currentBlock) {
        const text = currentBlock?.children?.[0]?.text
        if (typeof text === 'string' && text.length === 0) {
          event.preventDefault()
          setBlockType(editor, 'general')
          setTimeout(() => {
            editorStore.getState().set({
              isActionMenuOpened: true,
            })
          }, 100)
        }
      }
    }
  },
})
