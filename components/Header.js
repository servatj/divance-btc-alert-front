import Image from 'next/image';
import WalletButton from './WalletButton';
import React from "react";

import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/Connectors";

function Header({ fixed }) {
  const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  async function connectLogic() {
    try {
      if(active) {
        deactivate();
      } else {
        console.log('Ativate')
        await activate(injected);
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-emerald-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap justify-between items-baseline">
          <div className="justify-center items-center">
            <h1 className="font-bangers text-purple-400 antialiased text-7xl">Divance</h1>
            <p className="font-mansalva text-center antialiased text-1xl -mt-10"> 🟣      Crypto Community 🟣</p>
          </div>
          <WalletButton connectLogic={connectLogic} connected={active} />
        </div>
      </nav>
    </>
  );
}

export default Header;
