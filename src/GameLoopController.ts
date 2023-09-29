export class GameLoopController {
  private intervalId: NodeJS.Timer | null;
  private state: number;
  private callback: any;
  private interval: number;

  constructor(callback: any, interval: number) {
    this.intervalId = setInterval(() => this.callback(), interval);
    this.state = 1;
    this.callback = callback;
    this.interval = interval;
  }

  private clearInterval() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public end() {
    this.clearInterval();
  }

  public pause() {
    if (this.state === 1) {
      this.clearInterval();
      this.state = 2;
    }
  }

  public resume(countdown: number) {
    if (this.state === 2) {
      if (countdown > 0) {
        setTimeout(() => {
          this.clearInterval();
          console.log(this);
          this.intervalId = setInterval(() => this.callback(), this.interval);
          this.state = 1;
        }, countdown);
      } else {
        this.clearInterval();
        this.intervalId = setInterval(() => this.callback(), this.interval);
        this.state = 1;
      }
    }
  }
}
