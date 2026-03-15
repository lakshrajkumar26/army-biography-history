import { useState } from "react"
import axios from "axios"

export default function AdminLogin({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", credentials)
      
      if (res.data.token) {
        // Store token in localStorage
        localStorage.setItem("adminToken", res.data.token)
        localStorage.setItem("adminUser", JSON.stringify(res.data.user))
        onLoginSuccess(res.data.user)
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
      <div className="bg-[#2a2a2a] p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Admin Login</h1>
        <p className="text-gray-400 text-center mb-8">Enter your credentials to access the admin panel</p>

        {error && (
          <div className="bg-red-900/50 border border-red-600 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2 font-semibold">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
              className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-3 text-white focus:outline-none focus:border-red-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-3 text-white focus:outline-none focus:border-red-500"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Default credentials:</p>
          <p className="font-mono">admin / admin123</p>
        </div>
      </div>
    </div>
  )
}
