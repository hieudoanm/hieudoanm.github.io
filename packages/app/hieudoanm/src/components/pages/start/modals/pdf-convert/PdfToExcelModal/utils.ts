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
      const rest = new TextDecoder().decode(
        raw.slice(i, Math.min(i + 3, raw.length))
      );
      if (rest.startsWith('Tj') || rest.startsWith('\\)Tj')) text += str + ' ';
    } else {
      i++;
    }
  }
  return text.trim() || 'Text extraction failed. Try a different PDF.';
};
