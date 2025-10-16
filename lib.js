rfr=require("rfr")
util=require("util")
debuglog=util.debuglog('grequire')
rfr.setRoot(__dirname+"/../../");

function includeFolder(folder, ext) {
    ext = ext || "js";
    // if ext manually set to "*", it loads all files
    // if ext is undefined, it loads all js file
    // if ext set to anything else, it loads files with given extension

    var file,
        fileName,
        ret = {},
        files = fs.readdirSync(folder),
        getFileName = function (str) {
            var splited = str.split('.');
            splited.pop();
            return splited.join('.');
        },
        getExtension = function (str) {
            var splited = str.split('.');
            return splited[splited.length - 1];
        };

    for (var i = 0; i < files.length; i++) {
        file = files[i];
        if (getExtension(file) === ext || ext === "*") {
            fileName = getFileName(file);
            try {
                ret[fileName] = require(folder + '/' + file);
            } catch (err) {
                console.log(err.stack);
            }
        }
    }
    return ret;
}


// require a module and make it available to global space by given name
// for example, if you want _ to always able to call underscore utilities globally,
// you can globalRequire("_","underscore");

function globalRequire(name, value) {
    try {
        starttime=Date.now();
        //if((!value)||(value.trim().length===0))
        //  value=name;
        value = value || name;
        if(value == '')
          value = name;
        var temp1=null;
        var temp2=null;
        try{
            temp1=rfr("node_modules/"+value);
        }catch(e){
            try{
                temp2=require(value);
            }catch(e){}    
        }
        var temp=temp1||temp2;
        //console.log(name + ":" + !!temp)
        if (temp) {
            if (!!!global[name]) {
                global[name] = temp;
                endtime=Date.now();
                elapse=endtime-starttime;
                console.log('loaded module: '+value+" ("+elapse+" ms)");
            }
        }
    } catch (e) {
        console.log(e);
    }
}


// grequire smart-initializes a bunch of frequently used modules with conventional global names

function smartRequire(reqlist) {
    // try to add each entry in to required state and save to global.mod
    reqlist = reqlist || [];
    var name, value;
    for (var i in reqlist) {
        try {
            if ((typeof reqlist[i]).toLowerCase() == "string") {
                name = value = reqlist[i];
                globalRequire(name, value);
            }
            else {
                for (name in reqlist[i]) {
                    value = reqlist[i][name];
                    globalRequire(name, value);
                }
            }
        } catch (e) {
        }
    }
}


function requireList() {
    // add your frequently used modules here. They will be attempted to required into global[modName].
    // if you are concerned with global space, use this as dev dependency

    reqlist = [];

    reqlist.push({'require-json': ''});
    reqlist.push({'require-yaml': ''});
    reqlist.push({'require-csv': ''});
    reqlist.push({'require-ini': ''});
    reqlist.push({'require-xml': ''});

    reqlist.push({'fs': 'fs'});
    reqlist.push({'sys': 'util'});
    reqlist.push({'S': 'string'});

    reqlist.push({'_': 'lodash'});
    reqlist.push({'_': 'underscore'});
    reqlist.push({'underscore': ''});
    reqlist.push({'async': ''});
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

    console.log('Requiring modules using grequire...');
    console.log('----');
    smartRequire(reqlist);
    console.log('----');
}

// include files in a folder
// i.e. you can include *.json in /data folder by calling includeFolder("/data","json")
// this will return an array [{"jsonFileName1":{json object}},...]
exports.requireFolder = includeFolder;

// require an array of string or array of key-value pairs to global space
// string will make both name and value the same
// key-value pair allow name of the global object different from name of module
exports.requireArray = smartRequire;

// run this will initialize a basic set of modules smartly
//exports.init = requireList;

// to make things easier, it is set to auto require this list by default.
// fork this repo to your own liking if this is not ok.
requireList();
