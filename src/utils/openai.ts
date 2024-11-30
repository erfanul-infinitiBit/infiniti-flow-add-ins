import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getCompletion = async (prompt: string, context: string) => {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant analyzing the following document: ${context}. 
                   Answer questions based on the document content. If the answer cannot be found 
                   in the document, say so clearly.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return completion.data.choices[0]?.message?.content || 'No response generated';
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to get completion from OpenAI');
  }
};
