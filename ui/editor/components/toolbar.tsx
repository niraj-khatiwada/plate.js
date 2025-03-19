import React from 'react'
import { createEditorStore } from '../state'
import { useShallow } from 'zustand/react/shallow'
import { setBlockType } from '../transforms'
import { PlateEditor } from '@udecode/plate/react'
import { useStore } from 'zustand'
import { ActionMenuDropdown } from './action-menu'
import { ChevronDown } from 'lucide-react'

type ToolbarProps = {
  editor: PlateEditor
  editorStore: ReturnType<typeof createEditorStore>
  children?: React.ReactNode
}

function Toolbar({ editor, editorStore, children = null }: ToolbarProps) {
  const currentBlockType = useStore(
    editorStore,
    useShallow(store => store.state.currentBlock?.type),
  )

  return (
    <div className='py-1 min-h-[40px]'>
      {currentBlockType ? (
        <ActionMenuDropdown
          disableKeyStroke
          onSelect={element => setBlockType(editor, element.key)}
          contentClassname='w-full'
        >
          <button className='border border-zinc-200 bg-white px-4 py-1 rounded-md min-w-[160px] shadow-md select-none capitalize text-sm text-left flex items-center'>
            {currentBlockType}
            <ChevronDown size={15} className='ml-auto' />
          </button>
        </ActionMenuDropdown>
      ) : null}
      {children}
    </div>
  )
}

export default Toolbar
