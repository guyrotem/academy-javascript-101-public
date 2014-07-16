//'use strict';
//var _ = require('node_modules/karma/node_modules/lodash/dist/lodash.js');
//  CTOR
function createMultiplier(multiplyBy)
{
    return function(number) {return multiplyBy * number;}
}

//createMultiplier.prototype.multiplyBy;

function createAllOfFilter(conditionsArray)
{
    return function(arg) {

        if (conditionsArray != null) {

            return _.reduce(conditionsArray,  function(status, item) {
                //var item = conditionsArray[key];
                var iterationStatus = true;
                if (typeof(item) != 'function') {
                    //  ignore non-functions.
                    iterationStatus = true;
                }
                else if (!item(arg)) {
                    //  function evaluated to false!
                    iterationStatus = false;
                }
                //  function evaluated to true. pass accumulated status
                return status && iterationStatus;
            });
        }
        else
        {
            //  no conditions. "emptily true"
            return true;
        }
    }

}

function transformArray(array, conditionsArray, modifier)
{
    //_.filter
}