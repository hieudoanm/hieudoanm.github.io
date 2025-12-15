const BASE_URL = 'https://api.openai.com/v1';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? '';

enum Model {
  GPT_4 = 'gpt-4',
  GPT_4_TURBO = 'gpt-4-turbo',
  GPT_3_5 = 'gpt-3.5-turbo',
}

export const getChatCompletions = ({
  model = Model.GPT_4,
  content = '',
}: {
  model: Model;
  content: string;
}) => {
  const url = `${BASE_URL}/chat/completions`;
  const body = {
    model,
    messages: [{ role: 'user', content }],
  };
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};
