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
          await context.reply(wallet.address + " " + wallet.blockchain + " " + wallet.id) 
        }))
        // await context.reply("Wallets listed.");
        return;
    } 
    if (content.split(" ")[0] === "/faucet") {
        await faucet(params.to, params.blockchain);

        await context.reply("Done.");
        return; 
    } else if (content.split(" "[0] === "/transferusdc")) {
      await transerUSDC(params.from, params.to, params.amount);
      await context.reply("Transaction Sent");
      return;
    }
  } catch (error) {
    console.error("Error during Circle call:", error);
    await context.reply("An error occurred while processing your request.");
  }
}
async function signin(wallet: string) {
    const res = await fetch("https://prophesy-1.onrender.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wallet })
    })
    console.log(await res.json())
}

async function createWallet(wallet: string, blockchain: string) {
    const res = await fetch("https://prophesy-1.onrender.com/wallets", {
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
    const res = await fetch(`https://prophesy-1.onrender.com/wallets?wallet=${encodeURIComponent(wallet)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return await res.json() as any
}

async function faucet(wallet: string, blockchain: string) {
    const res = await fetch("https://prophesy-1.onrender.com/faucet/drips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: wallet, blockchain: blockchain.toUpperCase() })
    })
}

async function transerUSDC(from: string, to: string, amount: number) {
  const token = (await getWalletBalance(from) as any).tokenBalances[0]
    const res = await fetch("https://prophesy-1.onrender.com/transactions/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletId: from, destinationAddress: to, amount, feeLevel: "MEDIUM", tokenId: token.token.id })
    })
}

async function getWalletBalance(wallet: string) {
    const res = await fetch(`https://prophesy-1.onrender.com/wallets/${wallet}/balances`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const responseBody = await res.json();
console.log(responseBody);
return responseBody;
}