// @flow

export type ValidationRule = {
  func: (value: any) => boolean,
  message?: string
}

export type ValidationRules = {
  [key: string | number]: ValidationRule
}

export type ValidationResult = {
  [key: string | number]: string
}