$(async function() {
  console.log('hello world from sample.js');
  const $myInput = $('#myInput');
  const $form = $('#myForm');
  const $inputDisplay = $('#inputDisplay');
  const $cityDetails = $('#cityDetails');
  const $cityList = $('#cityList');
  const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  const data = await fetchData(endpoint);
  let $submissionStatus = $('#submissionStatus');
  let cities = convertCityArrayToObject(data);

  function convertCityArrayToObject(cityArr) {
    let obj = {};
    for (let cityObj of cityArr) {
      obj[cityObj.city] = { ...cityObj };
    }
    return obj;
  }

  $myInput.on('keyup', async e => {
    const inputStr = $(e.currentTarget).val();
    if (isNaN(inputStr)) {
      handleStringInput(inputStr);
    } else {
      handleNumericInput(inputStr);
    }
  });

  function handleNumericInput(inputStr) {
    const inputNum = +inputStr - 1;
    let city;
    if (data[inputNum]) {
      city = data[inputNum].city;
    } else {
      city = 'No city found';
    }
    $inputDisplay.text(city);
  }

  function handleStringInput(inputStr) {
    if (cities[inputStr]) {
      let {
        city,
        growth,
        latitude,
        longitude,
        population,
        rank,
        state
      } = cities[inputStr];
      $inputDisplay.text(`${inputStr} found!`);
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
      $cityDetails.append($detailsUl);
    } else {
      $inputDisplay.text(`${inputStr} not found.`);
    }
  }

  $form.on('submit', async e => {
    e.preventDefault();
    const inputStr = $(e.target)
      .find('input')
      .val();
    const inputNum = +inputStr - 1;
    if (data[inputNum]) {
      let city = data[inputNum].city;
      const cityLi = $('<li>').text(city);
      $cityList.prepend(cityLi);
    } else {
      $submissionStatus.text('Not a valid number of city!');
    }
  });

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
