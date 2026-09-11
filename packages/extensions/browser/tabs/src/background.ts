import { AD_NETWORK_DOMAINS, ADS_KEY } from './lib/ads';
import { registerNewTabRedirect } from './lib/newtab';
import { stitchChunks, type SnapshotChunk } from './lib/stitch';
import { createLogger } from './utils/log';
import {
  GET_SHOPIFY_ACTION,
  SHOPIFY_RESULT_ACTION,
  type ShopifyDetectionResult,
} from './lib/shopify';
import {
  CLAUDE_RESULT_ACTION,
  CLAUDE_STORAGE_KEY,
  claudeColor,
  claudePercent,
  type ClaudeLimitData,
} from './lib/claude';

type BadgeAction = {
  setBadgeText: (details: { text: string; tabId?: number }) => void;
  setBadgeBackgroundColor: (details: { color: string; tabId?: number }) => void;
};

const chromeApi = chrome as unknown as Record<string, BadgeAction | undefined>;
const badgeAction = chromeApi.action ?? chromeApi.browserAction;

const log = createLogger('Shopify:');

interface CaptureRequest {
  action: string;
  format: string;
  quality?: number;
}

interface LayoutInfo {
  scrollHeight: number;
  clientHeight: number;
  scrollY: number;
  dpr: number;
}

const SNAP = 'SNAP_';
const SETTLE_EXTRA_MS = 80;
const ADS_RULESET_ID = 'ruleset_block';

const SNAP_ACTIONS = new Set(['captureView', 'captureFullPage']);

const shopifyResults = new Map<number, ShopifyDetectionResult>();

let adsBlockEnabled = true;

void chrome.storage.sync.get(ADS_KEY, (result) => {
  adsBlockEnabled = result[ADS_KEY] !== false;
  applyNetworkBlockState();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && ADS_KEY in changes) {
    adsBlockEnabled = changes[ADS_KEY]?.newValue !== false;
    applyNetworkBlockState();
  }
});

const applyNetworkBlockState = (): void => {
  if (typeof chrome.declarativeNetRequest !== 'undefined') {
    void chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: adsBlockEnabled ? [ADS_RULESET_ID] : [],
      disableRulesetIds: adsBlockEnabled ? [] : [ADS_RULESET_ID],
    });
  }
};

if (typeof chrome.webRequest !== 'undefined') {
  chrome.webRequest.onBeforeRequest.addListener(
    () => (adsBlockEnabled ? { cancel: true } : {}),
    { urls: AD_NETWORK_DOMAINS },
    ['blocking']
  );
}

registerNewTabRedirect();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (SNAP_ACTIONS.has(message?.action)) {
    void handleCapture(message as CaptureRequest)
      .then((dataUrl) => sendResponse({ dataUrl }))
      .catch((err: unknown) =>
        sendResponse({ error: (err as Error).message || 'Capture failed' })
      );
    return true;
  }

  if (message?.action === SHOPIFY_RESULT_ACTION) {
    const tabId = sender.tab?.id;
    const result = (message as { result?: ShopifyDetectionResult }).result;
    if (tabId == null || !result) return;
    if (result.isShopify) {
      shopifyResults.set(tabId, result);
      void chrome.action.setBadgeText({ tabId, text: 'S' });
    } else {
      shopifyResults.delete(tabId);
      void chrome.action.setBadgeText({ tabId, text: '' });
    }
    return;
  }

  if (message?.action === CLAUDE_RESULT_ACTION) {
    const tabId = sender.tab?.id;
    const result = (message as { result?: ClaudeLimitData | null }).result;
    if (tabId == null) return;
    if (result) {
      void chrome.storage.local.set({ [CLAUDE_STORAGE_KEY]: result });
      applyClaudeBadge(tabId, result);
    } else if (badgeAction) {
      badgeAction.setBadgeText({ tabId, text: '' });
    }
    return;
  }

  if (message?.action === GET_SHOPIFY_ACTION) {
    void handleShopifyCheck(message).then((result) => sendResponse(result));
    return true;
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  shopifyResults.delete(tabId);
  void chrome.action.setBadgeText({ tabId, text: '' });
});

const applyClaudeBadge = (tabId: number, data: ClaudeLimitData): void => {
  if (!badgeAction) return;
  const { daily, weekly } = claudePercent(data);
  if (daily === null && weekly === null) {
    badgeAction.setBadgeText({ tabId, text: '' });
    return;
  }
  const pct = Math.max(daily ?? 0, weekly ?? 0);
  badgeAction.setBadgeText({ tabId, text: `${pct}%` });
  badgeAction.setBadgeBackgroundColor({ tabId, color: claudeColor(pct) });
};

const handleCapture = async (request: CaptureRequest): Promise<string> =>
  request.action === 'captureFullPage'
    ? handleCaptureFullPage(request)
    : handleCaptureView(request);

const handleShopifyCheck = async (message: {
  action: string;
  tabId?: number;
}): Promise<ShopifyDetectionResult | { error: string }> => {
  const tabId =
    typeof message.tabId === 'number'
      ? message.tabId
      : await getActiveTabId().catch(() => null);
  if (tabId == null) {
    return { error: 'Snapshot: no active tab' };
  }

  const cached = shopifyResults.get(tabId);
  if (cached) return cached;

  if (typeof chrome.scripting?.executeScript === 'function') {
    try {
      const [injection] = await chrome.scripting.executeScript({
        target: { tabId },
        world: 'MAIN',
        func: detectShopifyInPage,
      });
      const result = injection?.result;
      if (result && typeof result.isShopify === 'boolean') {
        const verdict = result as unknown as ShopifyDetectionResult;
        if (verdict.isShopify) {
          shopifyResults.set(tabId, verdict);
          void chrome.action.setBadgeText({ tabId, text: 'S' });
        } else {
          void chrome.action.setBadgeText({ tabId, text: '' });
        }
        return verdict;
      }
    } catch (err) {
      log.warn('executeScript in page failed:', err);
    }
  }

  return { error: 'Shopify check timed out' };
};

