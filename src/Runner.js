// @flow

import type {ValidationResult, ValidationRule, ValidationRules} from "./Types"

export const DEFAULT_INVALID_FIELD_MESSAGE: string = 'field is invalid';

export const runRule = (validationRule: ValidationRule, value: any): string => {
    if (validationRule) {
        const isValid = validationRule.func(value);
        if (!isValid) {
            return validationRule.message || DEFAULT_INVALID_FIELD_MESSAGE;
        }
    }
    //returned on valid value
    return null;
};

export const runValidations = (validationRules: ValidationRules = {}, objectToValidate: object): ValidationResult => {
    if (!validationRules) {
        return {};
    }
    return Object.keys(validationRules).reduce((validationObject: ValidationResult, fieldName: string | number) => {
            const validationError = runRule(validationRules[fieldName], objectToValidate[fieldName]);
            if (!validationError) {
                delete validationObject[fieldName];
            }
            else {
                validationObject[fieldName] = validationError;
            }
            return validationObject;
        }
        , {})
};