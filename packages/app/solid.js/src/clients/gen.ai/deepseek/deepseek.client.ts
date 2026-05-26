const BASE_URL = 'https://api.deepseek.com';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY ?? '';

enum Model {
  DEEPSEEK_CHAT = 'deepseek-chat', // DeepSeek-V3
  DEEPSEEK_REASONER = 'deepseek-reasoner', // DeepSeek-R1
}

export const getChatCompletions = ({
  model = Model.DEEPSEEK_CHAT,
  content = '',
}: {
  model: Model;
  content: string;
}) => {
  const url = `${BASE_URL}/chat/completions`;
  const body = {
    model,
    messages: [{ role: 'user', content }],
    stream: false,
  };
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};
