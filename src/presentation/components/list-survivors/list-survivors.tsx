'use client'

import { useEffect, useState, useRef } from 'react'
import { LoadSurvivorsModel } from '@/domain/usecases/load-survivors'
import { makeRemoteLoadSurvivors } from '@/main/factories/usecases/remote-load-survivors-factory'
import '@/presentation/components/list-survivors/list-survivors.css'

import { Plus, User } from 'lucide-react'
import ModalAddSurvivor from '@/presentation/components/modal-add-survivor/modal-add-survivor'

export default function ListSurvivors() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [survivors, setSurvivors] = useState<LoadSurvivorsModel[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const loadSurvivors = useRef(makeRemoteLoadSurvivors())

  useEffect(() => {
    const subscription = loadSurvivors.current.load(currentPage).subscribe({
      next: (data) => {
        console.log('Survivors data received:', data)
        setSurvivors(data)
      },
      error: (error) => {
        console.error('Error loading survivors:', error)
      },
    })

    return () => {
      console.log('Unsubscribing from survivors data stream')
      subscription.unsubscribe()
    }
  }, [currentPage])

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  if (!survivors.length) {
    return <div>Loading...</div>
  }

  return (
    <div className="list-container">
      <main className="main-content">
        <div className="header-list-survivors">
          <div>
            <h1>List of Survivors</h1>
            <p>
              You have {survivors.filter((s) => !s.props.infected).length}{' '}
              healthy survivors{' '}
            </p>
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
                    <span className="name-bold">{survivor.props.name}</span>
                  </td>
                  <td className="status">
                    <span
                      className={
                        survivor.props.infected
                          ? 'status-infected'
                          : 'status-healthy'
                      }
                    >
                      {survivor.props.infected ? 'Infected' : 'Healthy'}
                    </span>
                  </td>
                  <td>
                    {new Date(survivor.props.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-list-survivors">
          <div>
            Showing <strong>1</strong> to <strong>{survivors.length}</strong> of{' '}
            <strong>100</strong> Results
          </div>
          <div className="buttons">
            <button
              className="pagination-button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button className="pagination-button" onClick={handleNextPage}>
              Next
            </button>
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
