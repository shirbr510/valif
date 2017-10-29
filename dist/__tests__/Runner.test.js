"use strict";

var _Runner = require("../Runner");

var testSubject = {
  a: 120,
  b: "120 dollars",
  c: null
};

describe('runValidations', function () {

  test('empty validation rules should return no validation errors', function () {
    var validationRules = {};
    var result = (0, _Runner.runValidations)(validationRules, testSubject);
    expect(result).toEqual({});
  });

  test('null validation rules should return no validation errors', function () {
    var validationRules = null;
    var result = (0, _Runner.runValidations)(validationRules, testSubject);
    expect(result).toEqual({});
  });

  test('a: valid, b:invalid, c:invalid', function () {
    var validationRules = {
      a: { func: function func() {
          return true;
        } },
      b: { func: function func() {
          return false;
        } },
      c: { func: function func() {
          return false;
        } }
    };
    var expectedResult = {
      b: "invalid",
      c: "invalid"
    };
    var result = (0, _Runner.runValidations)(validationRules, testSubject);
    expect(Object.keys(result)).toEqual(Object.keys(expectedResult));
  });

  test('a: valid, b:invalid, c:invalid, d: invalid', function () {
    var validationRules = {
      a: { func: function func() {
          return true;
        } },
      b: { func: function func() {
          return false;
        } },
      c: { func: function func() {
          return false;
        } },
      d: { func: function func() {
          return false;
        } }
    };
    var expectedResult = {
      b: "invalid",
      c: "invalid",
      d: "invalid"
    };
    var result = (0, _Runner.runValidations)(validationRules, testSubject);
    expect(Object.keys(result)).toEqual(Object.keys(expectedResult));
  });

  test('c:invalid, d: invalid', function () {
    var validationRules = {
      c: { func: function func() {
          return false;
        } },
      d: { func: function func() {
          return false;
        } }
    };
    var expectedResult = {
      c: "invalid",
      d: "invalid"
    };
    var result = (0, _Runner.runValidations)(validationRules, testSubject);
    expect(Object.keys(result)).toEqual(Object.keys(expectedResult));
  });

  test('a:invalid', function () {
    var validationRules = {
      a: { func: function func() {
          return false;
        } }
    };
    var expectedResult = {
      a: "invalid"
    };
    var result = (0, _Runner.runValidations)(validationRules, testSubject);
    expect(Object.keys(result)).toEqual(Object.keys(expectedResult));
  });
});

describe('runRule', function () {

  test('validationRule without message should return DEFAULT_INVALID_FIELD_MESSAGE on invalid value', function () {
    var validationRule = { func: function func() {
        return false;
      } };
    var value = null;
    var result = (0, _Runner.runRule)(validationRule, value);
    expect(result).toEqual(_Runner.DEFAULT_INVALID_FIELD_MESSAGE);
  });

  test('validationRule with message should return message on invalid value', function () {
    var validationRule = { func: function func() {
        return false;
      }, message: "Damn Bro" };
    var value = null;
    var result = (0, _Runner.runRule)(validationRule, value);
    expect(result).toEqual(validationRule.message);
  });

  test('validationRule without message should return empty string on valid value', function () {
    var validationRule = { func: function func() {
        return true;
      } };
    var value = null;
    var result = (0, _Runner.runRule)(validationRule, value);
    expect(result).not.toEqual(expect.anything());
  });

  test('validationRule with message should return null on valid value', function () {
    var validationRule = { func: function func() {
        return true;
      }, message: "Damn Bro" };
    var value = null;
    var result = (0, _Runner.runRule)(validationRule, value);
    expect(result).not.toEqual(expect.anything());
  });

  test('null validationRule should return null on valid value', function () {
    var validationRule = null;
    var value = null;
    var result = (0, _Runner.runRule)(validationRule, value);
    expect(result).not.toEqual(expect.anything());
  });
});