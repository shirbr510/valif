'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runRule = exports.runValidations = exports.DEFAULT_INVALID_FIELD_MESSAGE = undefined;

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var DEFAULT_INVALID_FIELD_MESSAGE = exports.DEFAULT_INVALID_FIELD_MESSAGE = 'field is invalid';

var runValidations = exports.runValidations = function runValidations() {
  var validationRules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var objectToValidate = arguments[1];

  if (!validationRules) {
    return {};
  }
  return _.reduce(Object.keys(validationRules), function (validationObject, fieldName) {
    var validationError = runRule(validationRules[fieldName], objectToValidate[fieldName]);
    if (!validationError) {
      delete validationObject[fieldName];
    } else {
      validationObject[fieldName] = validationError;
    }
    return validationObject;
  }, {});
};

var runRule = exports.runRule = function runRule(validationRule, value) {
  if (validationRule) {
    var isValid = validationRule.func(value);
    if (!isValid) {
      return validationRule.message || DEFAULT_INVALID_FIELD_MESSAGE;
    }
  }
  //returned on valid value
  return null;
};