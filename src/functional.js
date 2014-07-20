//'use strict';
//var _ = require('node_modules/karma/node_modules/lodash/dist/lodash.js');
//  CTOR
function createMultiplier(multiplyBy)
{
    var multFunc = function(number) {return multiplyBy * number;};
    multFunc.multiplyBy = multiplyBy;
    return multFunc;
}

//createMultiplier.prototype.multiplyBy;

function createAllOfFilter(conditionsArray)
{


    return function(arg) {

        if (conditionsArray != null) {
            //  IMPORTANT!! initial accumulator value is set to first element if not provided explicitly!!
            //
            return _.reduce(conditionsArray,  function(status, item) {
                var iterationStatus = true;
                if (!_.isFunction(item)) {
                    //  ignore non-functions.
                    iterationStatus = true;
                }
                else if (!item(arg)) {
                    //  function evaluated to false!
                    iterationStatus = false;
                }
                //  function evaluated to true. pass accumulated status
                return status && iterationStatus;
            }, true);
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
    //  TODO: don't override arguments
    var transformedArray = array.slice(0);
    _.forEach(conditionsArray, function(cond){ transformedArray = _.filter(array, cond); });
    if(modifier) {
        transformedArray = _.map(transformedArray, modifier);
    }
    return transformedArray;
}