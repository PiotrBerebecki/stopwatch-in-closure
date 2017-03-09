console.clear();

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
