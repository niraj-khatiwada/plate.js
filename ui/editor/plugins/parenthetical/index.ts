import { createPlatePlugin } from '@udecode/plate/react'
import { elements } from '../../constants'
import { ParentheticalPluginElement } from './component'

export const ParentheticalPlugin = createPlatePlugin({
  key: elements.parenthetical.key,
  node: {
    type: elements.parenthetical.key,
    isElement: true,
    component: ParentheticalPluginElement,
  },
  parsers: {
    html: {
      serializer: {
        parse: ({}) => `<span>hello</span>`,
      },
      deserializer: {
        parse: ({ element }) => ({
          type: elements.parenthetical.key,
          children: [{ text: element?.textContent ?? '' }],
        }),
      },
    },
  },
})
