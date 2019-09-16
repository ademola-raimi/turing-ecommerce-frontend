import React from 'react';
import { jwtDecode } from 'jwt-decode';
import helper_factory from './factory/helperFactory';

const emptyContent = [];

import {
    isLoggedIn,
    formatAttributes,
    validateEmail
} from '../helpers/helper';

jest.mock('jwt-decode', () => {
    return jest.fn().mockImplementation(() => {
        return {customerId: 1234};
    });
});

const mockCustomerId = '1234';
const mockToken = '1234567890abcdefghij';

// TESTS
describe('Helpers.isLoggedIn', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('isLoggedIn should be false when no props are passed and localStorage is empty', () => {
        expect(isLoggedIn()).toBe(false);
    });

    it('isLoggedIn should be true when no props are passed and localStorage is set for token and customerId', () => {
        localStorage.setItem('token', '1234567890abcdefghijkl');
        localStorage.setItem('customerId', '-9999');
        expect(isLoggedIn()).toBe(true);
    });

    it('isLoggedIn should be true when no props are passed and localStorage is set for token only', () => {
        localStorage.setItem('token', '1234567890abcdefghijkl');
        expect(isLoggedIn()).toBe(false);
    });

    it('isLoggedIn should be true when no props are passed and localStorage is set for customerId only', () => {
        localStorage.setItem('customerId', '-9999');
        expect(isLoggedIn()).toBe(false);
    });
});

describe('Helpers.formatAttributes', () => {
    it('formatAttributes returns a formatted attributes', () => {
        const attributes = helper_factory.attributes;
        let results = [];
        results['sizes'] = [ 'S', 'M' ];
        results['colors'] = [ 'Green', 'White' ];
        expect(formatAttributes(attributes)).toStrictEqual(results);
    });

    it('formatAttributes should not fail when parameter is empty', () => {
        let results = [];
        results['sizes'] = [];
        results['colors'] = [];
        expect(formatAttributes([])).toStrictEqual(results);
    });
});

describe('Helpers.validateEmail', () => {
    it('validateEmail returns true for valid email', () => {
        const email = "johndoe@sample.com";
        expect(validateEmail(email)).toBe(true);
    });

    it('validateEmail returns false for valid email', () => {
        const email = "sample.com";
        expect(validateEmail(email)).toBe(false);
    });

    it('validateEmail returns false for valid email', () => {
        const email = "johndoe@sample";
        expect(validateEmail(email)).toBe(false);
    });
});
