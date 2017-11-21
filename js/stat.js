'use strict';

(function () {
  // Константы
  var HISTOGRAM_HEIGHT = 150;
  var HISTOGRAM_WIDTH = 40;
  var CLOUD_BASE_X_COORDINATE = 100;
  var CLOUD_BASE_Y_COORDINATE = 10;
  var INDENT_SPACE = 80;

  window.renderStatistics = function (ctx, names, times) {
    // Тень
    renderRect(
        ctx,
        CLOUD_BASE_X_COORDINATE + 10,
        CLOUD_BASE_Y_COORDINATE + 10,
        420,
        270,
        'rgba(0, 0, 0, 0.7)'
    );
    // Квадратное Облако :)
    renderRect(
        ctx,
        CLOUD_BASE_X_COORDINATE,
        CLOUD_BASE_Y_COORDINATE,
        420,
        270,
        'white'
    );
    renderText(
        ctx,
        'Ура вы победили!\nСписок результатов:',
        CLOUD_BASE_X_COORDINATE + 40,
        CLOUD_BASE_Y_COORDINATE + 30
    );
    createStatsTables(ctx, times, names);
  };

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {int} x
   * @param {int} y
   * @param {int} w
   * @param {int} h
   * @param {string} color
   */
  var renderRect = function (ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  };

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} text
   * @param {int} x
   * @param {int} y
   */
  var renderText = function (ctx, text, x, y) {
    ctx.fillStyle = 'black';
    ctx.font = '16px PT Mono';
    fillTextWordWrap(ctx, text, x, y);
  };

  /**
   * Сгенерировать столбцы гистаграмы.
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {int} times Массив с временем игроков
   * @param {int} names Массив с их именами
   */
  var createStatsTables = function (ctx, times, names) {
    var step = HISTOGRAM_HEIGHT / getMaxPlayerScore(times);

    var initialX = CLOUD_BASE_X_COORDINATE + 70;
    var initialY = CLOUD_BASE_Y_COORDINATE + 230;
    for (var j = 0; j < times.length; j++) {
      var currentCoordinateX = initialX + INDENT_SPACE * j;
      var currentHeightY = -(times[j] * step);
      var currentScoreTextCoordinateY = initialY - (-currentHeightY) - 5;

      // Столбцы
      ctx.fillStyle = (names[j] === 'Вы') ? 'red' : getRgbaRandomTransparencyLevel([0, 0, 255]);
      ctx.fillRect(currentCoordinateX, initialY, HISTOGRAM_WIDTH, currentHeightY);
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
  var fillTextWordWrap = function (ctx, text, x, y, maxWidth) {
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
   */
  var getMaxPlayerScore = function (times) {
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
   */
  var getRgbaRandomTransparencyLevel = function (rgbColor) {
    if (rgbColor.constructor.name === 'Array') {
      rgbColor = rgbColor.join(', ');
    }
    var randomNumber = Math.random();
    randomNumber = randomNumber < 0.1 ? 0.1 : randomNumber.toFixed(1);

    return 'rgba(' + rgbColor + ', ' + randomNumber + ')';
  };

})();
