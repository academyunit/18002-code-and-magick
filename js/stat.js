'use strict';

/**
 * Добавим немного функциональности в canvas :)
 * @param {string} text
 * @param {int} x
 * @param {int} y
 * @param {int} maxWidth
 */
CanvasRenderingContext2D.prototype.fillTextWordWrap = function (text, x, y, maxWidth) {
  var keywords = text.split('\n');
  var currentTextSize = parseInt(this.font, 10);
  var currentYShift = 0;
  for (var i = 0, keywordsLength = keywords.length; i < keywordsLength; i++) {
    this.fillText(keywords[i], x, y + currentYShift, maxWidth);
    currentYShift += currentTextSize;
  }
};

window.renderStatistics = function (ctx, names, times) {
  var CLOUD_BASE_X_COORDINATE = 100;
  var CLOUD_BASE_Y_COORDINATE = 10;
  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(CLOUD_BASE_X_COORDINATE + 10, CLOUD_BASE_X_COORDINATE + 10, 420, 270);
  // Cloud
  ctx.fillStyle = 'white';
  ctx.fillRect(CLOUD_BASE_X_COORDINATE, CLOUD_BASE_Y_COORDINATE, 420, 270);
  // Show Win/Loose message
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillTextWordWrap('Ура вы победили!\nСписок результатов:', CLOUD_BASE_X_COORDINATE + 20, CLOUD_BASE_Y_COORDINATE + 50);

  var max = -1;
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150;
  var histogramWidth = 40;

  var step = histogramHeight / max;

  var initialX = CLOUD_BASE_X_COORDINATE + 40;
  var initialY = CLOUD_BASE_Y_COORDINATE + 230;
  var indent = 80;

  for (var j = 0; j < times.length; j++) {
    var currentCoordinateX = initialX + indent * j;
    var currentHeightY = -(times[j] * step);

    ctx.fillStyle = (names[j] === 'Вы') ? 'red' : window.getRgbaRandomTransparencyLevel([0, 0, 255]);
    ctx.fillRect(currentCoordinateX, initialY, histogramWidth, currentHeightY);

    ctx.fillStyle = 'black';
    ctx.fillText(names[j], currentCoordinateX, initialY + 20);
    ctx.fillText(parseInt(times[j], 10), currentCoordinateX, currentHeightY + 20); // <-- не работает чего-то c отрицательными координатами
  }
};

window.getHumanFriendlyTime = function (milliseconds) {
  return (milliseconds / 1000).toFixed(2);
};

window.getRgbaRandomTransparencyLevel = function (rgbColor) {
  if (rgbColor.constructor.name === 'Array') {
    rgbColor = rgbColor.join(', ');
  }
  var randomNumber = Math.random();
  randomNumber = randomNumber < 0.1 ? 0.1 : randomNumber.toFixed(1);

  return 'rgba(' + rgbColor + ', ' + randomNumber + ')';
};
