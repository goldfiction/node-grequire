/**
 * Created by gli on 1/14/2014.
 */

it('should be able to require grequire module',function(done){
    var mods=require(__dirname+'/../lib.js');
    done();
});

it('should be able to require ini',function(done){
    var shouldbe={ a: { b: 'c' } };
    var test=require('./test.ini')
    //console.log(test)
    //console.log(JSON.stringify(test) == JSON.stringify(shouldbe))
    assert.equal(JSON.stringify(test) == JSON.stringify(shouldbe),true);
    done();
});

it('should be able to use fs when requirelist is ran',function(done){
    assert.equal(!!global.fs, true);
    done();
});

it('should be able to require ini using requireFolder',function(done){
    var grequire=require(__dirname+'/../lib.js');
    var shouldbe={ a: { b: 'c' } };
    var test=grequire.requireFolder(__dirname+'/',"ini");
    assert.equal(JSON.stringify(test.test) == JSON.stringify(shouldbe),true);
    done();
});

