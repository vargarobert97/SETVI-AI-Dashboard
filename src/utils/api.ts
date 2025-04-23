import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateDraft = async (prompt: string): Promise<string> => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Generate a comprehensive, well-structured report about "${prompt}". 
                    Include relevant sections, data points, and analysis where appropriate.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    if (!response.choices[0]?.message.content) {
      throw new Error("No response from AI");
    }

    return response.choices[0]?.message.content.trim();
  } catch (error) {
    console.error("Failed to generate draft:", error);
    throw new Error("Failed to generate draft. Please try again.");
  }
};

export const summarizeContent = async (content: string): Promise<string> => {
  try {
    if (!content.trim()) {
      throw new Error("Content is empty");
    }

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Please summarize the following content concisely while preserving key information:\n\n${content}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 200,
    });

    if (!response.choices[0]?.message.content) {
      throw new Error("No response from AI");
    }

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Failed to summarize content:", error);
    throw new Error("Failed to summarize content. Please try again.");
  }
};
