export default function Footer() {
   return (
    <div className="relative py-9">
    <div className="flex items-center justify-center space-x-3">
      <a
        href="https://www.instagram.com/divance_community/"
        className="px-2 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
      >
        <img src="https://img.icons8.com/small/40/000000/instagram-new.png" />
      </a>
      <a
        href="https://twitter.com/divance7"
        className="px-2 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
      >
        <img src="https://img.icons8.com/material/40/000000/twitter--v1.png" />
      </a>
      <a
        href="https://discord.gg/AwrM7xYkvF"
        className="px-2 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
      >
        <img src="https://img.icons8.com/ios-glyphs/40/000000/discord-logo.png" />
      </a>
      <a
        href="https://github.com/divance-cryptos"
        className="px-2 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
      >
        <img src="https://img.icons8.com/ios-glyphs/40/000000/github.png" />
      </a>
    </div>
    <div className="flex items-center justify-center space-x-3">
      <p className="text-1xl text-black">
        {" "}
        --> powered by Divance http://divance.app {" "}
      </p>
    </div>
  </div>
   )
}
