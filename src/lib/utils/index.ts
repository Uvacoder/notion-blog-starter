import { isClient } from 'lib/constants'

export const formatError = (e: unknown): { message: string } => {
  try {
    switch (typeof e) {
      case 'string':
        return { message: e }
      default:
      case 'object': {
        const anyError = e as any
        return formatError(anyError.message || anyError.error)
      }
    }
  } catch (error) {
    return { message: 'An unknown error ocurred.' }
  }
}

export const isApiSupported = (api: string) => isClient && api in window

/**
 * Object.keys with typescript support
 */
export const keys = <T extends Record<string, any>>(obj: T) =>
  Object.keys(obj) as (keyof T)[]

/**
 * Object.entries with typescript support
 */
export const entries = <T extends Record<string, any>>(obj: T) =>
  Object.entries(obj) as [keyof T, T[keyof T]][]

/**
 * Object.values with typescript support
 */
export const values = <T extends Record<string, any>>(obj: T) =>
  Object.values(obj) as T[keyof T][]
