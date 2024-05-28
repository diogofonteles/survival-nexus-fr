'use client'

// import { useState } from 'react'
import './list-inventories.css'
import { Plus, User, Info } from 'lucide-react'
// import ModalAddInventory from '../modal-add-inventory/page'

const inventories = [
  {
    name: 'Ellie Williams',
    inventory:
      '1 Shotgun, 1 First Aid Kit, 5 Bottled Water, 1 Helmet, 5 Canned Food, 1 Tent, 2 Radios',
  },
  {
    name: 'Joel Miller',
    inventory:
      '1 Pistol, 1 Shotgun, 1 First Aid Kit, 12 Bottled Water, 2 Gloves, 15 Canned Food, 2 Radios',
  },
  {
    name: 'Tommy Miller',
    inventory: '1 Sniper, 1 Radio',
  },
  {
    name: 'Abby Anderson',
    inventory: '1 Pistol, 16 Bottled Water, 1 Radio',
  },
  {
    name: 'Lev Cheng',
    inventory: '1 Bow, 15 Arrows, 6 Canned Food',
  },
]

export default function ListInventories() {
  // const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="list-container">
      <main className="main-content">
        <div className="header-list-inventories">
          <div>
            <h1>List of Survivors Inventories</h1>
            <p>
              You have 10,201 Inventories logged
              <span className="info-icon">
                <Info size={16} className="info-circle" />
                <span className="tooltip">Inventories are updated daily</span>
              </span>
            </p>
          </div>
          <button
            className="add-inventory-button"
            // onClick={() => setIsModalOpen(true)}
          >
            <div className="plus-circle">
              <Plus size={16} color="white" />
            </div>
            Add Inventory
          </button>
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
                  <td>{inventory.inventory}</td>
                  <td>
                    <button className="request-button">Request Item</button>
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
      {/* <ModalAddInventory
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
    </div>
  )
}
