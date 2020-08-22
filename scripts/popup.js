(function () {

  let allConversions = null; // history of conversions
  let showHistory = false;
  const historyConversionsEL = document.querySelector('.history-conversions');
  const conversionContainerEL = document.querySelector('.conversion-container');
  const btnShowHistory = document.getElementById('btn-show-history');
  const outputQuery = document.querySelector('.output');
  const spinnerEL = document.querySelector('.spinner');

  chrome.storage.local.get(['historyConversions'], function (result) {
    if (result && result.historyConversions) {
      createListHistoryConversions(result.historyConversions);
    }
  });

  async function currencyConverter (from = 'USD', to = 'EUR', amount = 1) {
    // https://api.exchangeratesapi.io/latest?base=USD
    try {
      const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
      let resp = await fetch(url);
      resp = await resp.json();
      return resp;
    } catch (error) { }
  }

  // when user click button convert
  async function onConvert (e) {
    e.preventDefault();
    spinnerEL.style.display = 'flex';
    const amount = +e.target.elements[2].value;
    const fromCurrency = e.target.elements[0].value;
    const toCurrency = e.target.elements[1].value;

    setTimeout(() => {
      currencyConverter(fromCurrency, toCurrency, amount)
        .then(resp => {
          setConversionResult(resp);
          chrome.runtime.sendMessage(null, { saveConversion: resp });
          spinnerEL.style.display = 'none';
        });
    }, 500);
  }

  function onShowHistory () {
    spinnerEL.style.display = 'flex';
    setTimeout(() => {
      showHistory = !showHistory;
      historyConversionsEL.style.display = showHistory ? 'block' : 'none';
      conversionContainerEL.style.display = showHistory ? 'none' : 'block';
      btnShowHistory.innerHTML = showHistory
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 2.83209C17.7751 2.2969 16.4222 2 15 2C9.47715 2 5 6.47715 5 12C5 17.5228 9.47715 22 15 22C16.4222 22 17.7751 21.7031 19 21.1679M2 10H15M2 14H15" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 22V4C5 2.89543 5.89543 2 7 2H17C18.1046 2 19 2.89543 19 4V22L12 15.8889L5 22Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
      spinnerEL.style.display = 'none';
    }, 500);
  }

  function onReverseCurrency () {
    const fromInputContainer = document.getElementById('ifrom-currency');
    const toInputContainer = document.getElementById('ito-currency');

    let tmp = fromInputContainer.children[0].src;
    fromInputContainer.children[0].src = toInputContainer.children[0].src;
    toInputContainer.children[0].src = tmp;

    tmp = fromInputContainer.children[1].value
    fromInputContainer.children[1].value = toInputContainer.children[1].value;
    toInputContainer.children[1].value = tmp;
  }

  function setConversionResult (resp) {
    outputQuery.children[0].textContent = new Date(resp.date).toDateString();
    outputQuery.children[1].textContent = resp.query.amount + ' ' + resp.query.from;
    outputQuery.children[3].textContent = resp.result + ' ' + resp.query.to;
  }

  function createListHistoryConversions (historyConversions) {
    allConversions = historyConversions.slice(0);
    setConversionResult(historyConversions[historyConversions.length - 1]);

    historyConversions.reverse().forEach(conv => {
      let fromIcon = currencies.find(d => d.value === conv.query.from).icon;
      let toIcon = currencies.find(d => d.value === conv.query.to).icon;

      const liH = document.createElement('li');

      liH.innerHTML = `<div class="d-flex">
        <img src="${iconsDir + fromIcon}" alt="" width="24" class="mr-10" /> ${conv.query.amount} ${conv.query.from} = ${conv.result} ${conv.query.to}
        <img src="${iconsDir + toIcon}" alt="" width="24" class="ml-10" />
        </div>
        <span class="badge">${new Date(conv.date).toDateString()}</span>`;
      historyConversionsEL.appendChild(liH);
    });
  }

  btnShowHistory.addEventListener('click', onShowHistory, false);
  document.getElementById('btn-reverse').addEventListener('click', onReverseCurrency, false);
  document.getElementById('form-convert').addEventListener('submit', onConvert, false);
})();
