import WalletButton from './WalletButton';
import React from "react";
import { useMoralis } from 'react-moralis'

function Header({ fixed }) {
  const { authenticate, isAuthenticated, account, chainId, logout } = useMoralis();
  const [navbarOpen, setNavbarOpen] = React.useState(false);


  async function connectLogic() {
    try {
      if(isAuthenticated) {
        logout();
      } else {
        console.log('Ativate')
        await authenticate();
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
            <p className="font-mansalva text-center antialiased text-1xl -mt-10"> 🟣 Crypto Community 🟣</p>
          </div>
          <WalletButton connectLogic={connectLogic} connected={isAuthenticated} />
        </div>
      </nav>
    </>
  );
}

export default Header;
