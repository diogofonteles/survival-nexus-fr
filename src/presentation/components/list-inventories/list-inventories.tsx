'use client'

import { useState } from 'react'
import '@/presentation/components/list-inventories/list-inventories.css'
import { User } from 'lucide-react'
import ModalRequestItem from '@/presentation/components/modal-request-item/modal-request-item'

export default function ListInventories() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSurvivor, setSelectedSurvivor] = useState(null)

  const inventories = [
    {
      name: 'Ellie Williams',
      items:
        '1 Shotgun, 1 First Aid Kit, 5 Bottled Water, 1 Helmet, 5 Canned Food, 1 Tent, 2 Radios',
    },
    {
      name: 'Joel Miller',
      items:
        '1 Pistol, 1 Shotgun, 1 First Aid Kit, 12 Bottled Water, 2 Gloves, 15 Canned Food, 2 Radios',
    },
    { name: 'Tommy Miller', items: '1 Sniper, 1 Radio' },
    { name: 'Abby Anderson', items: '1 Pistol, 16 Bottled Water, 1 Radio' },
    { name: 'Lev Cheng', items: '1 Bow, 15 Arrows, 6 Canned Food' },
  ]

  const handleRequestItem = (survivor) => {
    setSelectedSurvivor(survivor)
    setIsModalOpen(true)
  }

  return (
    <div className="list-container">
      <main className="main-content">
        <div className="header-list-inventories">
          <div>
            <h1>List of Survivors Inventories</h1>
            <p>You have 10,201 Inventories logged</p>
          </div>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Inventories</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inventories.map((inventory, index) => (
                <tr key={index}>
                  <td className="survivor-name">
                    <div className="user-icon-circle">
                      <User size={16} className="user-icon" />
                    </div>
                    <span className="name-bold">{inventory.name}</span>
                  </td>
                  <td>{inventory.items}</td>
                  <td>
                    <button
                      className="request-item-button"
                      onClick={() => handleRequestItem(inventory)}
                    >
                      Request Item
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-list-inventories">
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
      <ModalRequestItem
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        survivor={selectedSurvivor}
      />
    </div>
  )
}
