'use strict';

window.renderStatistics = function (ctx, names, times) {
  // Тень
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(
      window.renderStatistics.CLOUD_BASE_X_COORDINATE + 10,
      window.renderStatistics.CLOUD_BASE_Y_COORDINATE + 10,
      420,
      270);
  // Квадратное Облако :)
  ctx.fillStyle = 'white';
  ctx.fillRect(
      window.renderStatistics.CLOUD_BASE_X_COORDINATE,
      window.renderStatistics.CLOUD_BASE_Y_COORDINATE,
      420,
      270);
  // Сообщение о победе
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  window.fillTextWordWrap(ctx,
      'Ура вы победили!\nСписок результатов:',
      window.renderStatistics.CLOUD_BASE_X_COORDINATE + 40,
      window.renderStatistics.CLOUD_BASE_Y_COORDINATE + 30);

  window._createStatsTables(ctx, times, names);
};
// Constants
window.renderStatistics.HISTOGRAM_HEIGHT = 150;
window.renderStatistics.HISTOGRAM_WIDTH = 40;
window.renderStatistics.CLOUD_BASE_X_COORDINATE = 100;
window.renderStatistics.CLOUD_BASE_Y_COORDINATE = 10;
window.renderStatistics.INDENT_SPACE = 80;

/**
 * Сгенерировать столбцы гистаграмы.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {int} times Массив с временем игроков
 * @param {int} names Массив с их именами
 * @private
 */
window._createStatsTables = function (ctx, times, names) {
  var step = window.renderStatistics.HISTOGRAM_HEIGHT / window._getMaxPlayerScore(times);

  var initialX = window.renderStatistics.CLOUD_BASE_X_COORDINATE + 70;
  var initialY = window.renderStatistics.CLOUD_BASE_Y_COORDINATE + 230;
  for (var j = 0; j < times.length; j++) {
    var currentCoordinateX = initialX + window.renderStatistics.INDENT_SPACE * j;
    var currentHeightY = -(times[j] * step);
    var currentScoreTextCoordinateY = initialY - (-currentHeightY) - 5;

    // Столбцы
    ctx.fillStyle = (names[j] === 'Вы') ? 'red' : window._getRgbaRandomTransparencyLevel([0, 0, 255]);
    ctx.fillRect(currentCoordinateX, initialY, window.renderStatistics.HISTOGRAM_WIDTH, currentHeightY);
    // Очки на столбцах
    ctx.fillStyle = 'black';
    ctx.fillText(names[j], currentCoordinateX, initialY + 20);
    ctx.fillText(parseInt(times[j], 10), currentCoordinateX, currentScoreTextCoordinateY);
  }
};

/**
 * Написать текст методом fillText() canvas'a с автоматической поддержкой
 * переносов строки через "\n".
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} text
 * @param {int} x
 * @param {int} y
 * @param {int} maxWidth
 */
window.fillTextWordWrap = function (ctx, text, x, y, maxWidth) {
  var keywords = text.split('\n');
  var currentTextSize = parseInt(ctx.font, 10);
  var currentYShift = 0;
  for (var i = 0, keywordsLength = keywords.length; i < keywordsLength; i++) {
    ctx.fillText(keywords[i], x, y + currentYShift, maxWidth);
    currentYShift += currentTextSize;
  }
};

/**
 * Найти максимальное кол-во очков среди всех игроков.
 *
 * @param {int} times
 * @return {number}
 * @private
 */
window._getMaxPlayerScore = function(times) {
  var max = -1;
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }
  return max;
};

/**
 * Сгенерировать прозрачность в формате rgba() для цвета rgbColor.
 *
 * @param {string|array} rgbColor
 * @return {string}
 * @private
 */
window._getRgbaRandomTransparencyLevel = function (rgbColor) {
  if (rgbColor.constructor.name === 'Array') {
    rgbColor = rgbColor.join(', ');
  }
  var randomNumber = Math.random();
  randomNumber = randomNumber < 0.1 ? 0.1 : randomNumber.toFixed(1);

  return 'rgba(' + rgbColor + ', ' + randomNumber + ')';
};
