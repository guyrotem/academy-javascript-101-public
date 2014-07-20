'use strict';

function EventEmitter()
{
    this.listeners = [];
    this.onceListeners = [];

    this.addListener = function(event, listener) {
        this.listeners.push ([event, listener]);
    };

    this.removeListener = function(event, listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    };

    this.once = function(event, listener)
    {
        this.onceListeners.push ([event, listener]);
    };

    this.emit = function(event, dataArgument) {
        //  Debug
        //_.forEach(this.onceListeners, function(eventStored) {console.log(eventStored[0]+';'+eventStored[1]);});

        var onceEventsRelated = _.filter(this.onceListeners, function(eventType) { return event == eventType[0]; });
        _.forEach(onceEventsRelated, function(eventType) { eventType[1](dataArgument); });
        var eventsRelated = _.filter(this.listeners, function(eventType) { return event == eventType[0]; });
        _.forEach(eventsRelated, function(eventType) {eventType[1]( dataArgument )});
        //console.log(this.onceListeners.length);

        this.onceListeners = _.filter(this.onceListeners, function (eventListener) {
            return eventListener[0] != event;
        } );
        //console.log(this.onceListeners.length);
        //console.log(onceEventsRelated.length + ' ' + eventsRelated.length);

    };
}

function ApproxyPi() {
    this.pi = 0;
    this.precision = 0;
    this.isInProcess = false;
    this.startSeriesAt = 0;

    this.calc = function(precision) {

        this.emit('start');

        if(precision >= this.precision) {

            if(!this.isInProcess) {
                this.pi = 0;
                this.startSeriesAt = 0;
                this.isInProcess = true;
            }

            var requiredNumberOfItems = Math.ceil((Math.pow(10, precision+1) - 1) / 2);

            var useFunctional = false;
            if(useFunctional) { //  false
                var numArray = new Array();
                for (var k = 0; k < requiredNumberOfItems; k++) {
                    numArray.push(k);
                }

                numArray = _.map(numArray, ApproxyPi.getSeriesItem);
                this.pi = _.reduce(numArray, function (sum, num) {
                    return sum + num;
                });

            }
            else
            {
                for(var k = this.startSeriesAt; k < requiredNumberOfItems; k++)
                {
                    this.pi += ApproxyPi.getSeriesItem(k);

                    if(k%100 == 0) {
                        this.emit('progress');
                        this.startSeriesAt = k+1;
                        var self = this;
                        window.setTimeout(this.calc.bind(self), 0);
                        return;
                    }
                }
                this.isInProcess = false;
            }

            this.precision = precision;
        }
        //console.log('emitting done... pi = '+this.pi + ' prec = '+ this.precision);
        this.emit('done');
    }
};

ApproxyPi.getSeriesItem = function getSeriesItem(n) {
    return 4 * Math.pow(-1, n) / (2*n+1);
};

ApproxyPi.prototype = new EventEmitter();