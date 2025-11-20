// src/components/modals/ProductModal.tsx
import { useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { Product } from "../../types";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  product?: Product;
  isLoading?: boolean;
}

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  product,
  isLoading = false,
}: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    sku: product?.sku || "",
    barcode: product?.barcode || "",
    price: product?.price || 0,
    cost: product?.cost || 0,
    quantity: product?.quantity || 0,
    minQuantity: product?.minQuantity || 0,
    unit: product?.unit || "pièce",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "cost" ||
        name === "quantity" ||
        name === "minQuantity"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? "Modifier le produit" : "Ajouter un produit"}
      className="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nom du produit"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="SKU"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
          />
          <Input
            label="Code-barres"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Prix de vente"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
          <Input
            label="Prix d'achat"
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            step="0.01"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Quantité"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          <Input
            label="Qté minimale"
            type="number"
            name="minQuantity"
            value={formData.minQuantity}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Unité"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
        />

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {product ? "Mettre à jour" : "Créer"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
