import { createPlatePlugin } from '@udecode/plate/react'
import { elements } from '../../constants'
import { ActionPluginElement } from './component'

export const ActionPlugin = createPlatePlugin({
  key: elements.action.key,
  node: {
    type: elements.action.key,
    isElement: true,
    component: ActionPluginElement,
  },
  parsers: {
    html: {
      serializer: {
        parse: ({}) => `<span>hello</span>`,
      },
      deserializer: {
        parse: ({ element }) => ({ type: elements.action.key, children: [{ text: element?.textContent ?? '' }] }),
      },
    },
  },
})
