// @flow

import * as _ from 'lodash'
import type { ValidationResult, ValidationRule, ValidationRules } from './ValidationTypes'

export const DEFAULT_INVALID_FIELD_MESSAGE='field is invalid';

export const runValidations = (validationRules: ValidationRules = {}, objectToValidate: object): ValidationResult =>{
  if(!validationRules){
    return {};
  }
  return _.reduce(Object.keys(validationRules), (validationObject: ValidationResult, fieldName: string | number) => {
      const validationError = runRule(validationRules[fieldName], objectToValidate[fieldName])
      if (!validationError) {
        delete validationObject[fieldName]
      }
      else {
        validationObject[fieldName] = validationError
      }
      return validationObject
    }
    , {})
}


export const runRule = (validationRule: ValidationRule, value: any): string => {
  if (validationRule) {
    const isValid = validationRule.func(value)
    if(!isValid){
      return validationRule.message || DEFAULT_INVALID_FIELD_MESSAGE;
    }
  }
  //returned on valid value
  return null;
}