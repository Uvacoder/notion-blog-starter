import * as React from 'react'
import { BlockTypeProps } from '..'

export function Heading({
  block,
  className
}: BlockTypeProps<'heading_1' | 'heading_2' | 'heading_3'>) {
  switch (block.type) {
    case 'heading_1':
      return (
        <h1 className={className}>
          {block.heading_1.text.map((text, i) => {
            return <span key={i}>{text.plain_text}</span>
          })}
        </h1>
      )
    case 'heading_2':
      return (
        <h2 className={className}>
          {block.heading_2.text.map((text, i) => {
            return <span key={i}>{text.plain_text}</span>
          })}
        </h2>
      )
    case 'heading_3':
      return (
        <h3 className={className}>
          {block.heading_3.text.map((text, i) => {
            return <span key={i}>{text.plain_text}</span>
          })}
        </h3>
      )
    default:
      return null
  }
}
