var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class TimedLoop {
    constructor(delay, numberOfIterations, callback) {
        this.delay = delay;
        this.numberOfIterations = numberOfIterations;
        this.callback = callback;
        this.currentIteration = 0;
    }
    timer(delay) {
        return new Promise((res) => setTimeout(res, delay));
    }
    theLoop() {
        return __awaiter(this, void 0, void 0, function* () {
            const numberOfIterations = this.numberOfIterations;
            for (let i = this.currentIteration; i < numberOfIterations; i++) {
                if (this.isRunning) {
                    this.callback(i);
                    this.currentIteration++;
                    yield this.timer(this.delay);
                }
            }
        });
    }
    /**
     * Starts the loop from 0.
     */
    start() {
        if (!this.isRunning) {
            this.currentIteration = 0;
            this.isRunning = true;
            this.theLoop();
        }
        else {
            console.warn('You can only have one loop running in the object.');
        }
    }
    /**
     * Stops the loop and reintializes internal counter to 0.
     */
    stop() {
        this.currentIteration = 0;
        this.isRunning = false;
    }
    /**
     * Pauses the loop while keeping the internal counter intact.
     */
    pause() {
        this.isRunning = false;
    }
    /**
     * Resumes the loop based on the internal counter.
     */
    continue(i = null) {
        if (i) {
            this.currentIteration = i + 1;
            this.isRunning = true;
            this.theLoop();
        }
        else {
            this.isRunning = true;
            this.theLoop();
        }
    }
}
module.exports = TimedLoop;
//# sourceMappingURL=TimedLoop.js.map