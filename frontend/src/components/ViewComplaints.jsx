import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ViewComplaints = ({ userEmail }) => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchComplaints()
  }, [userEmail])

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `http://localhost:5000/complaints?user_email=${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setComplaints(response.data.complaints)
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch complaints')
      setLoading(false)
    }
  }

  const handleDelete = async (complaintId) => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      await axios.delete(
        `http://localhost:5000/complaints/${complaintId}?user_email=${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      // Refresh complaints list
      fetchComplaints()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete complaint')
    }
  }

  if (loading) {
    return <div>Loading complaints...</div>
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>My Complaints</h2>
      {error && <div className="error">{error}</div>}
      {complaints.length === 0 ? (
        <p>No complaints found. Create one to get started!</p>
      ) : (
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.title}</td>
                <td>{complaint.description}</td>
                <td>
                  <button
                    onClick={() => handleDelete(complaint.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ViewComplaints


