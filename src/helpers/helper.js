import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import 'moment-timezone';

export function isLoggedIn () {
    let token;
    let customerId;

    token = localStorage.getItem('token');
    customerId = localStorage.getItem('customerId');

    return !!(customerId && token);
}

export function formatAttributes (attributes) {
    let results = [];
    let sizes = [];
    let colors = [];
    if (attributes.length > 0) {
        _.forEach(attributes, function(attribute) {
            if (attribute.attribute_name == 'Size') {
                sizes.push(attribute.attribute_value);
            }
            if (attribute.attribute_name == 'Color') {
                colors.push(attribute.attribute_value);
            }
        });
    }
    results['sizes'] = sizes;
    results['colors'] = colors;
    return results;
}

export function validateEmail (email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

