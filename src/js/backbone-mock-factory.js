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

define([
    'backbone'
], function(Backbone) {

    // Check if we are using jasmine 2; if we are, spies have different behaviour
    var jasmine2 = window.jasmine && parseInt(window.jasmine.version, 10) >= 2;

    var getStubHash = function(methods) {
        var output = {};

        _.each(methods, function(method) {
            output[method] = jasmine.createSpy(method);
        });

        return output;
    };

    var getMockConstructor = function(Parent) {
        return function(stubMethods, prototypeProperties) {
            var prototypeStubs = getStubHash(stubMethods);

            var constructor = function() {
                if (constructor === this.constructor) {
                    Constructor.instances.push(this);
                    this.constructorArgs = _.toArray(arguments);
                    _.extend(this, getStubHash(stubMethods));
                }

                Parent.apply(this, arguments);
            };

            var Constructor = Parent.extend(_.extend({
                constructor: constructor
            }, prototypeStubs, prototypeProperties), {
                reset: function() {
                    Constructor.instances = [];

                    _.each(stubMethods, function(method) {
                        var prototypeMethod = Constructor.prototype[method];

                        if (jasmine2) {
                            prototypeMethod.calls.reset();
                        } else {
                            prototypeMethod.reset();
                        }
                    });
                }
            });

            Constructor.reset();
            return Constructor;
        };
    };

    return {
        getView: getMockConstructor(Backbone.View),
        getModel: getMockConstructor(Backbone.Model),
        getCollection: getMockConstructor(Backbone.Collection)
    };

});
