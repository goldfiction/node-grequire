.h1 grequire

** welcome to use this super require module.

*** requireFolder
```javascript
    // include files in a folder
    // i.e. you can include *.json in /data folder by calling includeFolder("/data","json")
    // this will return an array [{"jsonFileName1":{json object}},...]
    exports.includeFolder = includeFolder;
```
*** requireArray
```javascript
    // require an array of string or array of key-value pairs to global space
    // string will make both name and value the same
    // key-value pair allow name of the global object different from name of module
    exports.smartRequire = smartRequire;
```
*** initialize a basic set of modules to global space
```javascript
    current smart require list include following

    reqlist.push({'require-json': ''});
    reqlist.push({'require-yaml': ''});
    reqlist.push({'require-csv': ''});
    reqlist.push({'require-ini': ''});
    reqlist.push({'require-xml': ''});

    reqlist.push({'fs': ''});
    reqlist.push({'sys': ''});
    reqlist.push({'S': 'string'});

    reqlist.push({'_': 'lodash'});
    reqlist.push({'_': 'underscore'});
    reqlist.push({'underscore': 'underscore'});
    reqlist.push({'async': 'async'});
    reqlist.push({'Q': 'q'});

    reqlist.push({'assert': ''});
    reqlist.push({'util': ''});
    reqlist.push({'http': ''});
    reqlist.push({'express': ''});

    reqlist.push({'moment': 'moment'});
    reqlist.push({'needle': 'needle'});
    reqlist.push({'restler': 'restler'});
    reqlist.push({'url': 'url'});
    reqlist.push({'mongoose': 'mongoose'});
    reqlist.push({'cheerio': 'cheerio'});
    reqlist.push({'fibers': 'fibers'});
    reqlist.push({'isodate': 'isodate'});
    reqlist.push({'connect': 'connect'});
    reqlist.push({'passport': 'passport'});
    reqlist.push({'better-require': 'better-require'});
```
*** this module is ideal for dev dependency or small projects
**** Use it after you understand what it does, please.


** change log

*** 0.1.0
* major refactor
* kept the ability to load basic modules
* removed global include
* added requireFolder
* added requireArray
* removed dependency to require-xml
* removed dependency to require-ini
* removed dependency to require-yaml
* removed dependency to require-json
* removed dependency to require-csv
* added smart load for require-xml
* added smart load for require-ini
* added smart load for require-yaml
* added smart load for require-json
* added smart load for require-csv
* requireArray now allows array of string or array of key-value pair objects
