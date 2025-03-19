import { AnyPluginConfig, Nullable, WithAnyKey } from '@udecode/plate'
import { DOMHandlers, OnChange } from '@udecode/plate/react'

export type EditorProps = {
  id: string
  readOnly?: boolean
  draftMode?: boolean
  enableCustomCopy?: boolean
  enableCustomPaste?: boolean
}

export type EditorHandlers = Nullable<
  DOMHandlers<WithAnyKey<AnyPluginConfig>> & {
    onChange?: OnChange<WithAnyKey<AnyPluginConfig>> | undefined
  }
>
