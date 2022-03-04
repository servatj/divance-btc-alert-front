import CodeBlock from '../../components/CodeBlock';
import { getPostContent, getPostMetadata, getPostsPaths } from '../../lib/posts';
import { MDXRemote, heading } from 'next-mdx-remote';
import Head from "next/head";

const components = {
  code: CodeBlock,
  heading
};

export default function Article({ source, meta }) {
  return (
    <div className="flex flex-col py-10 bg-purple-600">
        <Head>
          <title>Blog</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='container mx-auto bg-white p-10'>
          <h1 className="font-semibold my-8 text-3xl text-black ">
            {meta.title}
          </h1>
          <MDXRemote {...source} components={components} />
        </div>
    </div>
  );
}


export async function getStaticPaths() {
  return {
    paths: getPostsPaths(),
    fallback: 'blocking'
  };
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      source: await getPostContent(params.slug),
      meta: getPostMetadata(params.slug)
    }
  };
};
