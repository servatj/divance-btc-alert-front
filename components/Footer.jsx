import Image from 'next/image';

export default function Footer() {
  return (
    <div className="relative py-14 bg-purple-600">
      <div className="flex items-center justify-center space-x-3">
        <a
          href="https://www.instagram.com/divance_community/"
          className="px-2 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
        >
          <Image alt="instagram" width={'40px'} height={'40px'} src="/instagram.png" />
        </a>
        <a
          href="https://twitter.com/divance7"
          className="px-2 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
        >
          <Image alt="twitter" width={'40px'} height={'40px'} src="/twitter.png" />
        </a>
        <a
          href="https://discord.gg/fXP5juJqQa"
          className="px-2 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
        >
          <Image alt="discord" width={'40px'} height={'40px'} src="/discord-logo.png" />
        </a>
        <a
          href="https://github.com/divance-cryptos"
          className="px-2 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
        >
          <Image alt="github" width={'40px'} height={'40px'} src="/github.png" />
        </a>
      </div>
      <div className="flex items-center justify-center space-x-3">
        <p className="text-1xl text-black"> powered by Divance http://divance.app </p>
      </div>
    </div>
  );
}
