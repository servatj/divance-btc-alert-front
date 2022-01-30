import Image from 'next/image';
import WalletButton from './WalletButton';
import React from "react";

import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/Connectors";

function Header({ fixed }) {
  const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  async function connectLogic() {
    console.log("connecting", active);
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
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <Image src="/divancelogo.png" width={40} height={32}/>
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#"
            >
              Divance
            </a>
            <button
              className="text-purple cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
            <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center justify-between" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
          {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
          <WalletButton connectLogic={connectLogic} connected={active} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
