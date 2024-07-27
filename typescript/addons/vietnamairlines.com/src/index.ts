const updatePrices = () => {
  console.log('observeDOM updatePrices');
  const prices = document.querySelectorAll(
    '.prices-wrapper .price .amount .number'
  );
  const delimiterHTML = `<span class="delimiter"></span>`;
  for (let i = 0; i < prices.length; i++) {
    const priceHTML = prices[i].innerHTML;
    const delimiterRegex = new RegExp(delimiterHTML, 'g');
    const priceString = priceHTML.replace(delimiterRegex, '').replace(/,/g, '');
    const priceNumber = parseInt(priceString, 10);
    console.log('priceNumber', priceNumber);
    if (priceNumber >= 5000000) {
      continue;
    }
    if (priceNumber < 2000000) {
      continue;
    }
    if (priceNumber >= 2000000 && priceNumber < 2500000) {
      console.log('priceNumber', priceNumber, 2000000);
      const innerHTML = `<span title="${priceNumber}">2,000,000</span>${delimiterHTML}`;
      prices[i].innerHTML = innerHTML;
      continue;
    }
    if (priceNumber >= 2500000 && priceNumber < 5000000) {
      console.log('priceNumber', priceNumber, 2500000);
      const innerHTML = `<span title="${priceNumber}">2,500,000</span>${delimiterHTML}`;
      prices[i].innerHTML = innerHTML;
      continue;
    }
  }
};

const observeDOM = (() => {
  const MutationObserver =
    window.MutationObserver || (window as any).WebKitMutationObserver;

  return (obj: any, callback: any) => {
    // define new observer
    const obs = new MutationObserver((mutations) => {
      if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
        callback();
      }
    });
    // let the observer observe DOM obj for changes in children
    obs.observe(obj, { childList: true, subtree: true });
  };
})();

// Observe DOM for change to update replacement
observeDOM(document, updatePrices);
