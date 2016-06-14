/** 
 little package to be able to encode every encoding i want to url safe version.
 The algorithm for uri encoding is taken from W3C HTML5 standard, chapter 4.10.22.6 "URL-encoded form data"
 https://www.w3.org/TR/html5/forms.html#url-encoded-form-data

 This package uses the "iconv-lite" package to do some base conversion
 from the internal javascript string to the desired target encoding.
 This string is than form-encoded according to the W3C standard.

 author: Stefan Seide, 2016
*/

var iconv = require('iconv-lite');

module.exports = {

    /**
     * Escape special characters in the given string of for safe url or form data transport.
     * This method allows to create url encoded strings for every encoding iconv-lite knows.
     *
     * @param  {String} txt string to encode/escape
     * @param  {String} destEncoding target encoding of the string before the url encoding is done
     * @return {String}
     */
    encode: function (txt, destEncoding) {
        if (!destEncoding || destEncoding == 'utf8') {
            return encodeURIComponent(txt);
        }

        var b = new Buffer(iconv.encode(txt, destEncoding));
        var retStr = '';
        var length = b.length;
        for (var i = 0; i < length; ++i) {
            var value = b[i];
            if (value == 32) retStr += '+';    // 0x20 - space
            // the following are taken as is
            // 0x2a, 0x2d, 0x2e - * - .
            else if (value == 42 || value == 45 || value == 46) retStr += String.fromCharCode(value);
            // 0x30 -> 0x39 - 0 - 9
            else if (value >= 48 && value <= 57) retStr += String.fromCharCode(value);
            // 0x41 -> 0x5a - us-ascii uppercase letters
            else if (value >= 65 && value <= 90) retStr += String.fromCharCode(value);
            // 0x5f - _
            else if (value == 95) retStr += String.fromCharCode(value);
            // 0x61 -> 0x7a - us-ascii lowercase letters
            else if (value >= 97 && value <= 122) retStr += String.fromCharCode(value);
            else {
                retStr += '%' + (value).toString(16).toUpperCase();
            }
        }
        return retStr;
    },

    /**
     * Unescape special characters in the given string of for safe url or form data transport.
     * This method allows to revert url encoded strings from every encoding iconv-lite knows.
     *
     * @param  {String} txt string to decode/unescape
     * @param  {String} srcEncoding source encoding af the string after url encoding is done
     * @return {String}
     */
    decode: function (txt, srcEncoding) {
        if (!srcEncoding || srcEncoding == 'utf8') {
            return decodeURIComponent(txt);
        }
        txt = txt.replace(/\+/g, ' ');
        var length = txt.length;
        var b = new Buffer(length).fill(0);
        var bufIdx = 0;
        for (var idx = 0; idx < length; ++idx) {
            if (txt[idx] == '%') {
                b[bufIdx] = parseInt(txt.slice(idx + 1, idx + 3), 16);
                idx += 2;
            }
            else {
                b[bufIdx] = txt.charCodeAt(idx);
            }
            ++bufIdx;
        }
        return iconv.decode(b.slice(0, bufIdx), srcEncoding)
    }
};
