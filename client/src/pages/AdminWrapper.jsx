import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AdminLogin from "./AdminLogin"
import Admin from "./Admin"

export default function AdminWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("adminToken")
    const user = localStorage.getItem("adminUser")
    
    if (token && user) {
      setIsAuthenticated(true)
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true)
    setCurrentUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    setIsAuthenticated(false)
    setCurrentUser(null)
    navigate("/")
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  return <Admin currentUser={currentUser} onLogout={handleLogout} />
}
