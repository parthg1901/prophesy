import { HandlerContext } from "@xmtp/message-kit";

export async function handler(context: HandlerContext) {
  const {
    message: {
      sender,
      content: { params, content },
    },
  } = context;

  try {
    let type = params.type;
    console.log(type)
    console.log(params)
    console.log(sender)
    console.log(content)
    if (type === "signin") {
        await signin(sender.address);

        await context.reply("User signed up.");
        return;
    } else if (type === "wallet") {
        await createWallet(sender.address, params.blockchain);

        await context.reply("Wallet created.");
        return;
    } else if (type === "list") {
        const wallets = await listWallets(sender.address);
        await context.reply("Your Wallets -")
        Promise.all(wallets.wallets.map(async (wallet: any) => {
          await context.reply(wallet.address + " " + wallet.blockchain)
        }))
        // await context.reply("Wallets listed.");
        return;
    } 
    if (content.split(" ")[0] === "/faucet") {
        await faucet(params.to, params.blockchain);

        await context.reply("Done.");
        return; 

    }
  } catch (error) {
    console.error("Error during Circle call:", error);
    await context.reply("An error occurred while processing your request.");
  }
}
async function signin(wallet: string) {
    const res = await fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wallet })
    })
    console.log(await res.json())
}

async function createWallet(wallet: string, blockchain: string) {
    const res = await fetch("http://localhost:8080/wallets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wallet,  blockchain: blockchain.toUpperCase()})
    })
    console.log(await res.json())
}

async function listWallets(wallet: string) {
  console.log(wallet)
    const res = await fetch(`http://localhost:8080/wallets?wallet=${encodeURIComponent(wallet)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return await res.json() as any
}

async function faucet(wallet: string, blockchain: string) {
    const res = await fetch("http://localhost:8080/faucet/drips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: wallet, blockchain: blockchain.toUpperCase() })
    })
}