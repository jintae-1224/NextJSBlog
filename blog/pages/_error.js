import ErrorNext from 'next/error'

function Error({ statusCode }) {
  return (
    // <p>
    //   {statusCode
    //     ? `An error ${statusCode} occurred on Server`
    //     : 'An error occurred on Clinet'}
    // </p>
    <ErrorNext statusCode={statusCode} />
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
