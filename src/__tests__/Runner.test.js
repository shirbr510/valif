// @flow

import { DEFAULT_INVALID_FIELD_MESSAGE, runRule, runValidations } from '../Runner'
import type { ValidationResult, ValidationRules } from '../Types'

const testSubject = {
  a:120,
  b:"120 dollars",
  c: null
}

describe('runValidations', () => {

  test('empty validation rules should return no validation errors', () => {
    const validationRules = {};
    const result = runValidations(validationRules,testSubject);
    expect(result).toEqual({});
  });

  test('null validation rules should return no validation errors', () => {
    const validationRules = null;
    const result = runValidations(validationRules,testSubject);
    expect(result).toEqual({});
  });

  test('a: valid, b:invalid, c:invalid', () => {
    const validationRules: ValidationRules = {
      a: {func: ()=>true},
      b: {func: ()=>false},
      c: {func: ()=>false}
    };
    const expectedResult:ValidationResult = {
      b: "invalid",
      c: "invalid",
    }
    const result = runValidations(validationRules,testSubject);
    expect(Object.keys(result)).toEqual(Object.keys(expectedResult))
  });

  test('a: valid, b:invalid, c:invalid, d: invalid', () => {
    const validationRules: ValidationRules = {
      a: {func: ()=>true},
      b: {func: ()=>false},
      c: {func: ()=>false},
      d: {func: ()=>false},
    };
    const expectedResult:ValidationResult = {
      b: "invalid",
      c: "invalid",
      d: "invalid",
    }
    const result = runValidations(validationRules,testSubject);
    expect(Object.keys(result)).toEqual(Object.keys(expectedResult))
  });

  test('c:invalid, d: invalid', () => {
    const validationRules: ValidationRules = {
      c: {func: ()=>false},
      d: {func: ()=>false},
    };
    const expectedResult:ValidationResult = {
      c: "invalid",
      d: "invalid",
    }
    const result = runValidations(validationRules,testSubject);
    expect(Object.keys(result)).toEqual(Object.keys(expectedResult))
  });

  test('a:invalid', () => {
    const validationRules: ValidationRules = {
      a: {func: ()=>false},
    };
    const expectedResult:ValidationResult = {
      a: "invalid",
    }
    const result = runValidations(validationRules,testSubject);
    expect(Object.keys(result)).toEqual(Object.keys(expectedResult))
  });

});

describe('runRule', () => {

  test('validationRule without message should return DEFAULT_INVALID_FIELD_MESSAGE on invalid value', () => {
    const validationRule = {func:()=>false};
    const value=null;
    const result = runRule(validationRule, value);
    expect(result).toEqual(DEFAULT_INVALID_FIELD_MESSAGE);
  });

  test('validationRule with message should return message on invalid value', () => {
    const validationRule = {func:()=>false, message: "Damn Bro"};
    const value=null;
    const result = runRule(validationRule, value);
    expect(result).toEqual(validationRule.message);
  });

  test('validationRule without message should return empty string on valid value', () => {
    const validationRule = {func:()=>true};
    const value=null;
    const result = runRule(validationRule, value);
    expect(result).not.toEqual(expect.anything());
  });

  test('validationRule with message should return null on valid value', () => {
    const validationRule = {func:()=>true, message: "Damn Bro"};
    const value=null;
    const result = runRule(validationRule, value);
    expect(result).not.toEqual(expect.anything());
  });

  test('null validationRule should return null on valid value', () => {
    const validationRule = null;
    const value=null;
    const result = runRule(validationRule, value);
    expect(result).not.toEqual(expect.anything());
  });

});