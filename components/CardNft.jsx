import Image from 'next/image';
import { getExplorer } from 'lib/networks';
import { Link } from 'next/link';
import { useMoralis } from 'react-moralis';

const imageLoader = ({ src }) => {
  console.log('src', src);
  return `${src}`;
};

const CardNft = ({ name, address, image }) => {
  console.log({ name, address, image });

  const { chainId } = useMoralis();

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <Image
        loader={imageLoader}
        src={image || 'https://dummyimage.com/400x400/000000/8c1a7b&text=No+Image'}
        alt={name}
        width="400"
        height={'300px'}
      />
      <div className="px-4 py-4 bg-white">
        <div className="font-bold text-xl ">{name}</div>
        <p className="text-gray-700 text-base">
          🗒️ ${address.substring(0, 6)}...${address.substring(address.length - 4)}{' '}
        </p>
      </div>

      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <a target="_blank" href={`${getExplorer(chainId)}address/${address}`} rel="noreferrer">
            Block explorer
          </a>
        </span>
        {/* <span className="inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <a target="_blank" href={`${getExplorer(chainId)}address/${address}`} rel="noreferrer">
            Transfer
          </a>
        </span> */}
      </div>

      {/* <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <Image
          className="w-full"
          src={post.frontMatter.thumbnailUrl}
          alt="Community"
          width={400}
          height={300}
          objectFit="cover"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{post.frontMatter.title}</div>
          <p className="text-gray-700 text-base">{post.frontMatter.description}</p>
          <p>{post.frontMatter.date}</p>
        </div>

        <div className="px-6 pt-2 pb-2">
          {['crypto', 'nft', 'launchpad'].map((tag, index) => {
            return (
              <span
                key={`${tag}${index}`}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                # {tag}
              </span>
            );
          })}
        </div>
      </div> */}
      {/* <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div> */}
    </div>
  );
};

export default CardNft;
