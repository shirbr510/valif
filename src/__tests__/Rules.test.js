// @flow

import { isEmail, isEmpty, isPassword, isRequired, maxLength, minLength, must, not } from "../Rules"

describe('must validationRule', () => {

  test('empty must with null value should be valid', () => {
    const value = null;
    const result = must()(value);
    expect(result).toBe(true);
  });

  test('empty must with object value should be valid', () => {
    const value = {a:"AHHHHHHHH"};
    const result = must()(value);
    expect(result).toBe(true);
  });

  test('all valid functions as args must should be valid', () => {
    const value = {a:"AHHHHHHHH"};
    const validation1=()=>true;
    const validation2=()=>true;
    const result = must(validation1,validation2)(value);
    expect(result).toBe(true);
  });

  test('all valid functions as array arg must should be valid', () => {
    const value = {a:"AHHHHHHHH"};
    const validation1=()=>true;
    const validation2=()=>true;
    const result = must([validation1,validation2])(value);
    expect(result).toBe(true);
  });

  test('one invalid function as array arg must should be invalid', () => {
    const value = {a:"AHHHHHHHH"};
    const validation1=()=>true;
    const validation2=()=>false;
    const result = must(validation1,validation2)(value);
    expect(result).toBe(false);
  });

});

describe('not validationRule', () => {

  test('not validRule value is invalid', () => {
    const value = "";
    const result = not(()=>true)(value);
    expect(result).toEqual(false);
  });

  test('not invalidRule value is valid', () => {
    const value = "";
    const result = not(()=>false)(value);
    expect(result).toEqual(true);
  });

  test('empty rule value is invalid', () => {
    const value = "";
    const result = not()(value);
    expect(result).toEqual(false);
  });

});

describe('isEmpty validationRule', () => {

  test('null value is valid', () => {
    const value = null;
    const result = isEmpty(value);
    expect(result).toBe(true);
  });

  test('empty object value is valid', () => {
    const value = {};
    const result = isEmpty(value);
    expect(result).toBe(true);
  });

  test('empty string value is valid', () => {
    const value = "";
    const result = isEmpty(value);
    expect(result).toBe(true);
  });

  test('0 value is valid', () => {
    const value = 0;
    const result = isEmpty(value);
    expect(result).toBe(true);
  });

  test('object value is invalid', () => {
    const value = {a:'AHHHH'};
    const result = isEmpty(value);
    expect(result).toBe(false);
  });

  test('string value is invalid', () => {
    const value = "pinchikadere";
    const result = isEmpty(value);
    expect(result).toBe(false);
  });

  test('number value is invalid', () => {
    const value = 9802;
    const result = isEmpty(value);
    expect(result).toBe(false);
  });

});

describe('isRequired validationRule', () => {

  test('empty value is invalid', () => {
    const value = "";
    const result = isRequired(value);
    expect(result).toBe(false);
  });

  test('null value is invalid', () => {
    const value = null;
    const result = isRequired(value);
    expect(result).toBe(false);
  });

  test('object value is valid', () => {
    const value = {};
    const result = isRequired(value);
    expect(result).toBe(true);
  });

  test('string value is valid', () => {
    const value = "pinchikadere";
    const result = isRequired(value);
    expect(result).toBe(true);
  });

  test('number value is valid', () => {
    const value = 9802;
    const result = isRequired(value);
    expect(result).toBe(true);
  });

});

describe('minLength validationRule', () => {

  test('empty value is invalid', () => {
    const value = "";
    const result = minLength(4)(value);
    expect(result).toBe(false);
  });

  test('null value is invalid', () => {
    const value = null;
    const result = minLength(4)(value);
    expect(result).toBe(false);
  });

  test('string value is valid', () => {
    const value = "Shlomot";
    const result = minLength(4)(value);
    expect(result).toBe(true);
  });

  test('string value is invalid', () => {
    const value = "bye";
    const result = minLength(4)(value);
    expect(result).toBe(false);
  });

  test('number value is valid', () => {
    const value = 12347;
    const result = minLength(4)(value);
    expect(result).toBe(true);
  });

  test('number value is invalid', () => {
    const value = 100;
    const result = minLength(4)(value);
    expect(result).toBe(false);
  });

});

describe('maxLength validationRule', () => {

  test('empty value is invalid', () => {
    const value = "";
    const result = maxLength(4)(value);
    expect(result).toBe(false);
  });

  test('null value is invalid', () => {
    const value = null;
    const result = maxLength(4)(value);
    expect(result).toBe(false);
  });

  test('string value is valid', () => {
    const value = "bye";
    const result = maxLength(4)(value);
    expect(result).toBe(true);
  });

  test('string value is invalid', () => {
    const value = "Shlomot";
    const result = maxLength(4)(value);
    expect(result).toBe(false);
  });

  test('number value is valid', () => {
    const value = 100;
    const result = maxLength(4)(value);
    expect(result).toBe(true);
  });

  test('number value is invalid', () => {
    const value = 12347;
    const result = maxLength(4)(value);
    expect(result).toBe(false);
  });

});

describe('isEmail validationRule', () => {

  test('email without @', () => {
    const email = "shirgllu.com";
    const result = isEmail(email);
    expect(result).toBe(false);
  });

  test('email without .something suffix', () => {
    const email = "shir@gllu";
    const result = isEmail(email);
    expect(result).toBe(false);
  });

  test('proper regular valid email', () => {
    const email = "shir@gllu.com";
    const result = isEmail(email);
    expect(result).toBe(true);
  });

  test('null email should be invalid', () => {
    const email = null;
    const result = isEmail(email);
    expect(result).toBe(false);
  });

  test('empty email should be invalid', () => {
    const email = "";
    const result = isEmail(email);
    expect(result).toBe(false);
  });

});

describe('isPassword validationRule', () => {
  test('password shorter then 4 characters', () => {
    const password = "123";
    const result = isPassword(password);
    expect(result).toBe(false);
  });

  test('password with numbers only', () => {
    const password = "1234";
    const result = isPassword(password);
    expect(result).toBe(true);
  });

  test('password with mix of numbers and letters', () => {
    const password = "d00lit3l";
    const result = isPassword(password);
    expect(result).toBe(true);
  });

  test('password with letters only', () => {
    const password = "abcd";
    const result = isPassword(password);
    expect(result).toBe(true);
  });

  test('null password should be invalid', () => {
    const password = null;
    const result = isPassword(password);
    expect(result).toBe(false);
  });

  test('empty password should be invalid', () => {
    const password = "";
    const result = isPassword(password);
    expect(result).toBe(false);
  });
});