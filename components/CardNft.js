import Image from 'next/image';

const imageLoader = ({ src }) => {
  console.log('src', src);
  return `${src}`;
};

const CardNft = ({ name, address, image }) => {
  console.log({ name, address, image });
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image
        loader={imageLoader}
        src={image || 'https://dummyimage.com/400x400/000000/8c1a7b&text=No+Image'}
        alt={name}
        width="380px"
        height={'400px'}
      />
      <div className="px-6 py-4 bg-white">
        <div className="font-bold text-xl ">{name}</div>
        <p className="text-gray-700 text-base">{address}</p>
      </div>
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
