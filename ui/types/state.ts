import { PluginType } from './plugin'

export type EditorBlock = {
  id: string
  type: PluginType
}

export type EditorStoreState = {
  currentBlock: EditorBlock | null
  isActionMenuOpened: boolean
}

type EditorStoreActions = {
  get(): EditorStoreState
  get<K extends keyof EditorStoreState>(key: K): EditorStoreState[K]
  set: (state: Partial<EditorStoreState>) => EditorStoreState
  reset: () => void
}

export type EditorStore = {
  state: EditorStoreState
} & EditorStoreActions
