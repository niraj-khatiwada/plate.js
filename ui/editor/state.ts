import { createStore } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { EditorStore, EditorStoreState } from '../types/state'

const initialItemState: EditorStoreState = {
  currentBlock: null,
  isActionMenuOpened: false,
}

export const createEditorStore = () =>
  createStore<EditorStore>()(
    subscribeWithSelector((set, get) => ({
      state: initialItemState,
      get: ((key?: keyof EditorStoreState) => {
        const state = get().state
        return key ? state[key] : state
      }) as EditorStore['get'],
      set(newState) {
        set(store => {
          return { state: { ...store.state, ...newState } }
        })
        return get().state!
      },
      reset() {
        set({ state: initialItemState })
      },
    })),
  )
