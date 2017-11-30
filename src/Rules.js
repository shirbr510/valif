// @flow

type ValidationFunction = (value: any) => boolean;

const _isEmptyObject = (obj: object): boolean => Object.keys(obj).length === 0 && obj.constructor === Object;

export const must =
  (...functions: Array<ValidationFunction>): ValidationFunction =>
    (value: any): boolean =>
      functions.reduce((isValid: boolean, func: ValidationFunction) => {
        if (!isValid) {
          return false;
        }
        if (Array.isArray(func)) {
          return must(...func)(value);
        }
        return func(value);
      }, true);

export const not =
  (func: ValidationFunction): ValidationFunction =>
    (value: any): boolean =>
      !!func && !func(value);

export const isEmpty = (value: any): boolean => !value || _isEmptyObject(value);

export const isRequired = (value): boolean => !!value;

export const minLength =
  (length: number): ValidationFunction =>
    (value: string | number): boolean => {
      if (!value) {
        return false;
      }
      return value && typeof(value) === 'string' ? value.length >= length : minLength(length)(value.toString());
    };

export const maxLength =
  (length: number): ValidationFunction =>
    (value: string | number): boolean => {
      if (!value) {
        return false;
      }
      return value && typeof(value) === 'string' ? value.length <= length : maxLength(length)(value.toString());
    };
    
export const isRegexMatch = regex => value => regex.test(value);

const _isEmailFormat = (email: string): boolean => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return isRegexMatch(regex)(email);
};

export const isEmail = must(not(isEmpty), _isEmailFormat);

export const isPassword = must(not(isEmpty), minLength(4));
