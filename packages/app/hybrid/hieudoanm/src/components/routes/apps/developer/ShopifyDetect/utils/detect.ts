import { DetectionResult } from '../types';

export const detectFromHTML = (url: string, html: string): DetectionResult => {
  const h = html.toLowerCase();
  const signals: string[] = [];
  let score = 0;

  if (h.includes('cdn.shopify.com')) {
    signals.push('cdn.shopify.com found');
    score += 40;
  }
  if (h.includes('shopify-section')) {
    signals.push('shopify-section class found');
    score += 30;
  }
  if (h.includes('shopify')) {
    signals.push('shopify keyword found');
    score += 10;
  }

  let isPlus = false;
  if (h.includes('shopify plus') || h.includes('shopify-plus')) {
    isPlus = true;
    signals.push('Shopify Plus marker found');
    score += 20;
  }

  return {
    url,
    isShopify: score >= 40,
    isPlus,
    confidence: Math.min(score, 100),
    signals,
    checkedAt: Date.now(),
  };
};
