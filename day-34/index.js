import 'dotenv/config'
import readline from 'readline/promises';
import { sendEmail } from "./mail.js";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent } from "langchain";
import { send } from "process";
import * as z from "zod";
import { TavilySearch } from "@langchain/tavily";


const emailTool = tool(
  sendEmail, {
  name: "send_email",
  description: "Use this tool to send an email.",

  schema: z.object({
    to: z.string().describe("The recipient's email address."),
    subject: z.string().describe("The subject of the email."),
    html: z.string().describe("The content of the email."),
    text: z.string().describe("The content of the email in text format.")
  })

}


)

const searchTool = new TavilySearch(
  {
    maxResults: 3,
    apiKey: process.env.TAVILY_API_KEY
  }
)

// console.log(process.env.MISTRAL_API_KEY)

const rl = readline.createInterface({
  input: process.stdin,  // "Listen to my keyboard"
  output: process.stdout // "Talk back to my screen"
});


const messages = []

const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-small-latest",
  temperature: 0
});



const agent = createAgent({
  model,
  tools: [emailTool,searchTool]
})


while (true) {

  const userInput = await rl.question('You:');

  messages.push(new HumanMessage(userInput))

  process.stdout.write('\u001b[1A\u001b[2K');

  const response = await agent.invoke({
    messages: messages
  })

  messages.push(response.messages[response.messages.length - 1])
  console.log(response.messages[response.messages.length - 1].text)

}


