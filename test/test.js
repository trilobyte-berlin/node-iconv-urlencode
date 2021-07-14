'use strict';

const {expect} = require('chai');
const conv = require('../lib/iconv-urlencode');

describe('test library functions', function() {

  describe('test encode', function() {

    it('test ucs-2 string encode', function() {
      const str = 'Oh du fröhliche...';
      const expectStr = 'O%0h%0+%0d%0u%0+%0f%0r%0%F6%0h%0l%0i%0c%0h%0e%0.%0.%0.%0';

      const encoded = conv.encode(str, 'ucs-2');
      expect(encoded).to.equal(expectStr, 'ucs-2 encoding failed');
    })

    it('test utf-7 string encode', function() {
      const str = 'Oh du fröhliche...';
      const expectStr = 'Oh+du+fr%2BAPY-hliche...';

      const encoded = conv.encode(str, 'utf-7');
      expect(encoded).to.equal(expectStr, 'tf-7 encoding failed');
    })

    it('test win1252 string encode', function() {
      const str = 'Oh du fröhliche...';
      const expectStr = 'Oh+du+fr%F6hliche...';

      const encoded = conv.encode(str, 'win1252');
      expect(encoded).to.equal(expectStr, 'win1252 encoding failed');
    })
  })


  describe('test decode', function() {

    it('test ucs-2 string decode', function() {
      const str = 'O\u0000h\u0000+\u0000d\u0000u\u0000+\u0000f\u0000r\u0000%F6\u0000h\u0000l\u0000i\u0000c\u0000h\u0000e\u0000.\u0000.\u0000.\u0000';
      const expectStr = 'Oh du fröhliche...';

      const decoded = conv.decode(str, 'ucs-2');
      expect(decoded).to.equal(expectStr, 'ucs-2 decoding failed');
    })

    it('test utf-7 string decode', function() {
      const str = 'Oh+du+fr%2BAPY-hliche...';
      const expectStr = 'Oh du fröhliche...';

      const decoded = conv.decode(str, 'utf-7');
      expect(decoded).to.equal(expectStr, 'utf-7 decoding failed');
    })

    it('test win1252 string decode', function() {
      const str = 'Oh+du+fr%F6hliche...';
      const expectStr = 'Oh du fröhliche...';

      const decoded = conv.decode(str, 'win1252');
      expect(decoded).to.equal(expectStr, 'win1252 decoding failed');
    })
  })
})
