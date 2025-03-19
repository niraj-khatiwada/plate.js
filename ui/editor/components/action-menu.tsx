import React, { useCallback, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { elements } from '../constants'
import { useStore } from 'zustand'
import { createEditorStore } from '../state'
import { PluginType } from '@/ui/types/plugin'
import {
  DropdownMenuPortal,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { type PlateEditor } from '@udecode/plate-core/react'
import { setBlockType } from '../transforms'
import { useShallow } from 'zustand/shallow'
import { cn } from '@/lib/utils'

const elementsList = Object.entries(elements)

type ActionMenuProps = {
  editor: PlateEditor
  editorStore: ReturnType<typeof createEditorStore>
}

function ActionMenu({ editor, editorStore }: ActionMenuProps) {
  const { isActionMenuOpened, currentBlockId } = useStore(
    editorStore,
    useShallow(({ state }) => ({
      isActionMenuOpened: state.isActionMenuOpened,
      currentBlockId: state.currentBlock?.id,
    })),
  )

  const closeActionMenu = useCallback(() => {
    editorStore.getState().set({ isActionMenuOpened: false })
  }, [])

  const changeBlockType = useCallback((newType: PluginType) => {
    setBlockType(editor, newType, { focus: true })
    editorStore.getState().set({ isActionMenuOpened: false })
  }, [])

  const anchorEl = useMemo(
    () => (isActionMenuOpened ? document.querySelector(`[data-block-id="${currentBlockId}"]`) : null),
    [isActionMenuOpened, currentBlockId],
  )

  const handleKeyStroke = (key: string) => {
    let newBlockType: PluginType | null = null
    switch (key) {
      case elements.general.stroke.toLowerCase(): {
        newBlockType = 'general'
        break
      }
      case elements.heading.stroke.toLowerCase(): {
        newBlockType = 'heading'
        break
      }
      case elements.action.stroke.toLowerCase(): {
        newBlockType = 'action'
        break
      }
      case elements.character.stroke.toLowerCase(): {
        newBlockType = 'character'
        break
      }
      case elements.dialogue.stroke.toLowerCase(): {
        newBlockType = 'dialogue'
        break
      }
      case elements.parenthetical.stroke.toLowerCase(): {
        newBlockType = 'parenthetical'
        break
      }
      case elements.transition.stroke.toLowerCase(): {
        newBlockType = 'transition'
        break
      }
    }
    if (newBlockType) {
      changeBlockType(newBlockType)
    }
  }

  return anchorEl
    ? ReactDOM.createPortal(
        <ActionMenuDropdown
          defaultOpen
          portalContainer={anchorEl}
          onOpenChange={open => {
            if (!open) {
              closeActionMenu()
            }
          }}
          onSelect={element => changeBlockType(element.key)}
          onKeyStroke={handleKeyStroke}
          triggererClassname='absolute top-[2rem] left-0'
          contentClassname='absolute top-0 left-0'
        />,
        anchorEl,
      )
    : null
}

type ActionMenuDropdownProps = {
  children?: React.ReactNode
  defaultOpen?: boolean
  onOpenChange?: (_: boolean) => void
  portalContainer?: Element
  onSelect?: (_: (typeof elements)[keyof typeof elements]) => void
  triggererClassname?: string
  contentClassname?: string
  disableKeyStroke?: boolean
  onKeyStroke?: (key: string) => void
}

export function ActionMenuDropdown({
  children,
  defaultOpen,
  portalContainer,
  onOpenChange,
  onSelect,
  triggererClassname,
  contentClassname,
  disableKeyStroke,
  onKeyStroke,
}: ActionMenuDropdownProps) {
  const renderContent = useMemo(
    () => (
      <DropdownMenuContent
        className={cn('bg-white px-3 py-1 z-[2] w-fit h-fit rounded-md shadow-md', contentClassname)}
      >
        {elementsList.map(([_, element]) => (
          <DropdownMenuItem
            key={element.key}
            onClick={() => {
              onSelect?.(element)
            }}
            className='whitespace-nowrap my-2 text-sm text-black cursor-pointer outline-none hover:text-blue-800'
          >
            {!disableKeyStroke ? (
              <span className='border border-zinc-300 px-1 rounded-[4px] overflow-hidden'>{element.stroke}</span>
            ) : null}{' '}
            {element.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    ),
    [],
  )

  const handleKeyDown = (evt: KeyboardEvent) => {
    onKeyStroke?.(evt.key)
  }

  const handleOnOpenChange = (open: boolean) => {
    onOpenChange?.(open)
    if (!disableKeyStroke) {
      if (open) {
        window.addEventListener('keydown', handleKeyDown)
      } else {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }

  useEffect(() => {
    if (defaultOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return (
    <DropdownMenu defaultOpen={defaultOpen} onOpenChange={handleOnOpenChange}>
      <DropdownMenuTrigger className={cn('outline-none', triggererClassname)}>{children}</DropdownMenuTrigger>
      {portalContainer ? (
        <DropdownMenuPortal container={portalContainer}>{renderContent}</DropdownMenuPortal>
      ) : (
        renderContent
      )}
    </DropdownMenu>
  )
}

export default ActionMenu
