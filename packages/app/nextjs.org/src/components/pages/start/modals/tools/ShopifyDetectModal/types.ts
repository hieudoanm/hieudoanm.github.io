export type DetectionResult = {
  url: string;
  isShopify: boolean;
  isPlus: boolean;
  confidence: number;
  signals: string[];
  checkedAt: number;
};

export type Tab = 'check' | 'history';
