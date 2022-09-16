import {
  connect,
  ConnectedWalletAccount,
  keyStores,
  WalletConnection,
} from "near-api-js";
import { useEffect } from "react";

const CONTRACT_ID = "dev-1663323212925-26809045794776";

const Home = function () {
  let walletConn: WalletConnection | undefined;
  let wallet: ConnectedWalletAccount | undefined;

  const viewMethod = async function (method: string, args: any = []) {
    return await wallet?.connection.provider.query({
      request_type: "call_function",
      account_id: CONTRACT_ID,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    });
  };

  const callMethod = async function (
    method: string,
    args: any = {},
    gas: string = (3 * Math.pow(10, 9)).toString(),
    deposit: string = "0"
  ) {};

  const getBeneficiary = async function () {};

  const donate = async function (amount: number) {};

  const initWalletConn = async function () {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const nearConn = await connect({
      networkId: "testnet",
      keyStore: keyStore,
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      headers: {},
    });

    walletConn = new WalletConnection(nearConn, "Boys");

    const acc = await nearConn.account(CONTRACT_ID);

    wallet = new ConnectedWalletAccount(
      walletConn,
      acc.connection,
      CONTRACT_ID
    );
  };

  const init = async function () {
    await initWalletConn();
  };

  useEffect(() => {
    init();
  }, []);

  return <div>Hello, boys!</div>;
};

export default Home;
