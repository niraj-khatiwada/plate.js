export const elements = {
  general: {
    stroke: 'G',
    label: 'General',
    key: 'general',
  },
  heading: {
    stroke: 'H',
    label: 'Heading',
    key: 'heading',
  },
  action: {
    stroke: 'A',
    label: 'Action',
    key: 'action',
  },
  character: {
    stroke: 'C',
    label: 'Character',
    key: 'character',
  },

  dialogue: {
    stroke: 'D',
    label: 'Dialogue',
    key: 'dialogue',
  },
  parenthetical: {
    stroke: 'P',
    label: 'Parenthetical',
    key: 'parenthetical',
  },
  transition: {
    stroke: 'T',
    label: 'Transition',
    key: 'transition',
  },
} as const

export type ElementKey = keyof typeof elements
