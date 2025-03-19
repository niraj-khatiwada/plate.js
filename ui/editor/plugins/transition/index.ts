import { createPlatePlugin } from '@udecode/plate/react'
import { elements } from '../../constants'
import { TransitionPluginElement } from './component'

export const TransitionPlugin = createPlatePlugin({
  key: elements.transition.key,
  node: {
    type: elements.transition.key,
    isElement: true,
    component: TransitionPluginElement,
  },
  parsers: {
    html: {
      serializer: {
        parse: ({}) => `<span>hello</span>`,
      },
      deserializer: {
        parse: ({ element }) => ({
          type: elements.transition.key,
          children: [{ text: element?.textContent ?? '' }],
        }),
      },
    },
  },
})
