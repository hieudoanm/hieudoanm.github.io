interface ShopifyDetectionResult {
  isShopify: boolean;
  isShopifyPlus: boolean;
  indicators: {
    windowShopify: boolean;
    shopifyMeta: boolean;
    shopifyCDN: boolean;
    cartJS: boolean;
  };
  plusIndicators: {
    checkoutDomain: boolean;
    checkoutObject: boolean;
    digitalWalletMeta: boolean;
  };
}

const shopifyIndicators = {
  windowShopify:
    typeof (window as { Shopify?: unknown }).Shopify !== 'undefined',
  shopifyMeta: !!document.querySelector(
    'meta[name="shopify-checkout-api-token"]'
  ),
  shopifyCDN: Array.from(document.scripts).some((script) =>
    script.src.includes('cdn.shopify.com')
  ),
  cartJS: Array.from(document.scripts).some((script) =>
    script.src.includes('/cart.js')
  ),
};

const isShopify = Object.values(shopifyIndicators).some(Boolean);

const plusIndicators = {
  checkoutDomain: location.hostname.includes('checkout.shopify'),
  checkoutObject: (() => {
    const shopify = (window as { Shopify?: { checkout?: unknown } }).Shopify;
    return typeof shopify?.checkout !== 'undefined';
  })(),
  digitalWalletMeta: !!document.querySelector(
    'meta[name="shopify-digital-wallet"]'
  ),
};

const isShopifyPlus = isShopify && Object.values(plusIndicators).some(Boolean);

const result: ShopifyDetectionResult = {
  isShopify,
  isShopifyPlus,
  indicators: shopifyIndicators,
  plusIndicators,
};

chrome.runtime.onMessage.addListener(
  (message: string, _sender, sendResponse) => {
    if (message === 'CHECK_SHOPIFY') {
      sendResponse(result);
    }
  }
);
