type callbackFunction = (...args: any[]) => any;

class TimedLoop {
  private delay: number;
  private numberOfIterations: number;
  private currentIteration: number;
  private isRunning: boolean;
  private callback: callbackFunction;

  constructor(
    delay: number,
    numberOfIterations: number,
    callback: callbackFunction
  ) {
    this.delay = delay;
    this.numberOfIterations = numberOfIterations;
    this.callback = callback;
    this.currentIteration = 0;
  }

  private timer(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  private async theLoop() {
    const numberOfIterations = this.numberOfIterations;
    for (let i = this.currentIteration; i < numberOfIterations; i++) {
      if (this.isRunning) {
        this.callback(i);
        this.currentIteration++;
        await this.timer(this.delay);
      }
    }
  }

  /**
   * Starts the loop from 0.
   */
  public start() {
    if (!this.isRunning) {
      this.currentIteration = 0;
      this.isRunning = true;
      this.theLoop();
    } else {
      console.warn('You can only have one loop running in the object.');
    }
  }

  /**
   * Stops the loop and reintializes internal counter to 0.
   */
  public stop() {
    this.currentIteration = 0;
    this.isRunning = false;
  }

  /**
   * Pauses the loop while keeping the internal counter intact.
   */
  public pause() {
    this.isRunning = false;
  }

  /**
   * Resumes the loop based on the internal counter.
   */
  public continue(i: (null|number) = null) {
    if (i) {
      this.currentIteration = i+1
      this.isRunning = true;
      this.theLoop();
    } else {
      this.isRunning = true;
      this.theLoop();
    }
  }
}

module.exports = TimedLoop;
