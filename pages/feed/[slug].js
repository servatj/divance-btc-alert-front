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
        <div>
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
