# timed-loop
JavaScript class which allows making of loops which wait after each iteration. 

## Initialize TimedLoop

TimedLoop can be initialized using the following function with arguments as follows: 

- wait time before each iteration happens (in ms, same as with built-in setTimeout and setInterval functions)
- number of iterations to happen - 10 is equal to:
```js
for (let i = 0; i < 10; i++) {}
```
- callback function which receives ```i``` as an argument, representing number of the current iteration

For example:

```js
import TimedLoop from './dist/TimedLoop'
const timedLoop = new TimedLoop(100, 5, (i) => {
  console.log('Hello', i);
})
```

## Methods

After initializing TimedLoop, you can access multiple methods it provides: 

```start()``` - starts the loop from 0
```js
const timedLoop = new TimedLoop(100, 5, (i) => {
  console.log('Hello', i);
});

timedLoop.start() 
``` 
```
Hello 0
Hello 1
Hello 2
Hello 3
Hello 4
```

```stop()``` - stops the loop and resets the counter to 0
```js
const timedLoop = new TimedLoop(100, 5, (i) => {
  console.log('Hello', i);
  if (i == 2) {
    timedLoop.stop();
  }
});

timedLoop.start();
```
```
Hello 0
Hello 1
Hello 2
```

```pause()``` - pauses the loop while keeping the internal counter intact, allowing it to be resumed later

```resume()``` - resumes the loop based on the internal counter
```js
const TimedLoop = require('./dist/TimedLoop');
const timedLoop = new TimedLoop(100, 5, (i) => {
  console.log('Hello', i);
  if (i == 2) {
    timedLoop.pause();
    setTimeout(() => {
      timedLoop.continue()
    }, 2000)
  }
});

timedLoop.start();
```
```
Hello 0
Hello 1
Hello 2
...waits for 2000 ms
Hello 3
Hello 4
```