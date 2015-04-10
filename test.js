"use strict";

import {value, assign, bless, coerce, empty, exists} from "./index";

const chai = require('chai');
const expect = chai.expect;

suite('muigui/useful-value', function () {
    test('<static> value', function (done) {
        var d = {one : {two : {three : true, four : [1, 2, 3, 4]}}};

        expect(value(d, 'one')).to.deep.equal(d.one);
        expect(value(d, 'one.two')).to.deep.equal(d.one.two);
        expect(value(d, 'one.two.three')).to.deep.equal(d.one.two.three);
        expect(value(d, 'one.two.four')).to.deep.equal(d.one.two.four);
        expect(value(d, 'one.two.four.2')).to.deep.equal(d.one.two.four[2]);
        expect(value(d, 'one.three.four.2')).to.be.undefined;
        expect(value(d, 'one.two.beep.7')).to.be.undefined;
        expect(value(d, 'one.two.four.7')).to.be.undefined;
        expect(value('foo', 'one.two.four.7')).to.be.undefined;
        expect(value(9, 'one.two.four.7')).to.be.undefined;
        expect(value(undefined, 'one.two.four.7')).to.be.undefined;
        expect(value(null, 'one.two.four.7')).to.be.undefined;

        done();
    });

    test('<static> assign:Object', function (done) {
        var expected = {one : {two : {three : true, four : [1, 2, 3, 4]}}};
        var returned = {};

        assign(returned, 'one', {});
        assign(returned, 'one.two', {});
        assign(returned, 'one.two.three', true);
        assign(returned, 'one.two.four', [1, 2, 3, 4]);

        expect(returned).to.deep.equal(expected);

        done();
    });

    test('<static> assign:Array', function (done) {
        var expected = [1, 2, [3, 4, [5, 6]]],
            returned = [];

        assign(returned, 0, 1);
        assign(returned, 1, 2);
        assign(returned, 2, [3, 4]);
        assign(returned, '2.2', [5, 6]);

        expect(returned).to.deep.equal(expected);

        done();
    });

    test('<static> bless', function (done) {
        var expected = {foo : {bar : 'hello'}};

        expect(bless('foo.bar')).to.be.an('object');

        expect(bless('foo.bar', expected)).to.equal('hello');

        done();
    });

    test('<static> coerce', function (done) {
        expect(coerce('false')).to.be.false;
        expect(coerce('null')).to.be.null;
        expect(coerce('true')).to.be.true;
        expect(coerce('undefined')).to.be.undefined;
        expect(isNaN(coerce('NaN'))).to.be.true;
        expect(coerce('1')).to.equal(1);
        expect(coerce('12')).to.equal(12);
        expect(coerce('123')).to.equal(123);
        expect(coerce('123.4')).to.equal(123.4);
        expect(coerce('123.45')).to.equal(123.45);
        expect(coerce('123.456')).to.equal(123.456);
        expect(coerce('1e10')).to.equal(10000000000);
        expect(coerce('.0000000001e10')).to.equal(1);

        done();
    });

    test('<static> empty', function (done) {
        expect(empty('')).to.be.true;
        expect(empty([])).to.be.true;
        expect(empty(NaN)).to.be.true;
        expect(empty({})).to.be.true;
        expect(empty(null)).to.be.true;
        expect(empty(undefined)).to.be.true;
        expect(empty()).to.be.true;
        expect(empty(0)).to.be.false;
        expect(empty(' ')).to.be.false;
        expect(empty([''])).to.be.false;
        expect(empty({foo : ''})).to.be.false;

        done();
    });

    test('<static> exists', function (done) {
        expect(exists(0)).to.be.true;
        expect(exists(false)).to.be.true;
        expect(exists('')).to.be.true;
        expect(exists(NaN)).to.be.false;
        expect(exists(null)).to.be.false;
        expect(exists(undefined)).to.be.false;

        done();
    });
});
