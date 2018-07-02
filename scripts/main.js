
const fromCurrencyList = document.querySelector('#from-currency');
const toCurrencyList = document.querySelector('#to-currency');
const resultElement = document.querySelector('.card-title');
document.forms.Currensee.addEventListener('submit', convert);

const BASE_URL = 'https://free.currencyconverterapi.com/api/v5';
let currencies = [];

function buildCurrencyList() {
  const url = `${BASE_URL}/currencies`
  fetch(url)
  .then(response => response.json())
  .then(data => {
    currencies = Object.entries(data.results);
    let currencyString = '';
    const currencyOptions = currencies.map((currency) => {
      const currencyOption = `<option value="${currency[1].id}" data-currency-symbol="${currency[1].currencySymbol ? currency[1].currencySymbol : ''}">${currency[1].currencyName} ${currency[1].currencySymbol ? '- ' + currency[1].currencySymbol : ''} </option>`;
      return currencyString.concat(currencyOption);
    });
    fromCurrencyList.innerHTML = currencyOptions.join('');
    toCurrencyList.innerHTML = currencyOptions.join('');
  })
  .catch(function(error) {
    console.error(error);
  });
}

function convert(event) {
  event.preventDefault();
  const amount = document.querySelector('#amount');
  const fromCurrency = fromCurrencyList.options[fromCurrencyList.selectedIndex];
  const fromCurrencyId = fromCurrency.value;
  const fromCurrencySymbol = fromCurrency.dataset.currencySymbol;
  
  const toCurrency = toCurrencyList.options[toCurrencyList.selectedIndex];
  const toCurrencyId = toCurrency.value;
  const toCurrencySymbol = toCurrency.dataset.currencySymbol;
  const forwardConversion = `${fromCurrencyId}_${toCurrencyId}`;
  const reverseConversion = `${toCurrencyId}_${fromCurrencyId}`;
  const url = `${BASE_URL}/convert?q=${forwardConversion},${reverseConversion}&compact=ultra`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    const roundedResult = Math.round((amount.value * data[forwardConversion]) * 100) / 100;
    resultElement.innerHTML = `<small class="text-muted">${fromCurrencySymbol} ${amount.value}</small>  → ${toCurrencySymbol} ${roundedResult}`;
  })
  .catch(function(error) {
    console.log(error);
  });
  

}
