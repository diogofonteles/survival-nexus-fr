import { useState } from 'react'
import '@/presentation/components/modal-request-item/modal-request-item.css'
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
    console.log(`Requesting ${selectedItem} from ${survivor.name}`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay-list-item">
      <div className="modal-container-list-item">
        <button
          title="close"
          type="button"
          className="modal-close-button-list-item"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2>Request Item</h2>
        <h3>From {survivor?.name}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group-list-item">
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
          <div className="modal-actions-list-item">
            <button
              type="button"
              className="cancel-button-list-item"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button-list-item">
              Request Item
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
