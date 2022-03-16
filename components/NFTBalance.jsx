import React, { useState } from 'react';
import { useMoralis, useNFTBalances } from 'react-moralis';
import { Card, Image, Tooltip, Modal, Input, Skeleton } from 'antd';
import { useVerifyMetadata } from 'hooks/useVerifyMetadata';
import CardNft from './CardNft';

const styles = {
  NFTs: {
    display: 'flex',
    flexWrap: 'wrap',
    WebkitBoxPack: 'start',
    justifyContent: 'flex-start',
    margin: '0 auto',
    maxWidth: '1000px',
    width: '100%',
    gap: '10px',
  },
};

function NFTBalance() {
  const { data: NFTBalances } = useNFTBalances();
  const { verifyMetadata } = useVerifyMetadata();

  console.log('NFTBalances', NFTBalances);
  return (
    <div className="flex flex-col">
      <div className="flex align-center justify-center p-5">
        <h2 className="font-bangers text-3xl text-white p-2 border-4 bg-black">
          Total Number of NFTs{' '}
          <span className="text-pink-600 text-4xl">{NFTBalances?.result.length}</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-2 xl:grid-cols-4 xl:gap-4 py-2">
        {NFTBalances?.result &&
          NFTBalances.result.map((nft, index) => {
            nft = verifyMetadata(nft);
            return (
              <>
                <CardNft
                  key={index}
                  name={nft.name}
                  address={nft.token_address}
                  image={nft.image}
                />
              </>
            );
          })}
      </div>
    </div>
  );
}

export default NFTBalance;
