'use client'

import { useState } from 'react'
import '@/presentation/components/list-survivors/list-survivors.css'

import { Plus, User } from 'lucide-react'
import ModalAddSurvivor from '@/presentation/components/modal-add-survivor/modal-add-survivor'

export default function ListSurvivors() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const survivors = [
    { name: 'Ellie Williams', status: 'Healthy', date: 'May 14, 2023' },
    { name: 'Joel Miller', status: 'Healthy', date: 'Feb 8, 2023' },
    { name: 'Tommy Miller', status: 'Healthy', date: 'Feb 4, 2023' },
    { name: 'Abby Anderson', status: 'Healthy', date: 'Dec 12, 2022' },
    { name: 'Lev Cheng', status: 'Infected', date: 'Dec 12, 2022' },
  ]

  return (
    <div className="list-container">
      <main className="main-content">
        <div className="header-list-survivors">
          <div>
            <h1>List of Survivors</h1>
            <p>You have 1205 healthy survivors </p>
          </div>
          <button
            className="add-survivor-button"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="plus-circle">
              <Plus size={16} color="white" />
            </div>
            Add Survivor
          </button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {survivors.map((survivor, index) => (
                <tr key={index}>
                  <td className="survivor-name">
                    <div className="user-icon-circle">
                      <User size={16} className="user-icon" />
                    </div>
                    <span className="name-bold">{survivor.name}</span>
                  </td>
                  <td className="status">
                    <span
                      className={
                        survivor.status === 'Healthy'
                          ? 'status-healthy'
                          : 'status-infected'
                      }
                    >
                      {survivor.status}
                    </span>
                  </td>
                  <td>{survivor.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-list-survivors">
          <div>
            Showing <strong>1</strong> to <strong>5</strong> of{' '}
            <strong>100</strong> Results
          </div>
          <div className="buttons">
            <button className="pagination-button">Previous</button>
            <button className="pagination-button">Next</button>
          </div>
        </div>
      </main>
      <ModalAddSurvivor
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
