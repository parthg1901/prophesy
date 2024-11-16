import cron from "node-cron";
import { Client } from "@xmtp/xmtp-js";
import { getRecords } from "./lowdb.js";

export async function startCron(
  v2client: Client,
) {
  console.log("Starting daily cron");
  const conversations = await v2client.conversations.list();
  cron.schedule(
    '*/20 * * * * *', // Daily or every 5 seconds in debug mode
    async () => {
      const subscribers = await getRecords("subscribers");

      console.log(`Running daily task. ${subscribers.length} subscribers.`);
      for (const address of subscribers) {
        const subscriptionStatus = address.status;
        if (subscriptionStatus === "subscribed") {
          const targetConversation = conversations.find(
            (conv) => conv.peerAddress === address.address
          );
          if (targetConversation) {
            await targetConversation.send("Created Subscription");
            await targetConversation.send(
              "If you need any information about the event or our speakers, just ask me. I'm always happy to help!"
            );
            await targetConversation.send(
              "To unsubscribe, just tell me to stop."
            );
          }
        }
      }
    },
    {
      scheduled: true,
      timezone: "UTC",
    },
  );
}