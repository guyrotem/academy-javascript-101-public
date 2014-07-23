'use strict';

function EventEmitter()
{
    this.listenersAdded = [];
    this.listenersOnce = [];

    this.addListener = function(event, listener) {
        //  TODO : refactor to "push and create"
        if(this.listenersAdded[event] == undefined)
        {
            this.listenersAdded[event] = [];
        }
        this.listenersAdded[event].push(listener);
    };

    this.removeListener = function(event, listener) {
        this.listenersAdded[event].splice(this.listenersAdded[event].indexOf(listener), 1);
    };

    this.once = function(event, listener)
    {
        if(this.listenersOnce[event] == undefined)
        {
            this.listenersOnce[event] = [];
        }
        this.listenersOnce[event].push ( listener );
        //  {event: event, listener: listener}
    };

    this.emit = function(event, dataArgument) {

        var onceEventsRelated = this.listenersOnce[event];
        this.listenersOnce[event] = [];
        var self = this;
        _.forEach(onceEventsRelated, function( listener ) {
            listener.call(self, dataArgument);
        });
        var addedEventsRelated = this.listenersAdded[event];
        _.forEach(addedEventsRelated, function( listener ) {
            listener.call(self, dataArgument );

        });

    };
}

function ApproxyPi() {
    this.pi = 0;
    this.precision = 0;
    //this.isInProcess = false;
    this.iterationsDone = 0;
    this.iterationsLeft = 0;

    this.runLoop = function() {
        for(var k = this.iterationsDone; k < this.iterationsLeft; k++) {
            this.pi += ApproxyPi.getSeriesItem(k);
            this.iterationsDone++;
            this.emit('progress');

            if (k%10 == 0) {

                window.setTimeout(this.runLoop.apply(this, null), 0);
                return;
            }
        }
        //console.log("DONE "+this.iterationsDone+ " prec: "+ this.precision);
        this.emit('done');
    };

    this.calc = function(precision) {

        console.log("starting "+precision);

        this.emit('start');

        if(precision <= this.precision) {
            //console.log(precision + ' <= ' + this.precision);
            this.emit('done');
            return;
        }

        this.precision = precision;
        this.iterationsLeft = Math.ceil(Math.pow(10, precision)+1);
        this.iterationsDone = 0;
        this.pi = 0;

        //this.isInProcess = true;
        this.runLoop();

    }
}

ApproxyPi.getSeriesItem = function getSeriesItem(n) {
    return 4 * Math.pow(-1, n) / (2*n+1);
};

ApproxyPi.prototype = new EventEmitter();