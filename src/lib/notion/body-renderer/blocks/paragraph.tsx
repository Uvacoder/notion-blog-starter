import * as React from 'react'
import clsx from 'clsx'
import { BlockTypeProps } from '..'

export function Paragraph({ block, className }: BlockTypeProps<'paragraph'>) {
  return (
    <p className={className}>
      {block.paragraph.text.map((text, i) => {
        if (text.type !== 'text') return null

        const children = (
          <span
            key={i}
            className={clsx({
              italic: text.annotations.italic,
              'font-bold': text.annotations.bold,
              'font-mono': text.annotations.code,
              'line-through': text.annotations.strikethrough,
              underline: text.annotations.underline
            })}
          >
            {text.text.content}
          </span>
        )
        return (
          <React.Fragment key={i}>
            {text.href ? (
              <a
                href={text.href}
                className="text-blue-400 transition border-b border-blue-400/70 hover:text-blue-300 hover:border-blue-400"
              >
                {children}
              </a>
            ) : (
              children
            )}
          </React.Fragment>
        )
      })}
    </p>
  )
}
