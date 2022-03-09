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
    <div style={{ padding: '15px', maxWidth: '1030px', width: '100%' }}>
      <div style={styles.NFTs}>
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
