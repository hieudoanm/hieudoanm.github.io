export const opfsAvailable = async (): Promise<boolean> => {
  try {
    await navigator.storage.getDirectory();
    return true;
  } catch {
    return false;
  }
};

export const saveToOPFS = async (
  filename: string,
  data: Uint8Array
): Promise<void> => {
  const root = await navigator.storage.getDirectory();
  const fh = await root.getFileHandle(filename, { create: true });
  const writable = await fh.createWritable();
  await writable.write(data.buffer as ArrayBuffer);
  await writable.close();
};

export const loadFromOPFS = async (
  filename: string
): Promise<Uint8Array | null> => {
  try {
    const root = await navigator.storage.getDirectory();
    const fh = await root.getFileHandle(filename);
    const file = await fh.getFile();
    return new Uint8Array(await file.arrayBuffer());
  } catch {
    return null;
  }
};

export const listOPFSFiles = async (): Promise<string[]> => {
  try {
    const root = await navigator.storage.getDirectory();
    const files: string[] = [];
    for await (const [name] of root.entries()) {
      if (/\.(db|sqlite|sqlite3)$/i.test(name)) files.push(name);
    }
    return files;
  } catch {
    return [];
  }
};
