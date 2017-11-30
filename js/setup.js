'use strict';

// Коды клавиш с клавиатуры
var KEYBOARD_ESC_KEYCODE = 27;
var KEYBOARD_ENTER_KEYCODE = 13;

// Сколько магов генерируем
var SIMILAR_WIZARDS_AMOUNT = 4;

// Тестовые данные
var LIST_NAMES = [
  'Иван',
  'Хуян Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var LIST_LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var LIST_COATS_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var LIST_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var LIST_FIREBALLS_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
];

/**
 * Получить случайный элемент массива
 *
 * @param {Array} arr
 * @return {string}
 */
function getRandomArrayElement(arr) {
    return arr[getRandomArrayIndex(arr)];
}

/**
 * Получить случайный индекс
 *
 * @param {Array} arr
 * @return {number}
 */
function getRandomArrayIndex(arr) {
    return Math.floor(Math.random() * arr.length);
}

/**
 * Сгенерировать массив магов со случайными: name, coatColor, eyesColor.
 *
 * Пример:
 * [
 *  {name: "Иван Мирабелла", coatColor: "rgb(101, 137, 164)", eyesColor: "red"},
 *  {name: "Люпита Ирвинг", coatColor: "rgb(146, 100, 161)", eyesColor: "blue"}
 * ]
 *
 * @param {number} amount
 * @return {Array}
 */
function getRandomSimilarWizardsData(amount) {
  var wizards = [];

  var randomNames = getRandomUniqueValues(amount, LIST_NAMES, LIST_LAST_NAMES);
  var randomCoatsColors = getRandomUniqueValues(amount, LIST_COATS_COLORS);
  var randomEyesColors = getRandomUniqueValues(amount, LIST_EYES_COLORS);

  for (var i = 0; i < amount; i++) {
    wizards.push({
      name: randomNames[i],
      coatColor: randomCoatsColors[i],
      eyesColor: randomEyesColors[i]
    });
  }
  return wizards;
}

/**
 * Перемешать массив.
 *
 * @param {Array} arr
 * @return {Array}
 */
function shuffleArray(arr) {
  return arr.sort(function () {
    return 0.5 - Math.random();
  });
}

/**
 * Получить случайные элементы массива(ов)
 *
 * @param {number} amountOfValues Кол-во элементов, которое нужно получить
 * @param {Array} arr1 Массив 1
 * @param {Array} arr2 Массив 2 (опционально)
 * @return {Array}
 */
function getRandomUniqueValues(amountOfValues, arr1, arr2) {
  if (!arr1) {
    return [];
  }
  var copiedArr1 = shuffleArray(arr1.slice());
  var copiedArr2 = arr2 ? shuffleArray(arr2.slice()) : [];

  var results = [];
  while (amountOfValues > results.length) {
    if (!copiedArr1.length || arr2 && (!copiedArr1.length || !copiedArr2.length)) {
      break;
    }
    var valueToPush = arr2
      ? getRandomlyFlippedValues(copiedArr1, copiedArr2)
      : copiedArr1.pop();
    results.push(valueToPush);
  }

  return results;
}

/**
 * В случайном порядке создавать значения из ключей arr1 + arr2 или arr2 + arr1.
 *
 * @param {Array} copiedArr1
 * @param {Array} copiedArr2
 * @return {string}
 */
function getRandomlyFlippedValues(copiedArr1, copiedArr2) {
  if (getRandomBooleanValue()) {
    return copiedArr1.pop() + ' ' + copiedArr2.pop();
  }
  return copiedArr2.pop() + ' ' + copiedArr1.pop();
}

/**
 * Получить случайным образом true или false.
 *
 * @return {boolean}
 */
function getRandomBooleanValue() {
  return Math.random() >= 0.5;
}

/**
 * Сгенерировать магов (DOM для каждого мага на основе template'a).
 *
 * @param {Array} data
 * @return {Array}
 */
function getGeneratedSimilarWizards(data) {
  var elements = [];
  var wizardTemplate = document.getElementById('similar-wizard-template').content.querySelector('.setup-similar-item');
  for (var i = 0; i < data.length; i++) {
    var wizard = wizardTemplate.cloneNode(true);
    var wizardName = wizard.querySelector('.setup-similar-label');
    var wizardCoat = wizard.querySelector('.wizard-coat');
    var eyesColor = wizard.querySelector('.wizard-eyes');

    wizardName.textContent = data[i]['name'];
    wizardCoat.style.fill = data[i]['coatColor'];
    eyesColor.style.fill = data[i]['eyesColor'];

    elements.push(wizard);
  }

  return elements;
}
/**
 * Отрендерить магов на экране (включить магов в DOM).
 *
 * @param {Array} wizards
 */
function renderSimilarWizards(wizards) {
  var wizardsList = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(wizards[i]);
  }
  wizardsList.appendChild(fragment);
}

/**
 * Toggle для DOM'a.
 *
 * @param {string} selector
 * @param {string} className
 */
function toggleBlock(selector, className) {
  document.querySelector(selector).classList.toggle(className);
}

/**
 * Открыть/закрыть блок с похожими магами.
 */
function toggleSimilarWizardsScreen() {
  toggleBlock('.setup-similar', 'hidden');
}

/**
 * Инициализация интерфейса конфигурации игрока.
 */
