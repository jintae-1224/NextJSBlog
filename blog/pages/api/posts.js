import { getSortedPostsData } from '../../lib/posts'

export default function handler(req, res) {
  const allPostsData = getSortedPostsData()
  console.log(allPostsData)
  res.status(200).json({ allPostsData })
}
