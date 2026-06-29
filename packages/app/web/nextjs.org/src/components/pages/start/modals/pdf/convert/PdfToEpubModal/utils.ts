export const extractPdfText = (buffer: ArrayBuffer): string => {
  const raw = new Uint8Array(buffer);
  let text = '';
  let i = 0;
  while (i < raw.length) {
    if (raw[i] === 0x28) {
      i++;
      let str = '';
      while (i < raw.length && raw[i] !== 0x29) {
        if (raw[i] === 0x5c) {
          i++;
          if (i < raw.length) str += String.fromCharCode(raw[i++]);
        } else str += String.fromCharCode(raw[i++]);
      }
      i++;
      const rest = new TextDecoder().decode(raw.slice(i, i + 3));
      if (rest.startsWith('Tj') || rest.startsWith('\\)Tj')) text += str + ' ';
    } else if (
      raw[i] === 0x54 &&
      raw[i + 1] === 0x4a &&
      (raw[i + 2] === 0x20 || raw[i + 2] === 0x0a)
    ) {
      i += 3;
    } else {
      i++;
    }
  }
  return text.trim() || 'Text extraction failed. Try a different PDF.';
};
