import { tryCatch } from '@hieudoanm.github.io/utils/try-catch';

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const BASE_URL =
  NODE_ENV === 'development'
    ? 'http://localhost:10000'
    : 'https://youtube-transcript-summariser.onrender.com';

export const summariseTranscript = async ({
  videoId,
}: {
  videoId: string;
}): Promise<{ summary: string }> => {
  const url = `${BASE_URL}/api/transcript/summarise`;
  const headers = { 'Content-Type': 'application/json' };
  const requestBody = { video_id: videoId };
  const { data: response, error } = await tryCatch(
    fetch(url, { method: 'POST', headers, body: JSON.stringify(requestBody) })
  );
  if (error) {
    return { summary: error.message };
  }
  if (!response) {
    return { summary: 'No Summary' };
  }
  const { data, error: jsonError } = await tryCatch<{ summary: string }>(
    response.json()
  );
  if (jsonError) {
    return { summary: jsonError.message };
  }
  if (!data) {
    return { summary: 'No Summary' };
  }
  return data;
};
