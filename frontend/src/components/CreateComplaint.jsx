import React, { useState } from 'react'
import axios from 'axios'

const CreateComplaint = ({ userEmail }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'http://localhost:5000/complaints',
        {
          title,
          description,
          user_email: userEmail
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.status === 201) {
        setSuccess('Complaint created successfully!')
        setTitle('')
        setDescription('')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create complaint')
    }
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Create Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit" className="btn btn-primary">
          Submit Complaint
        </button>
      </form>
    </div>
  )
}

export default CreateComplaint