function initInterface() {
    var setupScreen = document.querySelector('.setup');
    if (!setupScreen) {
        console.log('[Error] Configuration screen is not found!');
        return;
    }

    /**
     * @todo: постарался разбить тут логически функционал.
     * Как лучше сделать можно и как вообще лучше разбивать большую логику в подобных случаях?
     */

    // Event handler'ы для окна конфигурации
    initScreenHandlers(setupScreen);
    // Валидация input'ов из окна конфигурации
    initScreenValidators(setupScreen);
    // Смена цвета у частей character'a
    initScreenColorChangeHandlers(setupScreen);
}

/**
 * Модальное окно конфигуарции игрока и его обработчики (закрытие/открытие по клику и с клавиатуры).
 *
 * @param {Element} setupScreen
 */
function initScreenHandlers(setupScreen) {
    var setupOpen = document.querySelector('.setup-open');
    if (!setupOpen) {
        console.log('[Error] open button is not found!');
        return;
    }

    var setupClose = setupScreen.querySelector('.setup-close');
    if (!setupClose) {
        console.log('[Error] Close button on the configuration screen is not found!');
        return;
    }

    // @todo: это ок, что вот эти парни тут тусуются? :)

    function openPopUp() {
        setupScreen.classList.remove('hidden');
        document.addEventListener('keydown', onPopUpEscPress);
    }

    function closePopUp() {
        setupScreen.classList.add('hidden');
        document.removeEventListener('keydown', onPopUpEscPress);
    }

    function onPopUpEscPress(e) {
        if (e.keyCode == KEYBOARD_ESC_KEYCODE) {
            closePopUp();
        }
    }

    setupOpen.addEventListener('click', function(e) {
        openPopUp()
    });

    setupOpen.addEventListener('keydown', function(e) {
        if (e.keyCode == KEYBOARD_ENTER_KEYCODE) {
            openPopUp();
        }
    });

    setupClose.addEventListener('click', function(e) {
        closePopUp();
    });

    setupClose.addEventListener('keydown', function(e) {
        if (e.keyCode == KEYBOARD_ENTER_KEYCODE) {
            closePopUp();
        }
    });
}

/**
 * Модальное окно конфигуарции игрока и его валидаторы (сейчас только имя валидирует).
 *
 * @param {Element} setupScreen
 */
function initScreenValidators(setupScreen) {
    var userName = setupScreen.querySelector('.setup-user-name');

    if (!userName) {
      console.log('[Error] No user name input field found!');
      return;
    }

    // Проверка через стандартные HTML5 minlength + maxlength (+ element.validity на стороне JS)
    userName.addEventListener('invalid',  function (e) {
        // @todo: Сюда тоже почему-то не приходит ничего, будто этот event не диспатчится совсем. Почему?

        // Обработать через element.validity...
    });

    // Обычная проверка JS (почему, кстати тут событие - input, а не change ?)
    userName.addEventListener('input', function(e) {
        var target = e.target;

      /* @todo: В Chrome не работает - внешне никаких изменений не видно :( */
        if (target.value.length < 2) {
            e.target.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
        } else if (target.value.length > 25) {
            e.target.setCustomValidity('Максимальная длина имени персонажа — 25 символов');
        } else {
            e.target.setCustomValidity('');
        }
    });
}

/**
 * Модальное окно конфигуарции игрока (смена частей тела).
 *
 * @param {Element} setupScreen
 */
function initScreenColorChangeHandlers(setupScreen) {
    var wizardCoat = setupScreen.querySelector('.setup-wizard .wizard-coat');
    var wizardEyes = setupScreen.querySelector('.setup-wizard .wizard-eyes');
    var wizardFireball = setupScreen.querySelector('.setup-fireball-wrap');

    console.log('wizardFireball', wizardFireball);

    if (!wizardCoat || !wizardEyes || !wizardFireball) {
        console.log('[Error] One or more of the character\'s body parts cannot be found!');
        return;
    }

    wizardCoat.addEventListener('click', setRandomColor(LIST_COATS_COLORS));
    wizardEyes.addEventListener('click', setRandomColor(LIST_EYES_COLORS));
    wizardFireball.addEventListener('click', function(e) {
        // Фикс для выбора именно .setup-fireball-wrap класса, потому что пользователь обычно кликает на .setup-fireball
        var target = e.target;
        if (e.target.classList.contains('setup-fireball')) {
            target = e.target.parentNode;
        }
        setRandomColor(LIST_FIREBALLS_COLORS, true)(target);
    });
}

// @todo: имеет ли смысл эти 3 функции снизу убрать внуть initScreenColorChangeHandlers() ?

/**
 * Установить элементу рандомный цвет из переданного списка цветов.
 *
 * @param {Array} colorsList
 * @param {boolean} isSvgElement
 * @return {Function}
 */
function setRandomColor(colorsList, isSvgElement) {
    isSvgElement = (typeof isSvgElement === 'undefined');

    return function(e) {
        // Если у текущего элеиента нет таргета, то берем его самого за таргет
        var element = e.target || e;
        if (isSvgElement) {
            changeSvgFillColor(element, getRandomArrayElement(colorsList));
        } else {
            changeBackgroundColor(element, getRandomArrayElement(colorsList));
        }
    }
}

/**
 * Изменить background у элемента.
 *
 * @param {Element} element
 * @param {string }color
 */
function changeBackgroundColor(element, color) {
    element.style.backgroundColor = color;
}

/**
 * Изменить цвет SVG элемента.
 *
 * @param svgElement
 * @param color
 */
function changeSvgFillColor(svgElement, color) {
    svgElement.style.fill = color;
}

var similarWizards = getGeneratedSimilarWizards(getRandomSimilarWizardsData(SIMILAR_WIZARDS_AMOUNT));
renderSimilarWizards(similarWizards);
toggleSimilarWizardsScreen();
initInterface();
