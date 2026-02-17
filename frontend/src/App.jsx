import { useState } from 'react'
import { testHealthCheck } from './api/client'
import './App.css'

function App() {
  const [apiStatus, setApiStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleTestAPI = async () => {
    setIsLoading(true)
    setError(null)
    setApiStatus(null)
    
    try {
      const data = await testHealthCheck()
      setApiStatus(data)
    } catch (err) {
      setError('Failed to connect to backend. Make sure the backend server is running on port 5000.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>💰 Finance Categorizer</h1>
        <p>Personal finance tracking made simple</p>
      </header>

      <main>
        <div className="welcome-section">
          <h2>Welcome!</h2>
          <p>This app helps you categorize your financial transactions automatically.</p>
          <p>Test the API connection to get started:</p>
        </div>

        <div className="api-test-section">
          <button 
            onClick={handleTestAPI} 
            disabled={isLoading}
            className="test-button"
          >
            {isLoading ? 'Testing...' : 'Test API Connection'}
          </button>

          {apiStatus && (
            <div className="status-success">
              <h3>✅ Connected Successfully!</h3>
              <p><strong>Status:</strong> {apiStatus.status}</p>
              <p><strong>Message:</strong> {apiStatus.message}</p>
              <p><strong>Time:</strong> {new Date(apiStatus.timestamp).toLocaleString()}</p>
            </div>
          )}

          {error && (
            <div className="status-error">
              <h3>❌ Connection Failed</h3>
              <p>{error}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
