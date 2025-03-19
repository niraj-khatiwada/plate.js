import { createPlatePlugin } from '@udecode/plate/react'
import { elements } from '../../constants'
import { DialoguePluginElement } from './component'

export const DialoguePlugin = createPlatePlugin({
  key: elements.dialogue.key,
  node: {
    type: elements.dialogue.key,
    isElement: true,
    component: DialoguePluginElement,
  },
  parsers: {
    html: {
      serializer: {
        parse: ({}) => `<span>hello</span>`,
      },
      deserializer: {
        parse: ({ element }) => ({ type: elements.dialogue.key, children: [{ text: element?.textContent ?? '' }] }),
      },
    },
  },
})
