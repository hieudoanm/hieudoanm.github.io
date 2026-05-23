export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const nearestNeighbor = (src: ImageData, dst: ImageData) => {
  const sw = src.width,
    sh = src.height;
  const dw = dst.width,
    dh = dst.height;
  const s = src.data,
    d = dst.data;
  for (let y = 0; y < dh; y++) {
    for (let x = 0; x < dw; x++) {
      const sx = Math.floor((x / dw) * sw);
      const sy = Math.floor((y / dh) * sh);
      const si = (sy * sw + sx) * 4;
      const di = (y * dw + x) * 4;
      d[di] = s[si];
      d[di + 1] = s[si + 1];
      d[di + 2] = s[si + 2];
      d[di + 3] = s[si + 3];
    }
  }
};

export const bilinear = (src: ImageData, dst: ImageData) => {
  const sw = src.width,
    sh = src.height;
  const dw = dst.width,
    dh = dst.height;
  const s = src.data,
    d = dst.data;
  for (let y = 0; y < dh; y++) {
    for (let x = 0; x < dw; x++) {
      const gx = (x / dw) * (sw - 1);
      const gy = (y / dh) * (sh - 1);
      const gxi = Math.floor(gx);
      const gyi = Math.floor(gy);
      const xf = gx - gxi;
      const yf = gy - gyi;
      const di = (y * dw + x) * 4;
      for (let c = 0; c < 4; c++) {
        const a = s[(gyi * sw + gxi) * 4 + c];
        const b = s[(gyi * sw + Math.min(gxi + 1, sw - 1)) * 4 + c];
        const c_ = s[(Math.min(gyi + 1, sh - 1) * sw + gxi) * 4 + c];
        const dd =
          s[
            (Math.min(gyi + 1, sh - 1) * sw + Math.min(gxi + 1, sw - 1)) * 4 + c
          ];
        const top = a + (b - a) * xf;
        const bot = c_ + (dd - c_) * xf;
        d[di + c] = Math.round(top + (bot - top) * yf);
      }
    }
  }
};

export const SCALE_PRESETS = [2, 3, 4];
