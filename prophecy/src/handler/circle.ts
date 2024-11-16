import { HandlerContext } from "@xmtp/message-kit";

export async function handler(context: HandlerContext) {
  const {
    message: {
      sender,
      content: { params },
    },
  } = context;

  try {
    let type = params.type;
    console.log(type)
    if (type === "signout") {
        await context.reply("User signed out.");
        return;
    } else if (type === "signup") {
        
        await context.reply("User signed up.");
        return;
    } else if (type === "login") {
        await context.reply("User logged in.");
        return;
    }
  } catch (error) {
    console.error("Error during Circle call:", error);
    await context.reply("An error occurred while processing your request.");
  }
}

function signout() {
    // signout logic
}

function login(email: string, password: string) {
    // login logic
}
function signup(email: string, password: string) {
    // signup logic
}
