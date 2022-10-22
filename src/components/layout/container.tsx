import type * as Polymorphic from '@radix-ui/react-polymorphic'
import clsx from 'clsx'
import * as React from 'react'

type Props = {
  children?: React.ReactNode
}

const Container = React.forwardRef(
  ({ as: Comp = 'div', className, ...props }, ref) => {
    return (
      <Comp
        {...props}
        className={clsx('container mx-auto px-5 sm:px-8', className)}
        ref={ref}
      />
    )
  }
) as Polymorphic.ForwardRefComponent<'div', Props>

export type ContainerProps = React.ComponentProps<typeof Container>

export default Container
