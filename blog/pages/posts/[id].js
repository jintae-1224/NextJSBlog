import { MDXRemote } from 'next-mdx-remote'
import { useRouter } from 'next/router'
import Date from '../../components/Date'
import CodeBlock from '../../components/CodeBlock'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import dynamic from 'next/dynamic'

const Button = dynamic(() => import('../../components/Button'), {
  loading: () => <div>Loading...</div>,
})

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params, preview }) {
  console.log('>>>>>', preview)
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

const components = { Button, CodeBlock }

export default function Post({ postData }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading</div>
  }

  return (
    <article>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      {postData.contentHtml && (
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      )}
      {postData.mdxSource && (
        <MDXRemote {...postData.mdxSource} components={components} />
      )}
    </article>
  )
}
