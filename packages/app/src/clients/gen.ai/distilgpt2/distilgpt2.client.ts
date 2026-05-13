const BASE_URL = 'https://free-distilgpt2.onrender.com/api';

export const generate = ({
  prompt = '',
}: {
  prompt: string;
}): Promise<{ generate: string }> => {
  const url: string = `${BASE_URL}/chat/completions`;
  const body: { prompt: string } = { prompt };
  const headers = { 'Content-Type': 'application/json' };
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  }).then((response) => response.json());
};
