import { handler as tipping } from "./handler/tipping.js";
import { handler as agent } from "./handler/agent.js";
import { handler as transaction } from "./handler/transaction.js";
import { handler as games } from "./handler/game.js";
import { handler as loyalty } from "./handler/loyalty.js";
import { handler as circle } from "./handler/circle.js";
import { helpHandler } from "./index.js";
import type { SkillGroup } from "@xmtp/message-kit";

export const skills: SkillGroup[] = [
  {
    name: "Tipping",
    description: "Tip tokens via emoji, replies or command.",
    skills: [
      {
        command: "/tip [@usernames] [amount] [token]",
        triggers: ["/tip"],
        examples: ["/tip @vitalik 10 usdc"],
        description: "Tip users in a specified token.",
        handler: tipping,
        params: {
          username: {
            default: "",
            plural: true,
            type: "username",
          },
          amount: {
            default: 10,
            type: "number",
          },
        },
      },
    ],
  },
  {
    name: "Auth",
    description: "Auth using circle sdk",
    skills: [
      {
        command: "/auth [type] [email] [password]",
        triggers: ["/auth"],
        examples: ["/auth login hello@123.com 1234@1234"],
        description: "Auth using circle sdk",
        handler: circle,
        params: {
          type: {
            default: "login",
            type: "string",
            values: ["login", "signup", "signout"],
          },
          email: {
            default: "",
            type: "string",
          },
          password: {
            default: "",
            type: "string",
          }
        },
      }
    ]
  },
  {
    name: "Transactions",
    description: "Multipurpose transaction frame built onbase.",
    skills: [
      {
        command: "/send [amount] [token] [username]",
        triggers: ["/send"],
        examples: ["/send 10 usdc @vitalik"],
        description:
          "Send a specified amount of a cryptocurrency to a destination address.",
        handler: transaction,
        params: {
          amount: {
            default: 10,
            type: "number",
          },
          token: {
            default: "usdc",
            type: "string",
            values: ["eth", "dai", "usdc", "degen"], // Accepted tokens
          },
          username: {
            default: "",
            type: "username",
          },
        },
      },
      {
        command: "/swap [amount] [token_from] [token_to]",
        triggers: ["/swap"],
        examples: ["/swap 10 usdc eth"],
        description: "Exchange one type of cryptocurrency for another.",
        handler: transaction,
        params: {
          amount: {
            default: 10,
            type: "number",
          },
          token_from: {
            default: "usdc",
            type: "string",
            values: ["eth", "dai", "usdc", "degen"], // Accepted tokens
          },
          token_to: {
            default: "eth",
            type: "string",
            values: ["eth", "dai", "usdc", "degen"], // Accepted tokenss
          },
        },
      },
      {
        command: "/show",
        triggers: ["/show"],
        examples: ["/show"],
        handler: transaction,
        description: "Show the whole frame.",
        params: {},
      },
    ],
  },
  {
    name: "Games",
    description: "Provides various gaming experiences.",
    skills: [
      {
        command: "/game [game]",
        triggers: ["/game", "🔎", "🔍"],
        handler: games,
        description: "Play a game.",
        params: {
          game: {
            default: "",
            type: "string",
            values: ["wordle", "slot", "help"],
          },
        },
      },
    ],
  },
  {
    name: "Loyalty",
    description: "Manage group members and metadata.",
    skills: [
      {
        command: "/points",
        triggers: ["/points"],
        examples: ["/points"],
        handler: loyalty,
        description: "Check your points.",
        params: {},
      },
      {
        command: "/leaderboard",
        triggers: ["/leaderboard"],
        adminOnly: true,
        handler: loyalty,
        description: "Check the points of a user.",
        params: {},
      },
    ],
  },
  {
    name: "Agent",
    description: "Manage agent commands.",
    skills: [
      {
        command: "/agent [prompt]",
        triggers: ["/agent", "@agent", "@bot"],
        examples: ["/agent @vitalik"],
        handler: agent,
        description: "Manage agent commands.",
        params: {
          prompt: {
            default: "",
            type: "prompt",
          },
        },
      },
    ],
  },
  {
    name: "Help",
    description: "Get help with the bot.",
    skills: [
      {
        command: "/help",
        triggers: ["/help"],
        examples: ["/help"],
        handler: helpHandler,
        description: "Get help with the bot.",
        params: {},
      },
    ],
  },
];
