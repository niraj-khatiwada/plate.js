'use client'

import type { PlateEditor } from '@udecode/plate/react'

import { type NodeEntry, type Path, type TElement, PathApi } from '@udecode/plate'
import { ElementKey } from './constants'

export const insertBlock = (editor: PlateEditor, type: ElementKey) => {
  editor.tf.withoutNormalizing(() => {
    const block = editor.api.block()

    if (!block) return

    editor.tf.insertNodes(editor.api.create.block({ type }), {
      at: PathApi.next(block[1]),
      select: true,
    })
  })
}

export const setBlockType = (
  editor: PlateEditor,
  type: ElementKey,
  { at, focus }: { at?: Path; focus?: boolean } = {},
) => {
  editor.tf.withoutNormalizing(() => {
    const setEntry = (entry: NodeEntry<TElement>) => {
      const [node, path] = entry

      if (node.type !== type) {
        editor.tf.setNodes({ type }, { at: path })
        if (focus) {
          editor.tf.focus({ at: path })
        }
      }
    }

    if (at) {
      const entry = editor.api.node<TElement>(at)
      if (entry) {
        setEntry(entry)
      }
    } else {
      const entries = editor.api.blocks({ mode: 'lowest' })
      entries.forEach(entry => setEntry(entry))
    }
  })
}
