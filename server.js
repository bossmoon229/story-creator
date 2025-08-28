import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateStory() {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini", 
      input: "Create one short story about anything",
    });

    console.log(response.output[0].content[0].text);
  } catch (error) {
    console.error("Error:", error);
  }
}

generateStory();
