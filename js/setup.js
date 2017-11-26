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
  var copiedArr1 = shuffleArray(arr1.slice());
  var copiedArr2 = arr2 ? shuffleArray(arr2.slice()) : [];

  var results = [];
  while (amountOfValues > results.length) {
    if (!arr1.length || (arr1 && arr2) && (!arr1.length || !arr2.length)) {
      break;
    }
    var valueToPush = (arr1 && arr2)
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
 * @param {?} selector
 * @param {string} className
 */
function toggleBlock(selector, className) {
  document.querySelector(selector).classList.toggle(className);
}

/**
 * Показать экран с похожими магами.
 */
function toggleSetupWizardScreen() {
  toggleBlock('.overlay.setup', 'hidden');
}

/**
 * Показать экран с похожими магами.
 */
function toggleSimilarWizardsScreen() {
  toggleBlock('.setup-similar', 'hidden');
}

toggleSetupWizardScreen();
var similarWizards = getGeneratedSimilarWizards(getRandomSimilarWizardsData(SIMILAR_WIZARDS_AMOUNT));
renderSimilarWizards(similarWizards);
toggleSimilarWizardsScreen();
