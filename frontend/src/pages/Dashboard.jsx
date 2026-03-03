import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CreateComplaint from '../components/CreateComplaint'
import ViewComplaints from '../components/ViewComplaints'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('home')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      navigate('/login')
      return
    }

    setUser(JSON.parse(userData))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Welcome, {user.username}</h1>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>

        <div className="dashboard-actions">
          <button
            onClick={() => setView('create')}
            className="btn btn-primary"
          >
            Create Complaint
          </button>
          <button
            onClick={() => setView('view')}
            className="btn btn-primary"
          >
            View Complaints
          </button>
          <button
            onClick={() => setView('home')}
            className="btn btn-secondary"
          >
            Home
          </button>
        </div>

        {view === 'create' && <CreateComplaint userEmail={user.email} />}
        {view === 'view' && <ViewComplaints userEmail={user.email} />}
        {view === 'home' && (
          <div>
            <p>Select an action above to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard


