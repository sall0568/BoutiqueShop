// src/components/modals/SaleModal.tsx
import { useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { Plus, Trash2 } from "lucide-react";

interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface SaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function SaleModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: SaleModalProps) {
  const [items, setItems] = useState<SaleItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const discount = 0;
    const tax = 0;

    onSubmit({
      items,
      discount,
      tax,
      paymentMethod,
      customerName,
    });
  };

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nouvelle vente"
      className="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nom du client"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Optionnel"
        />

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="CASH">Espèces</option>
          <option value="CARD">Carte</option>
          <option value="MOBILE_MONEY">Mobile Money</option>
        </select>

        {/* Items list */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-gray-50 rounded"
            >
              <div className="flex-1">
                <p className="font-medium text-sm">{item.productName}</p>
                <p className="text-xs text-gray-500">
                  {item.quantity} x {item.unitPrice} XOF
                </p>
              </div>
              <p className="font-medium">
                {(item.quantity * item.unitPrice).toLocaleString()}
              </p>
              <button
                type="button"
                onClick={() => setItems(items.filter((_, i) => i !== index))}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="p-3 bg-blue-50 rounded">
          <p className="text-lg font-bold text-blue-900">
            Total: {total.toLocaleString()} XOF
          </p>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={items.length === 0}
          >
            <Plus size={18} />
            Enregistrer la vente
          </Button>
        </div>
      </form>
    </Modal>
  );
}
