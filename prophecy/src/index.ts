import { run, HandlerContext } from "@xmtp/message-kit";
import { handler as splitpayment } from "./handler/splitpayment.js";

// Main function to run the app
run(
  async (context: HandlerContext) => {
    const {
      message: { typeId },
    } = context;
    console.log(typeId)
    switch (typeId) {
      case "reply":
        handleReply(context);
        break;
      case "remoteStaticAttachment":
        handleAttachment(context);
        break;
    }
    if (!context.group) {
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
