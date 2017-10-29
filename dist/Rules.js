'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _isEmptyObject = function _isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

var _isEmailFormat = function _isEmailFormat(email) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

var must = exports.must = function must() {
  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (value) {
    return functions.reduce(function (isValid, func) {
      if (!isValid) {
        return false;
      }
      if (Array.isArray(func)) {
        return must.apply(undefined, _toConsumableArray(func))(value);
      }
      return func(value);
    }, true);
  };
};

var not = exports.not = function not(func) {
  return function (value) {
    return !!func && !func(value);
  };
};

var isEmpty = exports.isEmpty = function isEmpty(value) {
  return !value || _isEmptyObject(value);
};

var isRequired = exports.isRequired = function isRequired(value) {
  return !!value;
};

var minLength = exports.minLength = function minLength(length) {
  return function (value) {
    if (!value) {
      return false;
    }
    return value && typeof value === 'string' ? value.length >= length : minLength(length)(value.toString());
  };
};

var maxLength = exports.maxLength = function maxLength(length) {
  return function (value) {
    if (!value) {
      return false;
    }
    return value && typeof value === 'string' ? value.length <= length : maxLength(length)(value.toString());
  };
};

var isEmail = exports.isEmail = must(not(isEmpty), _isEmailFormat);

var isPassword = exports.isPassword = must(not(isEmpty), minLength(4));