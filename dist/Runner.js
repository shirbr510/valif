"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var DEFAULT_INVALID_FIELD_MESSAGE = exports.DEFAULT_INVALID_FIELD_MESSAGE = 'field is invalid';

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

var runValidations = exports.runValidations = function runValidations() {
    var validationRules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var objectToValidate = arguments[1];

    if (!validationRules) {
        return {};
    }
    return Object.keys(validationRules).reduce(function (validationObject, fieldName) {
        var validationError = runRule(validationRules[fieldName], objectToValidate[fieldName]);
        if (!validationError) {
            delete validationObject[fieldName];
        } else {
            validationObject[fieldName] = validationError;
        }
        return validationObject;
    }, {});
};