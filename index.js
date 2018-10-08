$(async function() {
  console.log('hello world from sample.js');
  const $myInput = $('#myInput');
  const $form = $('#myForm');
  const $inputDisplay = $('#inputDisplay');
  const $cityList = $('#cityList');
  const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  const data = await fetchData(endpoint);
  let $submissionStatus = $('#submissionStatus');

  $myInput.on('keyup', async e => {
    const inputStr = $(e.currentTarget).val();
    const inputNum = +inputStr - 1;
    let city;
    if (data[inputNum]) {
      city = data[inputNum].city;
    } else {
      city = 'No city found';
    }
    $inputDisplay.text(city);
  });

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
