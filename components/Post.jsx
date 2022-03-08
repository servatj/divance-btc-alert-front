import matter from 'gray-matter';

export function Post({ meta, content }) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default Post;


export async function getServerSideProps(context) {

  const fileContents = fs.readFileSync('../posts/bitcoin.yml', 'utf8')
  const { data, content } = matter(fileContents)

  console.log('content', content)
  return {
    props: {
      meta: data,
      content
    }, // will be passed to the page component as props
  }
}
