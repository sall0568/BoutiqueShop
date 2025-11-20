// src/components/forms/SaleForm.tsx
// Similaire à SaleModal, simplifiée
import Input from '../common/Input';
import Button from '../common/Button';

interface SaleFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function SaleForm({ onSubmit, isLoading }: SaleFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Panier vide" disabled />
      <Button type="submit" isLoading={isLoading} className="w-full">
        Enregistrer
      </Button>
    </form>
  );
}
