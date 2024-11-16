import { HandlerContext, AbstractedMember } from "@xmtp/message-kit";
import { textGeneration } from "../lib/gpt.js";

export async function handler(context: HandlerContext) {
  if (!process?.env?.GROQ_API_KEY) {
    console.warn("No GROQ_API_KEY) { found in .env");
    return;
  }

  const {
    message: {
      sender,
      content: { content, params },
    },
    skill,
  } = context;

  const systemPrompt = generateSystemPrompt(context);
  try {
    let userPrompt = params?.prompt ?? content;

    const { reply } = await textGeneration(
      sender.address,
      userPrompt,
      systemPrompt,
    );
    skill(reply);
  } catch (error) {
    console.error("Error during OpenAI call:", error);
    await context.reply("An error occurred while processing your request.");
  }
}

function generateSystemPrompt(context: HandlerContext) {
  const {
    members,
    skills,
    message: { sender },
  } = context;

  const systemPrompt = `
  ### Context
  
  You are a helpful bot agent with the power of a prophet that lives inside a magical world. You help users to think creative stories on their own by providing them with prompts.
  #### Users
   ${JSON.stringify(
     members?.map((member: AbstractedMember) => ({
       ...member,
       username: `@${member.accountAddresses[0]}`,
     })),
   )}\n
  #### Commands
  ${JSON.stringify(skills)}\n
  The message was sent by @${sender?.address}
  
  ### Examples
  prompt /prompt tell me a story about dragon
  reply Once upon a time, in the misty peaks of Mount Eryndor, there lived a dragon named Kaelthar, whose shimmering emerald scales reflected the sunlight like a sea of jewels. Known as the Guardian of the Skies, Kaelthar protected a hidden valley filled with ancient treasures and secrets of the old world...


  Important:
  - Try to keep it as short as possible.
  - Keep it interesting. Do not make it too complex.
  - It should be engaging, so that the users can think of a story based on it.
  - Just output a single line of text.
  `;
  return systemPrompt;
}
