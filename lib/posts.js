import { readdirSync, readFileSync } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { join } from 'path';

export const POSTS_PATH = 'posts';
export const POSTS_METADATA_PATH = 'posts-metadata';

export const getPostMetadata = (slug) => {
  const stringMetadata = readFileSync(
    join(process.cwd(), `${POSTS_METADATA_PATH}/${slug}.json`)
  ).toString();

  return JSON.parse(stringMetadata);
};

export const retrievePostsCovers = () => {
  const postsNames = readdirSync(join(process.cwd(), POSTS_METADATA_PATH));

  const covers = postsNames.map((name) => {
    const slug = name.split('.')[0];
    const metadata = getPostMetadata(slug);

    return {
      slug,
      ...metadata
    };
  });

  return covers;
};

export const getPostsPaths = () => {
  const posts = readdirSync(join(process.cwd(), POSTS_PATH)).map(
    (filename) => `/feed/${filename.split('.')[0]}`
  );

  return posts;
};

export const getPostContent = async (
  slug
) => {
  const source = readFileSync(join(process.cwd(), `${POSTS_PATH}/${slug}.mdx`)).toString();
  return serialize(source);
};
