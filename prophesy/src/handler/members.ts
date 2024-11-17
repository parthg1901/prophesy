import "dotenv/config.js";
import { HandlerContext } from "@xmtp/message-kit";
import {
  updateRecordById,
  getRecordByField,
  getRecords,
} from "../lib/lowdb.js";

import { SkillResponse } from "@xmtp/message-kit";
import { ethers } from "ethers";

const groupId = process.env.GROUP_ID as string;
export async function handler(
  context: HandlerContext
): Promise<SkillResponse | undefined> {
  const {
    message: {
      content: { skill,content: text, params },
      sender,
    }} = context;
    let content = text.split(" ")[0];
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
    }
  } else if (content === "/price"){
    const priceFeed = "0x732c57f702802fdaf604f8Bd11A8c888F786cc04";
    const abi = [
        "function read(string) view returns (uint256, uint256)"
    ]
    const contract = new ethers.Contract(priceFeed, abi, new ethers.JsonRpcProvider("https://1rpc.io/sepolia"));
    const out  = await contract.read(params.pool.toUpperCase())
    await context.reply("Price: " + out[0].toString() + " " + new Date(parseInt(out[1].toString())*1000))

  } else {
    console.log("here")
    return {
      code: 400,
      message: "Invalid command",
    };
  }
}