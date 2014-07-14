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

      it('should support multiple events', function(){
        emitter.addListener('firstEvent', myListener);
        emitter.addListener('secondEvent', myListener);
        emitter.addListener('thirdEvent', myListener);

        emitter.emit('firstEvent', 'firstEvent');
        emitter.emit('secondEvent', 'secondEvent');
        emitter.emit('thirdEvent', 'thirdEvent');

        expect(myListener.wasCalledWithData).toEqual(['firstEvent', 'secondEvent','thirdEvent']);
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

      it('should support multiple events', function(){
        emitter.once('firstEvent', myListener);
        emitter.once('secondEvent', myListener);
        emitter.once('thirdEvent', myListener);

        emitter.emit('firstEvent', 'firstEvent');
        emitter.emit('secondEvent', 'secondEvent');
        emitter.emit('thirdEvent', 'thirdEvent');

        expect(myListener.wasCalledWithData).toEqual(['firstEvent', 'secondEvent','thirdEvent']);
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

  describe('PiCalc', function () {
    var piCalc;
    beforeEach(function () {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
      piCalc = new PiCalc();
    });

    describe('general instructions:', function () {
      describe('PiCalc approximates pi using statistical calculation. Use PiCalc.isRandomPointInUnitCircle to approximate pi with any wanted accuracy', function () {
        describe('piCalc.isRandomPointInUnitCircle() - statistically it should converge to pi/4', function () {
          it('should return true if a random 2d point at [0..1],[0..1] is within the unit circle.', function () {
            var inCircle = 0, i;
            for (i = 0; i < 1000; i++) {
              inCircle++;
            }
            expect(Math.round(4 * inCircle / 100)).toBe(31);
          });
        });
      });
    });

    it('should include "pi" initiated at 3.1', function () {
      expect(piCalc.pi).toBe(3.1);
    });

    it('should include "precision" initiated at 1', function () {
      expect(piCalc.precision).toBe(1);
    });

    it('should be an event emitter', function () {
      expect(piCalc instanceof EventEmitter).toBeTruthy();
    });

    describe('the #calc(precision) method', function () {
      describe('after the calc method was called', function () {
        it('should emit a "start" event immediately', function () {
          var wasCalled = false;
          piCalc.once('start', function () {
            wasCalled = true;
          });

          piCalc.calc(1);

          expect(wasCalled).toBeTruthy();
        });

        describe('the "done" event', function () {
          it('should be emitted when the approximation is accurate to the nth digit as defined by the calc call', function (done) {
            piCalc.once('done', function () {
              expect(Math.abs(Math.pi - piCalc.pi)).toBeLessThan(Math.pow(10, -piCalc.precision));
              expect(piCalc.precision).toBe(3);
            });

            piCalc.calc(3);
          });
        });

        describe('the "progress" event', function () {
          it('should be emitted often when pi approximation improves', function (done) {
            function itemToBeSmallerThanPrevious(item, index, array) {
              if (index === 0) {
                return true;
              }
              return item < array[index - 1];
            }

            var approximationDelta = [];

            piCalc.addListener('progress', function () {
              approximationDelta.push(Math.abs(Math.PI - piCalc.pi));
            });

            piCalc.once('done', function () {
              expect(approximationDelta.length).toBeGreaterThan(5);
              expect(approximationDelta.every(itemToBeSmallerThanPrevious)).toBeTruthy();
              done();
            });

            piCalc.calc(4);
          });
        });

        it('should be non-blocking', function (done) {
          var ticker = 0;
          var intervalId;
          var startTime = Date.now();
          setInterval(function () {
            ticker++;
          }, 10);

          piCalc.once('done', function () {
            var duration = Date.now() - startTime;
            clearInterval(intervalId);
            expect(ticker).toBeGreaterThan(duration / 100);
            done();
          });

          piCalc.calc(5);
        });
      });


      describe('when #calc is called for the second (or more) time', function () {
        beforeEach(function (done) {
          piCalc.once('done', done);
          piCalc.calc(3);
        });

        it('should not recalculate for lower or equal precision values', function () {
          var doneCount = 0;
          pi.addListener('done', function () {
            doneCount++;
          });

          piCalc.calc(1);
          piCalc.calc(2);
          piCalc.calc(3);

          expect(doneCount).toBe(3);
        });

        it('should take less time to calculate higher precision values', function (done) {
          var virginPiCalc = new PiCalc();
          virginPiCalc.$startTime = Date.now();

          virginPiCalc.once('done', function () {
            virginPiCalc.$endTime = Date.now();
            virginPiCalc.$duration = virginPiCalc.$endTime - virginPiCalc.$startTime;
            // once we're done calculating from scratch, we start the timer and calculation from 3 to 4 digits
            piCalc.$startTime = Date.now();
            piCalc.calc(4);
          });

          piCalc.once('done', function () {
            piCalc.$endTime = Date.now();
            piCalc.$duration = piCalc.$endTime - piCalc.$startTime;

            // 20% is just a random value, it should be much more!
            expect(virginPiCalc.$duration).toBeGreaterThan(piCalc.$duration * 1.2);
            done();
          });

          virginPiCalc.calc(4);
        });
      });
    });
  });
});