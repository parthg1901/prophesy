# Prophesy - Imagine to Earn
Prophesy is an imagine-to-earn platform built for allowing anyone to create random stories, initiated by an AI and it also allows users to tip each other in the chat group if they like the 'Twist' added by the sender. 

## Tools Used
XMTP - For creating the chatbot
    - Used GROQ API and Llama Engine for Chatbot interactions
Circle - Used for creating Dev Controlled Wallets across various chains to allow users to tip/earn on any chain.
    - Compliance Engine - Ensures that users do not participate in any illicite activities and prevent them for misusing the application by Denying Suspicious Transactions or even Freezing their wallets in severe case.
    - Dev Controlled Wallets - Created direclty using the wallet provided by converse.xyz.
    Please feel free to play around [router](backend/src/routers/index.ts)
    - Detailed API Reference coming soon.
Chronicle Protocol - Used to provide price updates along with the time of last update to the users. (Subscription based/Custom Calls)
## XMTP Agent Reference

### **Tipping**  
`/tip [@usernames] [amount] [token]` - Tip users in specified tokens.  

### **Members**  
`/subscribe` or `/unsubscribe` - Manage update subscriptions.  
`/price [pool]` - Get token price (e.g., `/price ETH_USD`).  

### **Auth**  
`/auth [type] [blockchain]` - Authenticate via Circle SDK.  

### **Circle**  
`/faucet [to] [blockchain]` - Request tokens from a faucet.  
`/transferusdc [to] [from] [amount]` - Transfer USDC between addresses.  

### **Prompt**  
`/prompt [prompt]` - Generate creative story prompts.  

### **Games**  
`/game [game]` - Play games like Wordle or Slots.  

### **Loyalty**  
`/points` - Check your points.  
`/leaderboard` - View group leaderboard (admin-only).  

### **Agent**  
`/agent [prompt]` - Manage and interact with the bot.  

### **Help**  
`/help` - Display help information.  