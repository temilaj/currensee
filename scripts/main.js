
const fromCurrency = document.querySelector('#from-currency');
const toCurrency = document.querySelector('#to-currency');
const BASE_URL = 'https://free.currencyconverterapi.com/api/v5'
let currencies = [];

function buildCurrencyList() {
  const url = `${BASE_URL}/currencies`
  fetch(url)
  .then(response => response.json())
  .then(data => {
    currencies = Object.entries(data.results);
    console.log(currencies);
    let currencyString = '';
    const currencyOptions = currencies.map((currency) => {
      const currencyOption = `<option value="${currency[1].id}">${currency[1].currencySymbol} - (${currency[1].currencyName})</option>`;
      return currencyString.concat(currencyOption);
    });
    fromCurrency.innerHTML = currencyOptions.join('');
    toCurrency.innerHTML = currencyOptions.join('');
  })
  .catch(function(error) {
    console.log(error);
  });
}

function convert(amount, currencyFrom, currencyTo) {

}

