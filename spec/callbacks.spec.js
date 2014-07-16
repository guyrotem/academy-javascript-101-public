describe('callbacks and events', function () {
  describe('EventEmitter', function () {
    var emitter;
    var myListener;

    beforeEach(function () {
      emitter = new EventEmitter();
      myListener = function (data) {
        myListener.wasCalledWithData.push(data);
      };
      myListener.wasCalledWithData = [];
    });

    describe('addListener and emit', function () {
      it('should call the event listener upon emit', function () {
        emitter.addListener('firstEvent', myListener);

        emitter.emit('firstEvent');

        expect(myListener.wasCalledWithData.length).toBe(1);
      });

      it('should call the listeners with data argument passed to the emit method', function () {
        emitter.addListener('firstEvent', myListener);

        emitter.emit('firstEvent', 'some data');

        expect(myListener.wasCalledWithData).toEqual(['some data']);
      });

      it('should set the scope of the listener to the emitter', function () {
        var listenerScope;
        emitter.addListener('firstEvent', function () {
          listenerScope = this;
        });

        emitter.emit('firstEvent');

        expect(listenerScope).toBe(emitter);
      });

      it('should support multiple events', function () {
        emitter.addListener('firstEvent', myListener);
        emitter.addListener('secondEvent', myListener);
        emitter.addListener('thirdEvent', myListener);

        emitter.emit('firstEvent', 'firstEvent');
        emitter.emit('secondEvent', 'secondEvent');
        emitter.emit('thirdEvent', 'thirdEvent');

        expect(myListener.wasCalledWithData).toEqual(['firstEvent', 'secondEvent', 'thirdEvent']);
      });

      it('should call the listener as many times as the event was emitted', function () {
        emitter.addListener('firstEvent', myListener);

        emitter.emit('firstEvent');
        emitter.emit('firstEvent');
        emitter.emit('firstEvent');

        expect(myListener.wasCalledWithData.length).toBe(3);
      });
    });

    describe('once', function () {
      it('should call the event listener upon emit', function () {
        emitter.once('firstEvent', myListener);

        emitter.emit('firstEvent');

        expect(myListener.wasCalledWithData.length).toBe(1);
      });

      it('should call the listeners with data argument passed to the emit method', function () {
        emitter.once('firstEvent', myListener);

        emitter.emit('firstEvent', 'some data');

        expect(myListener.wasCalledWithData).toEqual(['some data']);
      });

      it('should set the scope of the listener to the emitter', function () {
        var listenerScope;
        emitter.once('firstEvent', function () {
          listenerScope = this;
        });

        emitter.emit('firstEvent');

        expect(listenerScope).toBe(emitter);
      });

      it('should call the listener only once, ignoring further emits', function () {
        emitter.once('firstEvent', myListener);

        emitter.emit('firstEvent');
        emitter.emit('firstEvent');
        emitter.emit('firstEvent');

        expect(myListener.wasCalledWithData.length).toBe(1);
      });


      it('should allow listeners to be re-added after called', function () {
        emitter.once('firstEvent', myListener);
        emitter.emit('firstEvent');

        emitter.once('firstEvent', myListener);
        emitter.emit('firstEvent');

        expect(myListener.wasCalledWithData.length).toBe(2);
      });

      it('should support multiple events', function () {
        emitter.once('firstEvent', myListener);
        emitter.once('secondEvent', myListener);
        emitter.once('thirdEvent', myListener);

        emitter.emit('firstEvent', 'firstEvent');
        emitter.emit('secondEvent', 'secondEvent');
        emitter.emit('thirdEvent', 'thirdEvent');

        expect(myListener.wasCalledWithData).toEqual(['firstEvent', 'secondEvent', 'thirdEvent']);
      });
    });

    describe('removeListener', function () {
      it('should make listeners inactive', function () {
        emitter.addListener('firstEvent', myListener);
        emitter.removeListener('firstEvent', myListener);

        emitter.emit('firstEvent');

        expect(myListener.wasCalledWithData.length).toBe(0);
      });

      it('should not prevent re-adding a listener', function () {
        emitter.addListener('firstEvent', myListener);
        emitter.removeListener('firstEvent', myListener);
        emitter.addListener('firstEvent', myListener);

        emitter.emit('firstEvent');

        expect(myListener.wasCalledWithData.length).toBe(1);
      });
    });
  });

  describe('ApproxyPi', function () {
    var approxyPi;
    beforeEach(function () {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
      approxyPi = new ApproxyPi();
    });

    describe('general instructions:', function () {
      describe('ApproxyPi approximates pi using the following series: pi = sum(i=0..inf){4*(-1)^i/(2*i+1)}', function () {
        describe('ApproxyPi.getSeriesItem', function () {
          it('should return the nth item of the series', function () {
            expect(ApproxyPi.getSeriesItem(0)).toBe(4);
            expect(ApproxyPi.getSeriesItem(1)).toBe(-4 / 3);
            expect(ApproxyPi.getSeriesItem(2)).toBe(4 / 5);
            expect(ApproxyPi.getSeriesItem(3)).toBe(-4 / 7);
          });
        });
      });
    });

    it('should include "pi" initiated at 0', function () {
      expect(approxyPi.pi).toBe(0);
    });

    it('should include "precision" initiated at 0', function () {
      expect(approxyPi.precision).toBe(0);
    });

    it('should be an event emitter', function () {
      expect(approxyPi instanceof EventEmitter).toBeTruthy();
    });

    describe('the #calc(precision) method', function () {
      var _done;

      function done() {
        _done = true;
      }

      function isDone() {
        return _done;
      }

      beforeEach(function () {
        _done = false;
      });

      describe('after the calc method was called', function () {
        it('should emit a "start" event immediately', function () {
          var wasCalled = false;
          approxyPi.once('start', function () {
            wasCalled = true;
          });

          approxyPi.calc(1);

          expect(wasCalled).toBeTruthy();
        });

        describe('the "done" event', function () {
          it('should be emitted when the approximation is accurate to the nth digit as defined by the calc call', function () {

            approxyPi.once('done', function () {
              expect(Math.abs(Math.PI - approxyPi.pi)).toBeLessThan(Math.pow(10, -approxyPi.precision));
              expect(approxyPi.precision).toBe(3);
              done();
            });

            approxyPi.calc(3);
            waitsFor(isDone, '"done" event to be emitted', 5000);
          });
        });

        describe('the "progress" event', function () {
          it('should be emitted often when pi approximation improves', function () {
            function itemToBeSmallerThanPrevious(item, index, array) {
              if (index === 0) {
                return true;
              }
              return item < array[index - 1];
            }

            var approximationDelta = [];

            approxyPi.addListener('progress', function () {
              approximationDelta.push(Math.abs(Math.PI - approxyPi.pi));
            });

            approxyPi.once('done', function () {
              expect(approximationDelta.length).toBeGreaterThan(5);
              expect(approximationDelta.every(itemToBeSmallerThanPrevious)).toBeTruthy();
              done();
            });

            approxyPi.calc(5);

            waitsFor(isDone, '"done" event to be emitted', 2000);
          });
        });

        it('should be non-blocking', function () {
          var ticker = 0;
          var intervalId;
          var startTime = Date.now();
          setInterval(function () {
            ticker++;
          }, 10);

          approxyPi.once('done', function () {
            var duration = Date.now() - startTime;
            clearInterval(intervalId);
            expect(ticker).toBeGreaterThan(duration / 100);
            done();
          });

          approxyPi.calc(5);
          waitsFor(isDone, '"done" event to be emitted', 2000);
        });
      });


      describe('when #calc is called for the second (or more) time', function () {
        beforeEach(function () {
          approxyPi.once('done', done);
          approxyPi.calc(3);
          waitsFor(isDone, '"done" event to be emitted', 2000);
        });

        it('should not recalculate for lower or equal precision values', function () {
          var doneCount = 0;
          approxyPi.addListener('done', function () {
            doneCount++;
          });

          approxyPi.calc(1);
          approxyPi.calc(2);
          approxyPi.calc(3);

          expect(doneCount).toBe(3);
        });

        it('should take less time to calculate higher precision values', function () {
          var virginApproxyPi = new ApproxyPi();
          virginApproxyPi.$startTime = Date.now();

          virginApproxyPi.once('done', function () {
            virginApproxyPi.$endTime = Date.now();
            virginApproxyPi.$duration = virginApproxyPi.$endTime - virginApproxyPi.$startTime;
            // once we're done calculating from scratch, we start the timer and calculation from 3 to 4 digits
            approxyPi.$startTime = Date.now();
            approxyPi.calc(4);
          });

          approxyPi.once('done', function () {
            approxyPi.$endTime = Date.now();
            approxyPi.$duration = approxyPi.$endTime - approxyPi.$startTime;

            // 20% is just a random value, it should be much more!
            expect(virginApproxyPi.$duration).toBeGreaterThan(approxyPi.$duration * 1.2);
            done();
          });

          virginApproxyPi.calc(4);
          waitsFor(isDone, '"done" event to be emitted by approxyPi', 2000);
        });
      });
    });
  });
});