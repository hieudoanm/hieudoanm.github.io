import { GeminiModel } from '@api/ts';
import { OpenRouterModel } from '@hieudoanm.github.io/clients/openrouter/openrouter.enums';
import rateLimitMiddleware from '@hieudoanm.github.io/middlewares/rate-limit';
import { generate } from '@hieudoanm.github.io/services/openrouter/openrouter.service';
import { tryCatch } from '@lodashx/ts';
import { NextApiRequest, NextApiResponse } from 'next';

const validateModel = (model: GeminiModel | OpenRouterModel): boolean => {
  return (
    Object.values(GeminiModel).includes(model as GeminiModel) ||
    Object.values(OpenRouterModel).includes(model as OpenRouterModel)
  );
};

/**
 * @swagger
 * /api/genai:
 *   post:
 *     description: Generate content using a specified model.
 *     tags: [GenAI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       enum:
 *                         - ai
 *                         - user
 *                       default: user
 *                     text:
 *                       type: string
 *                       description: The input text to generate content from.
 *                       example: 'Explain GenAI in a few words.'
 *               model:
 *                 type: string
 *                 description: The model to use for content generation.
 *                 enum:
 *                   - gemini-2.5-flash
 *                   - gemini-2.0-flash
 *                   - gemini-2.0-flash-lite
 *                   - gemini-1.5-flash
 *                   - gemini-1.5-flash-8b
 *                   - deepseek/deepseek-r1:free
 *                   - deepseek/deepseek-v3:free
 *                   - google/gemma-3-27b-it:free
 *                   - google/gemma-3-12b-it:free
 *                   - google/gemma-3-4b-it:free
 *                   - google/gemma-3n-e4b-it:free
 *                   - google/gemma-2-9b-it:free
 *                   - meta-llama/llama-4-maverick:free
 *                   - meta-llama/llama-4-scout:free
 *                   - meta-llama/llama-3.3-70b-instruct:free
 *                   - meta-llama/llama-3.2-11b-vision-instruct:free
 *                   - meta-llama/llama-3.3-8b-instruct:free
 *                   - meta-llama/llama-3.3-1b-instruct:free
 *                   - microsoft/mai-ds-r1:free
 *                   - moonshotai/kimi-vl-a3b-thinking:free
 *                   - moonshotai/kimi-dev-72b:free
 *                   - nvidia/llama-3.3-nemotron-super-49b-v1:free
 *                   - nvidia/llama-3.1-nemotron-ultra-253b-v1:free
 *                 example: 'deepseek/deepseek-r1:free'
 *     responses:
 *       200:
 *         description: hello world
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 output:
 *                   type: string
 *                   description: The generated content.
 *                   example: 'GenAI, short for Generative AI, produces new content (text, images, code) by learning and replicating patterns from existing data.'
 */
const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<{ output: string }>
) => {
  const { method } = request;
  if (method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).end(`Method ${method} Not Allowed`);
  }

  const { messages = [], model = '' } = request.body;
  console.info(`model=${model}`);
  console.info(`message=${messages.at(0).text ?? 'empty'}`);

  if (!validateModel(model)) {
    return response.status(400).json({ output: 'Invalid model specified.' });
  }
  const { data, error } = await tryCatch(generate({ messages, model }));
  if (error) {
    console.error(`Error generating content error=${error}`);
    return response
      .status(500)
      .json({ output: 'An error occurred while generating content.' });
  }
  if (!data) {
    return response.status(200).json({ output: 'No response generated.' });
  }
  const output: string = data.output ?? 'No response generated.';
  return response.status(200).json({ output });
};

export default rateLimitMiddleware(handler);
