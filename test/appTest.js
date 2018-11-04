const except = require('chai').assert;

const app = require('../app');




    describe('hamming', function(){
        it('the function should return 3', function(){
except.equal(hamming, 2);
        });

        it('the function should return false', function(){
            except.equal(hamming2, 'Enter two texts/string seperated by a comma');
                    });
                    it('the function should return length inequality', function(){
                        except.equal(hamming3, 'the length are not uniform');
                                });
    });
