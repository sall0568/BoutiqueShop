// src/components/forms/ProductForm.tsx
import Input from "../common/Input";
import Button from "../common/Button";
import { useForm } from "../../hooks/useForm";

interface ProductFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function ProductForm({ onSubmit, isLoading }: ProductFormProps) {
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: "",
      price: 0,
      cost: 0,
      quantity: 0,
    },
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nom du produit"
        name="name"
        value={values.name}
        onChange={handleChange}
        required
      />

      <Input
        label="Prix de vente"
        type="number"
        name="price"
        value={values.price}
        onChange={handleChange}
        step="0.01"
        required
      />

      <Input
        label="Prix d'achat"
        type="number"
        name="cost"
        value={values.cost}
        onChange={handleChange}
        step="0.01"
      />

      <Input
        label="Quantité"
        type="number"
        name="quantity"
        value={values.quantity}
        onChange={handleChange}
      />

      <Button type="submit" isLoading={isLoading} className="w-full">
        Créer le produit
      </Button>
    </form>
  );
}
