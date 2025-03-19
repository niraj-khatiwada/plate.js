import { NodeIdPlugin } from '@udecode/plate-node-id'
import { BlockSelectionPlugin } from '@udecode/plate-selection/react'
import { ParagraphPlugin, PlateElement } from '@udecode/plate/react'

import { SlashInputPlugin, SlashPlugin } from '../plugins/slash-command'

import { GeneralPlugin } from './general'
import { SlashPluginInputElement } from './slash-command/component'
import { GeneralPluginElement } from './general/component'
import { withProps } from '@udecode/cn'
import { HeadingPlugin } from './heading'
import { HeadingPluginElement } from './heading/component'
import { ActionPlugin } from './action'
import { ActionPluginElement } from './action/component'
import { CharacterPlugin } from './character'
import { CharacterPluginElement } from './character/component'
import { DialoguePlugin } from './dialogue'
import { DialoguePluginElement } from './dialogue/component'
import { ParentheticalPlugin } from './parenthetical'
import { ParentheticalPluginElement } from './parenthetical/component'
import { TransitionPlugin } from './transition'
import { TransitionPluginElement } from './transition/component'

const renderlessPlugins = [NodeIdPlugin, BlockSelectionPlugin]

const uiPlugins = [
  GeneralPlugin,
  HeadingPlugin,
  ActionPlugin,
  CharacterPlugin,
  DialoguePlugin,
  ParentheticalPlugin,
  TransitionPlugin,
  //
  ParagraphPlugin,
  SlashPlugin,
  ...renderlessPlugins,
]

export const plugins = [...uiPlugins]

export const pluginComponents = {
  [GeneralPlugin.key]: GeneralPluginElement,
  [HeadingPlugin.key]: HeadingPluginElement,
  [ActionPlugin.key]: ActionPluginElement,
  [CharacterPlugin.key]: CharacterPluginElement,
  [DialoguePlugin.key]: DialoguePluginElement,
  [ParentheticalPlugin.key]: ParentheticalPluginElement,
  [TransitionPlugin.key]: TransitionPluginElement,
  //
  [ParagraphPlugin.key]: withProps(PlateElement, {
    as: 'p',
    className: 'bg-blue-400',
  }),
  [SlashInputPlugin.key]: SlashPluginInputElement,
}