const detectShopifyInPage = (): {
  isShopify: boolean;
  isShopifyPlus: boolean;
  indicators: Record<string, boolean>;
  plusIndicators: Record<string, boolean>;
} => {
  const shopify = (window as { Shopify?: { checkout?: unknown } }).Shopify;
  const scriptSrcs = Array.from(document.scripts).map((script) => script.src);
  const indicators = {
    windowShopify: typeof shopify !== 'undefined',
    shopifyMeta: !!document.querySelector(
      'meta[name="shopify-checkout-api-token"]'
    ),
    shopifyCDN: scriptSrcs.some((src) => src.includes('cdn.shopify.com')),
    cartJS: scriptSrcs.some((src) => src.includes('/cart.js')),
  };
  const plusIndicators = {
    checkoutDomain: location.hostname.includes('checkout.shopify'),
    checkoutObject: typeof shopify?.checkout !== 'undefined',
    digitalWalletMeta: !!document.querySelector(
      'meta[name="shopify-digital-wallet"]'
    ),
  };
  const isShopify = Object.values(indicators).some(Boolean);
  return {
    isShopify,
    isShopifyPlus: isShopify && Object.values(plusIndicators).some(Boolean),
    indicators,
    plusIndicators,
  };
};

const handleCaptureView = async (request: CaptureRequest): Promise<string> => {
  const captureOptions = buildCaptureOptions(request);
  const dataUrl = await captureVisibleTab(captureOptions);
  if (request.format !== 'png' && request.format !== 'jpeg') {
    return reencode(dataUrl, request.format, request.quality ?? 92);
  }
  return dataUrl;
};

const handleCaptureFullPage = async (
  request: CaptureRequest
): Promise<string> => {
  const tabId = await getActiveTabId();
  const layout = await sendToContent<LayoutInfo>(tabId, {
    action: `${SNAP}GET_LAYOUT`,
  });
  if (!layout || layout.scrollHeight <= 0) {
    throw new Error('Snapshot: no page to capture');
  }

  const dpr = layout.dpr || 1;
  const chunkCount = Math.ceil(layout.scrollHeight / layout.clientHeight);
  const chunks: SnapshotChunk[] = [];
  let widthPx = 0;

  for (let i = 0; i < chunkCount; i += 1) {
    const target = Math.min(
      i * layout.clientHeight,
      layout.scrollHeight - layout.clientHeight
    );
    const scroll = await sendToContent<{ scrollY: number }>(tabId, {
      action: `${SNAP}SCROLL_TO`,
      y: target,
    });
    await wait(SETTLE_EXTRA_MS);

    const dataUrl = await captureVisibleTab({ format: 'png' });
    const size = await getBitmapSize(dataUrl);
    widthPx = size.width;

    const y = Math.round((scroll?.scrollY ?? target) * dpr);
    chunks.push({ dataUrl, y });
  }

  await sendToContent(tabId, { action: `${SNAP}SCROLL_TO`, y: 0 });

  const heightPx = Math.round(layout.scrollHeight * dpr);
  const stitched = await stitchChunks(chunks, widthPx, heightPx);

  if (request.format === 'png') {
    return stitched;
  }
  return reencode(stitched, request.format ?? 'jpeg', request.quality ?? 92);
};

const buildCaptureOptions = (
  request: CaptureRequest
): {
  format: 'png' | 'jpeg';
  quality?: number;
} => {
  const format = request.format === 'png' ? 'png' : 'jpeg';
  const options: { format: 'png' | 'jpeg'; quality?: number } = { format };
  if (format === 'jpeg') {
    options.quality = request.quality || 92;
  }
  return options;
};

const captureVisibleTab = (options: {
  format: 'png' | 'jpeg';
  quality?: number;
}): Promise<string> =>
  new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab(
      chrome.windows.WINDOW_ID_CURRENT,
      options,
      (dataUrl) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        resolve(dataUrl);
      }
    );
  });

const getActiveTabId = async (): Promise<number> => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    throw new Error('Snapshot: no active tab');
  }
  return tab.id;
};

const sendToContent = <T>(
  tabId: number,
  message: unknown
): Promise<T | undefined> =>
  new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        resolve(undefined);
        return;
      }
      resolve(response as T);
    });
  });

const getBitmapSize = async (
  dataUrl: string
): Promise<{ width: number; height: number }> => {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  return { width: bitmap.width, height: bitmap.height };
};

const reencode = async (
  dataUrl: string,
  format: string,
  quality: number
): Promise<string> => {
  const { width, height } = await getBitmapSize(dataUrl);
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Snapshot: canvas unavailable');
  }
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  ctx.drawImage(bitmap, 0, 0);
  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/webp';
  const out = await canvas.convertToBlob({
    type: mime,
    quality: quality / 100,
  });
  return blobToDataUrl(out);
};

const blobToDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Snapshot: failed to read blob'));
    reader.readAsDataURL(blob);
  });

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, ms));
