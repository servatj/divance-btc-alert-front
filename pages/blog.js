import Head from "next/head";
import "antd/dist/antd.css";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";

export default function Blog({ posts }) {
  return (
    <div className="flex flex-col py-10 bg-purple-600 xl:h-screen">
      <Head>
        <title>ATH Alert</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center">
        <div>
          <h1 className="font-bangers text-3xl text-white">Blog </h1>
          <div className="px-4 py-6 sm:px-0 cursor-pointer hover:scale-105 hover:border-b-2">
            {posts.map((post, index) => (
              <Link href={"/feed/" + post.slug} passHref key={index}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                  <Image
                    className="w-full"
                    src={post.frontMatter.thumbnailUrl}
                    alt="Community"
                    width={400}
                    height={300}
                    objectFit="cover"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                     {post.frontMatter.title}
                    </div>
                    <p className="text-gray-700 text-base">
                      {post.frontMatter.description}
                    </p>
                    <p>{post.frontMatter.date}</p>
                  </div>

                  <div className="px-6 pt-2 pb-2">
                  {['crypto', 'nft', 'launchpad'].map((tag, index)=> {
                      return (
                        <span key={`${tag}${index}`} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          # {tag}
                        </span>
                      )
                  })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    return {
      frontMatter,
      slug: filename.split(".")[0],
    };
  });
  return {
    props: {
      posts,
    },
  };
};
