import { useState } from 'react'
import './modal-request-item.css'
import { X } from 'lucide-react'

export default function ModalRequestItem({
  isOpen,
  onClose,
  survivor,
}: {
  isOpen: boolean
  onClose: () => void
  survivor: any
}) {
  const [selectedItem, setSelectedItem] = useState('')

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica para lidar com a solicitação do item
    console.log(`Requesting ${selectedItem} from ${survivor.name}`)
    onClose() // Fecha o modal após o envio do formulário
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
        <h2>Request Item</h2>
        <h3>From {survivor?.name}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="item">Choose Item</label>
            <select
              id="item"
              name="item"
              value={selectedItem}
              onChange={handleItemChange}
              required
            >
              <option value="">Select</option>
              {/* Aqui você pode listar os itens disponíveis dinamicamente */}
              <option value="First Aid Kit">First Aid Kit</option>
              <option value="Bottled Water">Bottled Water</option>
              <option value="Canned Food">Canned Food</option>
              <option value="Tent">Tent</option>
              <option value="Radio">Radio</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Request Item
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
