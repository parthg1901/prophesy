import "dotenv/config";
import { HandlerContext } from "@xmtp/message-kit";
import {
  updateRecordById,
  getRecordByField,
  getRecords,
} from "../lib/lowdb.js";

import { SkillResponse } from "@xmtp/message-kit";

const groupId = process.env.GROUP_ID as string;
export async function handler(
  context: HandlerContext
): Promise<SkillResponse | undefined> {
  const {
    message: {
      content: { skill, content },
      sender,
    },
  } = context;
console.log(content)

 if (content === "/unsubscribe") {
    const subscriber = await getRecordByField(
      "subscribers",
      "address",
      sender.address
    );
    console.log(subscriber)
    if (subscriber) {
      await updateRecordById("subscribers", subscriber.id, {
        status: "unsubscribed",
      });
      console.log("here")
    }
    return {
      code: 200,
      message: "You have been unsubscribed from updates.",
    };
  } else if (content === "/subscribe") {
    const subscriber = await getRecordByField(
      "subscribers",
      "address",
      sender.address
    );
    if (subscriber) {
      await updateRecordById("subscribers", subscriber?.id, {
        status: "subscribed",
      });

      return {
        code: 200,
        message: "You have been subscribed to updates.",
      };
    } else {
        console.log("here")
      return {
        code: 400,
        message: "You are already subscribed to updates.",
      };
    }
  }else {
    console.log("here")
    return {
      code: 400,
      message: "Invalid command",
    };
  }
}