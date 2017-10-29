'use strict';

var _Rules = require('../Rules');

describe('must validationRule', function () {

  test('empty must with null value should be valid', function () {
    var value = null;
    var result = (0, _Rules.must)()(value);
    expect(result).toBe(true);
  });

  test('empty must with object value should be valid', function () {
    var value = { a: "AHHHHHHHH" };
    var result = (0, _Rules.must)()(value);
    expect(result).toBe(true);
  });

  test('all valid functions as args must should be valid', function () {
    var value = { a: "AHHHHHHHH" };
    var validation1 = function validation1() {
      return true;
    };
    var validation2 = function validation2() {
      return true;
    };
    var result = (0, _Rules.must)(validation1, validation2)(value);
    expect(result).toBe(true);
  });

  test('all valid functions as array arg must should be valid', function () {
    var value = { a: "AHHHHHHHH" };
    var validation1 = function validation1() {
      return true;
    };
    var validation2 = function validation2() {
      return true;
    };
    var result = (0, _Rules.must)([validation1, validation2])(value);
    expect(result).toBe(true);
  });

  test('one invalid function as array arg must should be invalid', function () {
    var value = { a: "AHHHHHHHH" };
    var validation1 = function validation1() {
      return true;
    };
    var validation2 = function validation2() {
      return false;
    };
    var result = (0, _Rules.must)(validation1, validation2)(value);
    expect(result).toBe(false);
  });
});

describe('not validationRule', function () {

  test('not validRule value is invalid', function () {
    var value = "";
    var result = (0, _Rules.not)(function () {
      return true;
    })(value);
    expect(result).toEqual(false);
  });

  test('not invalidRule value is valid', function () {
    var value = "";
    var result = (0, _Rules.not)(function () {
      return false;
    })(value);
    expect(result).toEqual(true);
  });

  test('empty rule value is invalid', function () {
    var value = "";
    var result = (0, _Rules.not)()(value);
    expect(result).toEqual(false);
  });
});

describe('isEmpty validationRule', function () {

  test('null value is valid', function () {
    var value = null;
    var result = (0, _Rules.isEmpty)(value);
    expect(result).toBe(true);
  });

  test('empty object value is valid', function () {
    var value = {};
    var result = (0, _Rules.isEmpty)(value);
    expect(result).toBe(true);
  });

  test('empty string value is valid', function () {
    var value = "";
    var result = (0, _Rules.isEmpty)(value);
    expect(result).toBe(true);
  });

  test('0 value is valid', function () {
    var value = 0;
    var result = (0, _Rules.isEmpty)(value);
    expect(result).toBe(true);
  });

  test('object value is invalid', function () {
    var value = { a: 'AHHHH' };
    var result = (0, _Rules.isEmpty)(value);
    expect(result).toBe(false);
  });

  test('string value is invalid', function () {
    var value = "pinchikadere";
    var result = (0, _Rules.isEmpty)(value);
    expect(result).toBe(false);
  });

  test('number value is invalid', function () {
    var value = 9802;
    var result = (0, _Rules.isEmpty)(value);
    expect(result).toBe(false);
  });
});

describe('isRequired validationRule', function () {

  test('empty value is invalid', function () {
    var value = "";
    var result = (0, _Rules.isRequired)(value);
    expect(result).toBe(false);
  });

  test('null value is invalid', function () {
    var value = null;
    var result = (0, _Rules.isRequired)(value);
    expect(result).toBe(false);
  });

  test('object value is valid', function () {
    var value = {};
    var result = (0, _Rules.isRequired)(value);
    expect(result).toBe(true);
  });

  test('string value is valid', function () {
    var value = "pinchikadere";
    var result = (0, _Rules.isRequired)(value);
    expect(result).toBe(true);
  });

  test('number value is valid', function () {
    var value = 9802;
    var result = (0, _Rules.isRequired)(value);
    expect(result).toBe(true);
  });
});

describe('minLength validationRule', function () {

  test('empty value is invalid', function () {
    var value = "";
    var result = (0, _Rules.minLength)(4)(value);
    expect(result).toBe(false);
  });

  test('null value is invalid', function () {
    var value = null;
    var result = (0, _Rules.minLength)(4)(value);
    expect(result).toBe(false);
  });

  test('string value is valid', function () {
    var value = "Shlomot";
    var result = (0, _Rules.minLength)(4)(value);
    expect(result).toBe(true);
  });

  test('string value is invalid', function () {
    var value = "bye";
    var result = (0, _Rules.minLength)(4)(value);
    expect(result).toBe(false);
  });

  test('number value is valid', function () {
    var value = 12347;
    var result = (0, _Rules.minLength)(4)(value);
    expect(result).toBe(true);
  });

  test('number value is invalid', function () {
    var value = 100;
    var result = (0, _Rules.minLength)(4)(value);
    expect(result).toBe(false);
  });
});

describe('maxLength validationRule', function () {

  test('empty value is invalid', function () {
    var value = "";
    var result = (0, _Rules.maxLength)(4)(value);
    expect(result).toBe(false);
  });

  test('null value is invalid', function () {
    var value = null;
    var result = (0, _Rules.maxLength)(4)(value);
    expect(result).toBe(false);
  });

  test('string value is valid', function () {
    var value = "bye";
    var result = (0, _Rules.maxLength)(4)(value);
    expect(result).toBe(true);
  });

  test('string value is invalid', function () {
    var value = "Shlomot";
    var result = (0, _Rules.maxLength)(4)(value);
    expect(result).toBe(false);
  });

  test('number value is valid', function () {
    var value = 100;
    var result = (0, _Rules.maxLength)(4)(value);
    expect(result).toBe(true);
  });

  test('number value is invalid', function () {
    var value = 12347;
    var result = (0, _Rules.maxLength)(4)(value);
    expect(result).toBe(false);
  });
});

describe('isEmail validationRule', function () {

  test('email without @', function () {
    var email = "shirgllu.com";
    var result = (0, _Rules.isEmail)(email);
    expect(result).toBe(false);
  });

  test('email without .something suffix', function () {
    var email = "shir@gllu";
    var result = (0, _Rules.isEmail)(email);
    expect(result).toBe(false);
  });

  test('proper regular valid email', function () {
    var email = "shir@gllu.com";
    var result = (0, _Rules.isEmail)(email);
    expect(result).toBe(true);
  });

  test('null email should be invalid', function () {
    var email = null;
    var result = (0, _Rules.isEmail)(email);
    expect(result).toBe(false);
  });

  test('empty email should be invalid', function () {
    var email = "";
    var result = (0, _Rules.isEmail)(email);
    expect(result).toBe(false);
  });
});

describe('isPassword validationRule', function () {
  test('password shorter then 4 characters', function () {
    var password = "123";
    var result = (0, _Rules.isPassword)(password);
    expect(result).toBe(false);
  });

  test('password with numbers only', function () {
    var password = "1234";
    var result = (0, _Rules.isPassword)(password);
    expect(result).toBe(true);
  });

  test('password with mix of numbers and letters', function () {
    var password = "d00lit3l";
    var result = (0, _Rules.isPassword)(password);
    expect(result).toBe(true);
  });

  test('password with letters only', function () {
    var password = "abcd";
    var result = (0, _Rules.isPassword)(password);
    expect(result).toBe(true);
  });

  test('null password should be invalid', function () {
    var password = null;
    var result = (0, _Rules.isPassword)(password);
    expect(result).toBe(false);
  });

  test('empty password should be invalid', function () {
    var password = "";
    var result = (0, _Rules.isPassword)(password);
    expect(result).toBe(false);
  });
});