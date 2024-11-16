import { run, HandlerContext } from "@xmtp/message-kit";
import { handler as splitpayment } from "./handler/splitpayment.js";
import { startCron } from "./lib/cron.js";

let clientInitialized = false;
// Main function to run the app
run(
  async (context: HandlerContext) => {
    console.log(context);
    if (context.group) {
      const {
        v2client,
        message: { content ,typeId, sender },
      } = context;
      console.log(content);
      console.log(clientInitialized)
      if (!clientInitialized) {
        await startCron(v2client);
        clientInitialized = true;
      }
      if (!(content.split(" ")[0] === "/auth" && content.split(" ")[1] === "wallet")) {
        switch (typeId) {
          case "reply":
            handleReply(context);
            break;
          case "remoteStaticAttachment":
            handleAttachment(context);
            break;
        }
        return;
      }
    }
    if (!context.group) {
      const {
        message: { content ,typeId },
      } = context;
      if ((content.split(" ")[0] === "/auth" && content.split(" ")[1] === "wallet")) {
        switch (typeId) {
          case "reply":
            handleReply(context);
            break;
          case "remoteStaticAttachment":
            handleAttachment(context);
            break;
        }
        return;
      }
      context.send("This is a group bot, add this address to a group");
    }
  },
  { attachments: true },
);
async function handleReply(context: HandlerContext) {
  const {
    v2client,
    getReplyChain,
    version,
    message: {
      content: { reference },
    },
  } = context;

  const { chain, isSenderInChain } = await getReplyChain(
    reference,
    version,
    v2client.address,
  );
  //await context.skill(chain);
}

// Handle attachment messages
async function handleAttachment(context: HandlerContext) {
  await splitpayment(context);
}

export async function helpHandler(context: HandlerContext) {
  const { skills } = context;
  const intro =
    "Available experiences:\n" +
    skills
      ?.flatMap((app) => app.skills)
      .map((skill) => `${skill.command} - ${skill.description}`)
      .join("\n") +
    "\nUse these skills to interact with specific apps.";
  context.send(intro);
}
