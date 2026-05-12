type ClassDictionary = Record<string, boolean | null | undefined>
type ClassValue =
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined
  | ClassDictionary
  | ClassValue[]

function toClassName(value: ClassValue): string {
  if (!value) {
    return ''
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint') {
    return String(value)
  }

  if (Array.isArray(value)) {
    return value.map(toClassName).filter(Boolean).join(' ')
  }

  return Object.entries(value)
    .filter(([, isEnabled]) => Boolean(isEnabled))
    .map(([className]) => className)
    .join(' ')
}

export function cn(...inputs: ClassValue[]) {
  return inputs.map(toClassName).filter(Boolean).join(' ')
}
