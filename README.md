# Stopwatch in a closure

Stopwatch business logic in a single compact IIFE

```javascript
const timer = (function(display) {

  let isRunning;
  let startTime;
  let elapsedTime = 0;
  let animationFrameId;

  function run() {
    elapsedTime = Date.now() - startTime;
    display.textContent = format(elapsedTime);
    animationFrameId = window.requestAnimationFrame(run);
  }

  function format(milliseconds) {
    return new Date(milliseconds).toISOString().slice(-13, -2);
  }

  return {
    start: function() {
      if (isRunning) { return; }
      isRunning = true;
      startTime = Date.now() - elapsedTime;
      run();
    },
    stop: function() {
      if (!isRunning) { return; }
      isRunning = false;
      window.cancelAnimationFrame(animationFrameId);
    },
    reset: function() {
      isRunning = false;
      elapsedTime = 0;
      display.textContent = format(elapsedTime);
      window.cancelAnimationFrame(animationFrameId);
    }
  };
})(document.getElementById('js-display'));


document.getElementById('js-start').addEventListener('click', timer.start);
document.getElementById('js-stop').addEventListener('click', timer.stop);
document.getElementById('js-reset').addEventListener('click', timer.reset);
```

Live version: https://piotrberebecki.github.io/stopwatch-in-closure/

<img src="./src/graphics/screencast.gif" width="275px" height="auto">

## Tech stack
* Vanilla JavaScript
* ES6
* Flexbox
* Browsersync

## Getting started

```sh
git clone `REPO URL HERE`
cd 'REPO NAME HERE'
npm install

#1. Start the development server with Browsersync reloading
npm start

#2. Open this url in your browser: http://localhost:3000
```
