'use client'

import React from 'react'

import { withRef } from '@udecode/cn'
import { type PlateEditor } from '@udecode/plate/react'
import { PlateElement } from '@udecode/plate/react'
import { setBlockType } from '@/ui/editor/transforms'

import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxInput,
  InlineComboboxItem,
} from '@/components/plate-ui/inline-combobox'

import { elements, type ElementKey } from '../../constants'

interface Item {
  icon: React.ReactNode
  type: ElementKey
  onSelect: (editor: PlateEditor, value: ElementKey) => void
  className?: string
  focusEditor?: boolean
  keywords?: string[]
  label: string
}

const elementsList = Object.values(elements)

const items: Item[] = elementsList.map(element => ({
  icon: element.stroke,
  type: element.key,
  keywords: [element.key],
  label: element.label,
  onSelect: (editor, type) => {
    setBlockType(editor, type)
  },
}))

export const SlashPluginInputElement = withRef<typeof PlateElement>(({ className, ...props }, ref) => {
  const { children, editor, element } = props

  return (
    <PlateElement ref={ref} as='span' className={className} data-slate-value={element.value} {...props}>
      <InlineCombobox element={element} trigger='/'>
        <InlineComboboxInput />
        <InlineComboboxContent>
          <InlineComboboxEmpty>No results</InlineComboboxEmpty>
          {items.map(({ focusEditor, icon, keywords, label, type, onSelect, className }) => (
            <InlineComboboxItem
              key={type}
              value={type}
              onClick={() => onSelect(editor, type)}
              label={label}
              focusEditor={focusEditor}
              keywords={keywords}
              className={className}
            >
              <div className='mr-2 text-muted-foreground border border-gray-400 rounded-[4px] m-0 p-0 px-1'>{icon}</div>
              {label}
            </InlineComboboxItem>
          ))}
        </InlineComboboxContent>
      </InlineCombobox>
      {children}
    </PlateElement>
  )
})
