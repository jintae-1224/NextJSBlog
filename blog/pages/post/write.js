import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

// export async function getServerSideProps() {
//   return {}
// }

export default function Write() {
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      console.log(JSON.stringify(router))
    }
    router.prefetch('posts/ssg-ssr')
  }, [router])

  useEffect(() => {
    console.log(router.query)
  }, [router.query])
  const idRef = useRef(undefined)
  const titleRef = useRef(undefined)
  const contentRef = useRef(undefined)

  const [showLink, setShowLink] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const id = idRef.current.value
    const title = titleRef.current.value
    const content = contentRef.current.value

    if (id && title && content) {
      fetch('/api/post/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          title,
          content,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('Fetch Error')
        })
        .then((data) => {
          setShowLink(true), alert(data.message)
        })
        .catch((error) => alert(`request error: ${error}`))
    }
  }
  return (
    <>
      <h1>Write a Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="id" required ref={idRef} />
        <br />
        <input
          type="text"
          name="title"
          placeholder="title"
          required
          ref={titleRef}
        />
        <br />
        <textarea
          type="text"
          name="Content"
          placeholder="Content"
          required
          ref={contentRef}
        />
        <br />
        <input type="submit" value="Create" />
      </form>
      {showLink && (
        <Link href={`/posts/${idRef.current.value}`}>Created Post</Link>
      )}
      <br />
      <br />
      <button
        onClick={
          () => router.push('/posts/[id]', 'posts/ssg-ssr', { scroll: false })
          // scroll : false => scroll 유지
        }
      >
        router.push
      </button>
      <br />
      <br />
      <button onClick={() => router.replace('/posts/ssg-ssr')}>
        router.replace
      </button>
    </>
  )
}
