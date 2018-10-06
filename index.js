console.log('hello world from sample.js');
// searchBar = document.querySelector('.gLFyf');
// searchBar.value = 'Hello Sir, what may I search for you today?';
$(async function() {
  let $myInput = $('#myInput');
  let $form = $('#myForm');
  let $inputDisplay = $('#inputDisplay');
  let $cityList = $('#cityList');
  const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

  $myInput.on('keyup', async e => {
    let input = $(e.currentTarget).val();
    $inputDisplay.text(input);
  });

  $form.on('submit', async e => {
    e.preventDefault();
    let input = $(e.target).find('input').val();
    let data = await fetchData(endpoint);
    let city;
    if (data[input]) {
      city = data[input].city;
    } else {
      city = 'No city found';
    }
    let cityLi = $('<li>').text(city);
    $cityList.prepend(cityLi);
  });

  async function fetchData(url) {
    try {
      let res = await fetch(url);
      let rawData = await res.json();
      return rawData;
    } catch (error) {
      return console.log(error);
    }
  }
});
