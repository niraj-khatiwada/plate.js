import { createPlatePlugin } from '@udecode/plate/react'
import { elements } from '../../constants'
import { CharacterPluginElement } from './component'

export const CharacterPlugin = createPlatePlugin({
  key: elements.character.key,
  node: {
    type: elements.character.key,
    isElement: true,
    component: CharacterPluginElement,
  },
  parsers: {
    html: {
      serializer: {
        parse: ({}) => `<span>hello</span>`,
      },
      deserializer: {
        parse: ({ element }) => ({ type: elements.character.key, children: [{ text: element?.textContent ?? '' }] }),
      },
    },
  },
})
