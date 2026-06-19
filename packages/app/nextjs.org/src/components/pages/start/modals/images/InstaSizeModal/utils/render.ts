export function renderToCanvas(
  canvas: HTMLCanvasElement,
  imgSrc: string,
  pad: number,
  filterCss: string,
  cb: (url: string) => void
) {
  const img = new Image();
  img.onload = () => {
    const { naturalWidth: w, naturalHeight: h } = img;
    const maxDim = Math.max(w, h);
    const paddingPx = Math.round((pad / 100) * maxDim);
    const size = maxDim + paddingPx * 2;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    if (filterCss) {
      const tmp = document.createElement('canvas');
      tmp.width = w;
      tmp.height = h;
      const tCtx = tmp.getContext('2d')!;
      tCtx.filter = filterCss;
      tCtx.drawImage(img, 0, 0, w, h);
      ctx.drawImage(
        tmp,
        Math.round((size - w) / 2),
        Math.round((size - h) / 2),
        w,
        h
      );
    } else
      ctx.drawImage(
        img,
        Math.round((size - w) / 2),
        Math.round((size - h) / 2),
        w,
        h
      );
    cb(canvas.toDataURL('image/png'));
  };
  img.src = imgSrc;
}
