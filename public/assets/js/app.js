const timer = (function(display) {

  let isRunning;
  let startTime;
  let elapsedTime = 0;
  let animationFrameId;

  return {
    start: function() {
      if (isRunning) { return; }
      isRunning = true;
      startTime = Date.now() - elapsedTime;
      timer.run();
    },
    run: function() {
      elapsedTime = Date.now() - startTime;
      display.textContent = timer.format(elapsedTime);
      animationFrameId = window.requestAnimationFrame(timer.run);
    },
    stop: function() {
      if (!isRunning) { return; }
      isRunning = false;
      window.cancelAnimationFrame(animationFrameId);
    },
    reset: function() {
      isRunning = false;
      elapsedTime = 0;
      display.textContent = timer.format(elapsedTime);
      window.cancelAnimationFrame(animationFrameId);
    },
    format: function(milliseconds) {
      return new Date(milliseconds).toISOString().slice(-13, -2);
    }
  };
})(document.getElementById('js-display'));


document.getElementById('js-start').addEventListener('click', timer.start);
document.getElementById('js-stop').addEventListener('click', timer.stop);
document.getElementById('js-reset').addEventListener('click', timer.reset);
