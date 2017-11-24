'use strict';

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

/**
 * Сгенерировать массив магов со случайными: name, coatColor, eyesColor.
 *
 * Пример:
 * [
 *  {name: "Иван Мирабелла", coatColor: "rgb(101, 137, 164)", eyesColor: "red"},
 *  {name: "Люпита Ирвинг", coatColor: "rgb(146, 100, 161)", eyesColor: "blue"}
 * ]
 *
 * @param {int} amount
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
 * Получить случайные элементы массива(ов)
 *
 * @param {int} amountOfValues Кол-во элементов, которое нужно получить
 * @param {array} arr Массив 1
 * @param {array} arr2 Массив 2 (опционально)
 * @return {Array}
 */
function getRandomUniqueValues(amountOfValues, arr, arr2) {
  var usedValues = {};
  var foundValues = [];
  var currentValue = '';
  // Максивальное кол-во попыток найти уникальное значение
  var maxAttempts = 10;
  var attempts = 0;
  while (foundValues.length < amountOfValues) {
    if (attempts >= maxAttempts) {
      break;
    }
    attempts++;
    // Если пришло 2 массива, то генерим уникальное значение, используя оба сразу
    if (arr && arr2) {
      currentValue = getRandomBooleanValue()
        ? getRandomArrayElement(arr) + ' ' + getRandomArrayElement(arr2)
        : getRandomArrayElement(arr2) + ' ' + getRandomArrayElement(arr);
    } else {
    // или только один
      currentValue = getRandomArrayElement(arr);
    }
    if (usedValues[currentValue]) {
      continue;
    }

    foundValues.push(currentValue);
    usedValues[currentValue] = true;
  }

  return foundValues;
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
 * Получить случайный элемент массива.
 *
 * @param {array} arr
 * @return {string}
 */
function getRandomArrayElement(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex] ? arr[randomIndex] : '';
}

/**
 * Сгенерировать магов (DOM для каждого мага на основе template'a).
 *
 * @param {array} data
 * @return {array}
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
 * @param {array} wizards
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
 * Показать экран с похожими магами.
 */
function showSimilarWizardsBlock() {
  document.querySelector('.setup-similar').classList.remove('hidden');
}

var similarWizards = getGeneratedSimilarWizards(getRandomSimilarWizardsData(SIMILAR_WIZARDS_AMOUNT));
renderSimilarWizards(similarWizards);
showSimilarWizardsBlock();
