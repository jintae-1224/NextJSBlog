import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    console.log(`getDerivedStateFromError : ${error}`)
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo })
    console.log(`componentDidCatch : ${(error, errorInfo)}`)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallbackComponents) {
        return this.props.fallbackComponents
      }
      return (
        <div>
          <h2>Error occured!!</h2>
          <detail style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </detail>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
