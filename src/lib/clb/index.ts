import clsx from 'clsx'
import { keys } from 'lib/utils'

const isBoolean = (maybeBoolean: unknown): maybeBoolean is boolean =>
  typeof maybeBoolean === 'boolean'
const toStringIfBoolean = (value) => (isBoolean(value) ? String(value) : value)
const isSimpleSubset = (a, b) =>
  Object.entries(a).every(([key, value]) => b[key] === value)

function clbx<Variants extends Record<string, Record<string, string>>>(schema: {
  base?: string
  variants?: Variants
  defaultVariants?: Partial<Record<keyof Variants, string>>
  compoundVariants?: Array<
    { classes: string } & Partial<Record<keyof Variants, string>>
  >
}) {

    type VariantValuesMap<VariantKey extends keyof Variants> = {
        [K in VariantKey]: VariantKey extends 'true' ? boolean : string
      }

  return (options: Partial<VariantValuesMap<keyof Variants>>) => {
    const {
      base,
      defaultVariants = {},
      variants = {},
      compoundVariants = []
    } = schema

    const currentVariants = {
      ...defaultVariants,
      ...variants
    }

    const currentOptions = {
      ...defaultVariants,
      ...options
    }

    return clsx([
      base,
      keys(currentVariants).map((variantName) => {
        return (
          variants[variantName] &&
          variants[variantName][
            toStringIfBoolean(options[variantName]) ||
              defaultVariants[variantName]
          ]
        )
      }),
      compoundVariants.reduce<string[]>(
        (list, { classes, ...compoundVariantOptions }) => {
          if (isSimpleSubset(compoundVariantOptions, currentOptions)) {
            list.push(classes)
          }
          return list
        },
        []
      )
    ])
  }
}

const button = clbx({
  variants: { primary: { true: 'hola', nono: 'holejoewijoi' } },
  defaultVariants: { primary:  }
})

button({ primary: '' })
