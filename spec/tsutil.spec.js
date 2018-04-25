const mocha = require('mocha');
const expect = require('chai').expect;

describe('commonjs module support', () => {
    it('should handle require()', () => {
        const tsutil = require('../src/tsutil');
        expect(tsutil).to.not.be.null;
        expect(tsutil.toSeries).to.be.a('function');
    })
})