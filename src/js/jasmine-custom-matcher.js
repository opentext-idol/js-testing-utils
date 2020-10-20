/*
 * (c) Copyright 2013-2015 Micro Focus or one of its affiliates.
 *
 * Licensed under the MIT License (the "License"); you may not use this file
 * except in compliance with the License.
 *
 * The only warranties for products and services of Micro Focus and its affiliates
 * and licensors ("Micro Focus") are as may be set forth in the express warranty
 * statements accompanying such products and services. Nothing herein should be
 * construed as constituting an additional warranty. Micro Focus shall not be
 * liable for technical or editorial errors or omissions contained herein. The
 * information contained herein is subject to change without notice.
 */

(function (jasmine, $) {
    var customMatchers = {
        toBeStrictlyAscendingOrderedDropDown: function () {
            return {
                compare: function (actual) {
                    var prev = Number.NEGATIVE_INFINITY;

                    return {
                        pass: _.every(actual, function (option) {
                            var optionValue = Number($(option).val());
                            var isNewValueBigger = optionValue > prev;
                            prev = optionValue;

                            return isNewValueBigger;
                        })
                    };
                }
            }
        },

        toBeAscendingOrderedDropDown: function () {
            return {
                compare: function (actual) {
                    var prev = Number.NEGATIVE_INFINITY;

                    return {
                        pass: _.every(actual, function (option) {
                            var optionValue = Number($(option).val());

                            var isNewValueBigger = optionValue >= prev;
                            prev = optionValue;

                            return isNewValueBigger;
                        })
                    };
                }
            }
        },

        toBeStrictlyDescendingOrderedDropDown: function () {
            return {
                compare: function (actual) {
                    var prev = Number.MAX_VALUE;

                    return {
                        pass: _.every(actual, function (option) {
                            var optionValue = Number($(option).val());
                            var isNewValueBigger = optionValue < prev;
                            prev = optionValue;

                            return isNewValueBigger;
                        })
                    };
                }
            }
        },

        toBeDescendingOrderedDropDown: function () {
            return {
                compare: function (actual) {
                    var prev = Number.MAX_VALUE;

                    return {
                        pass: _.every(actual, function (option) {
                            var optionValue = Number($(option).val());
                            var isNewValueBigger = optionValue <= prev;
                            prev = optionValue;

                            return isNewValueBigger;
                        })
                    };
                }
            }
        },

        toHaveCallCount: function () {
            return {
                compare: function (actual, n) {
                    if (!jasmine.isSpy(actual)) {
                        throw new Error('Expected a spy, but got ' + jasmine.pp(actual) + '.');
                    }

                    var callCount = actual.calls ? actual.calls.count() : 0;

                    var result = {};
                    result.pass = callCount === n;
                    result.message = result.pass ?
                        'Expected spy ' + actual.identity + ' not to have been called ' + n + ' times.' :
                        'Expected spy ' + actual.identity + ' to have been called ' + n + ' times, but it was called ' + callCount + ' times.';

                    return result;
                }
            }
        },

        toBeInstanceOf: function () {
            return {
                compare: function (actual, obj) {
                    var result = {};
                    result.pass = (actual instanceof obj);
                    result.message = result.pass ?
                        'Expected ' + JSON.stringify(obj) + ' not to be an instance of ' + actual + '.' :
                        'Expected ' + JSON.stringify(obj) + ' to be an instance of ' + actual + '.';

                    return result;
                }
            }
        },

        toBeTheSameElementAs: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: $(actual).is(expected)
                    };
                }
            }
        }
    };

    beforeEach(function () {
        jasmine.addMatchers(customMatchers);
    });

}(window.jasmine, window.jQuery));
