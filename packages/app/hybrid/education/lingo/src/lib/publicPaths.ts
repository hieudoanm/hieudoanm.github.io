/**
 * Public asset base path. Empty in dev/Tauri builds, `/downloads/lingo` in
 * the GitHub Pages web deployment (see scripts/post-build.sh).
 */
export const PUBLIC_BASE: string = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const WORDS_URL = `${PUBLIC_BASE}/data/words.json`;
export const MODEL_URI = `${PUBLIC_BASE}/models/sign-model.onnx`;
