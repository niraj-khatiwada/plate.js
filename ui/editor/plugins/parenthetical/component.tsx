'use client'

import React from 'react'

import { withRef } from '@udecode/cn'
import { PlateElement } from '@udecode/plate/react'
import { elements } from '../../constants'
import { cn } from '@/lib/utils'

export const ParentheticalPluginElement = withRef<typeof PlateElement>(({ className, ...props }, ref) => {
  const { children, element } = props

  return (
    <PlateElement
      ref={ref}
      as='p'
      data-slate-value={element.value}
      data-element-type={elements.parenthetical.key}
      className={cn(['relative', className])}
      {...props}
    >
      <div className='bg-purple-200'>{children}</div>
    </PlateElement>
  )
})
