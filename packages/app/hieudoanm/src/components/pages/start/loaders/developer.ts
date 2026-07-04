import { ComponentType } from 'react';

const loadFiglet = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/developer/FigletModal').then(
    (m) => ({ default: m.FigletModal })
  );

const loadIP = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/developer/IPModal').then(
    (m) => ({ default: m.IPModal })
  );

const loadOpenAPI2Postman = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/developer/OpenAPI2Postman').then(
    (m) => ({ default: m.OpenAPI2Postman })
  );

const loadProxy = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/developer/ProxyModal').then(
    (m) => ({ default: m.ProxyModal })
  );

const loadSheets = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/developer/SheetsModal').then(
    (m) => ({ default: m.SheetsModal })
  );

const loadShopifyDetect = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/developer/ShopifyDetectModal').then(
    (m) => ({ default: m.ShopifyDetectModal })
  );

const loadSVG = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/developer/SVGModal').then(
    (m) => ({ default: m.SVGModal })
  );

const loadTextDiff = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/developer/TextDiffModal').then(
    (m) => ({ default: m.TextDiffModal })
  );

const loadTextUrlTracer = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/developer/TextUrlTracerModal').then(
    (m) => ({ default: m.TextUrlTracerModal })
  );

const loadUUID = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/developer/UUIDModal').then(
    (m) => ({ default: m.UUIDModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  figlet: loadFiglet,
  ip: loadIP,
  openapi: loadOpenAPI2Postman,
  proxy: loadProxy,
  sheets: loadSheets,
  'shopify-detect': loadShopifyDetect,
  svg: loadSVG,
  'text-diff': loadTextDiff,
  'text-url-tracer': loadTextUrlTracer,
  uuid: loadUUID,
};
