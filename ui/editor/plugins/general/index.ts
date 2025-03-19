import { createPlatePlugin } from '@udecode/plate/react'
import { elements } from '../../constants'
import { GeneralPluginElement } from './component'

export const GeneralPlugin = createPlatePlugin({
  key: elements.general.key,
  node: {
    type: elements.general.key,
    isElement: true,
    component: GeneralPluginElement,
  },
  parsers: {
    html: {
      serializer: {
        parse: ({}) => `<span>hello</span>`,
      },
      deserializer: {
        parse: ({ element }) => ({ type: elements.general.key, children: [{ text: element?.textContent ?? '' }] }),
      },
    },
  },
})
