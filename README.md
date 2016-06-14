# iconv-urlencode
Node package to encode and decode url-encoded strings from/to every possible encoding

This package uses *iconv-lite* for the encoding from/to different character sets. Therefore 
all encodings supported by this package can be used here.

The converted string is than url-encoded according to the HTML5 specification. The decoding 
works too - first url-decoded and than converted from the desired charset with *iconv-lite*.

## Usage

convert given utf8 string to an url encoded ucs-2 string

```javascript
var conv = require('iconv-urlencode');
var str = 'Oh du fröhliche...';
var urlStr = conv.encode(str, 'ucs-2');
```

convert an string used in an url with utf-7 encoding to local utf-8

```javascript
var conv = require('iconv-urlencode');
var urlStr = 'Oh+du+fr%2BAPY-hliche...';
var str = conv.decode(urlStr, 'utf-7');
```

As Express, Request and Request-Promise packages insist of using utf-8 as the encoding for urls
this package must be used to manually create the url params for some strange web services that do not
adhere to the W3C sugessted utf-8 encoding.

```javascript
var conv = require('iconv-urlencode');
var request = require('request');

var urlStr = 'https://example.org/test';
urlStr = urlStr + '?param1=' + conv.encode('bläh', 'win1252') 
         + '&param2=' + conv.encode('blüb', 'win1252');
         
request.get(urlStr).then(function(response) {
  // ... process get response here
});

```

## License

MIT License
