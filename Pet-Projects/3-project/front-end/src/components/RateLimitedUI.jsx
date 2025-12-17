import './styles/RateLimitedUI.css'

const RateLimitedUI = () => {
  return (
    <div className="rate-limited-container">
      <div className="rate-limited-icon">⚠️</div>
      <h1>Rate Limited</h1>
      <p>You have been rate limited. Please try again later.</p>
      <p>You can only make 5 requests per 10 seconds.</p>
      <button className="retry-button" onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  )
}

export default RateLimitedUI
