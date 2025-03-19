import { createPlatePlugin } from '@udecode/plate/react'
import { elements } from '../../constants'
import { HeadingPluginElement } from './component'

export const HeadingPlugin = createPlatePlugin({
  key: elements.heading.key,
  node: {
    type: elements.heading.key,
    isElement: true,
    component: HeadingPluginElement,
  },
  parsers: {
    html: {
      serializer: {
        parse: ({}) => `<span>hello</span>`,
      },
      deserializer: {
        parse: ({ element }) => ({ type: elements.heading.key, children: [{ text: element?.textContent ?? '' }] }),
      },
    },
  },
})
