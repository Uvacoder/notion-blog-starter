import * as React from 'react'
import { Block, Body } from 'lib/notion'
import { Paragraph } from './blocks/paragraph'
import { Heading } from './blocks/heading'
import clsx from 'clsx'

export type BlockTypeProps<Type extends Block['type']> = {
  block: Extract<Block, { type: Type }>
  className?: string
}

type StuctureMappedType<T extends Block['type']> = {
  [K in T]: (props: BlockTypeProps<K>) => React.ReactNode
}

export function NotionBodyRenderer({
  body,
  className,
  customRenderers = {},
  blockClassNames = {}
}: {
  body: Body
  customRenderers?: Partial<StuctureMappedType<Block['type']>>
  className?: string
  blockClassNames?: Partial<{ [key in Block['type']]: string }>
}) {
  return (
    <div className={clsx(className, 'prose')}>
      {body.map((block) => {
        const CustomRenderer = customRenderers[block.type]
        const blockClassName = blockClassNames[block.type]
        if (CustomRenderer) {
          // @ts-ignore
          return <CustomRenderer block={block} className={blockClassName} />
        }
        switch (block.type) {
          case 'paragraph':
            return (
              <Paragraph
                block={block}
                className={blockClassName}
                key={block.id}
              />
            )
          case 'heading_1':
          case 'heading_2':
          case 'heading_3':
            return (
              <Heading
                block={block}
                className={blockClassName}
                key={block.id}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
