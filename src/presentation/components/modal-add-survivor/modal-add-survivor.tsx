import { useState } from 'react'
import '@/presentation/components/modal-add-survivor/modal-add-survivor.css'
import { X } from 'lucide-react'

export default function ModalAddSurvivor({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    status: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    latitude: '',
    longitude: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button
          title="close"
          type="button"
          className="modal-close-button"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2>Add Survivor</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name of Survivor</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Healthy">Healthy</option>
                <option value="Infected">Infected</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Last Location</label>
              <div className="form-group-location">
                <input
                  type="text"
                  id="latitude"
                  name="latitude"
                  placeholder="Latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  id="longitude"
                  name="longitude"
                  placeholder="Longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Survivor
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
