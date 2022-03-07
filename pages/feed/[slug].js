import { MDXRemote, heading } from 'next-mdx-remote';
import Head from 'next/head';
import styles from '../../styles/feed.module.css';
import { serialize } from 'next-mdx-remote/serialize';
import SyntaxHighlighter from 'react-syntax-highlighter';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const components = {
  SyntaxHighlighter,
};

export const POSTS_PATH = 'posts';
export const POSTS_METADATA_PATH = 'posts-metadata';

export default function Article({ source, meta }) {
  return (
    <div className="flex flex-col py-10 bg-purple-600 xl:h-screen">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto bg-white p-10">
        <div className={styles.post}>
          <h1 className="font-semibold my-8 text-3xl text-black ">{meta.title}</h1>
          <MDXRemote {...source} components={components} />
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const markdownWithMeta = fs.readFileSync(path.join('posts', params.slug + '.mdx'), 'utf-8');
  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);
  const stringMetadata = fs
    .readFileSync(path.join(process.cwd(), `${POSTS_METADATA_PATH}/${params.slug}.json`))
    .toString();

  return {
    props: {
      source: mdxSource,
      meta: JSON.parse(stringMetadata),
    },
  };
};
