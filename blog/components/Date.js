import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  console.log(dateString)

  const date = parseISO(dateString)
  return <time dateTime={dateString}>2022-01-01</time>
}
