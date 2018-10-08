$(async function() {
  console.log('hello world from sample.js');
  const $myInput = $('#myInput');
  const $form = $('#myForm');
  const $inputDisplay = $('#inputDisplay');
  const $cityList = $('#cityList');
  const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  const data = await fetchData(endpoint);
  let cities = convertCityArrayToObject(data);

  function convertCityArrayToObject(cityArr) {
    let obj = {};
    for (let cityObj of cityArr) {
      obj[cityObj.city] = { ...cityObj };
    }
    return obj;
  }

  $myInput.on('keyup', async e => {
    clearInputDisplay();
    handleInput(e);
  });

  $form.on('submit', async e => {
    e.preventDefault();
    const inputStr = $(e.target)
      .find('input')
      .val();
    if (isNaN(inputStr) && cities[inputStr]) {
      const cityLi = $('<li>').text(inputStr);
      $cityList.prepend(cityLi);
    } else if (!isNaN(inputStr) && data[+inputStr - 1]) {
      const cityLi = $('<li>').text(data[+inputStr - 1].city);
      $cityList.prepend(cityLi);
    }
  });

  function handleInput(e) {
    const inputStr = $(e.currentTarget).val();
    if (isNaN(inputStr)) {
      handleStringInput(inputStr);
    } else {
      handleNumericInput(inputStr);
    }
  }

  function handleStringInput(inputStr) {
    if (cities[inputStr]) {
      displayCityData(inputStr);
    } else {
      $inputDisplay.text(`${inputStr} not found.`);
    }
  }

  function handleNumericInput(inputStr) {
    const inputNum = +inputStr - 1;
    let city;
    if (data[inputNum]) {
      displayCityData(data[inputNum].city);
    } else {
      $inputDisplay.text('No city found');
    }
  }

  function displayCityData(inputStr) {
    let { city, growth, latitude, longitude, population, rank, state } = cities[
      inputStr
    ];
    let $cityP = $('<p>').text(`City: ${city}`);
    let $rankP = $('<p>').text(`Rank: ${rank}`);
    let $stateP = $('<p>').text(`State: ${state}`);
    let $popP = $('<p>').text(`Population: ${population}`);
    let $latP = $('<p>').text(`Latitude: ${latitude}`);
    let $longP = $('<p>').text(`Longitude: ${longitude}`);
    let $growthP = $('<p>').text(`Growth: ${growth}`);
    let $detailsUl = $('<div>').append($cityP, [
      $rankP,
      $stateP,
      $popP,
      $latP,
      $longP,
      $growthP
    ]);
    $inputDisplay.append($detailsUl);
  }

  function clearInputDisplay() {
    $inputDisplay.empty();
  }

  async function fetchData(url) {
    try {
      const res = await fetch(url);
      const rawData = await res.json();
      return rawData;
    } catch (error) {
      return console.log(error);
    }
  }
});
