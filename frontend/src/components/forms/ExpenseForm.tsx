// src/components/forms/ExpenseForm.tsx
import Input from '../common/Input';
import Button from '../common/Button';
import { useForm } from '../../hooks/useForm';

interface ExpenseFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function ExpenseForm({ onSubmit, isLoading }: ExpenseFormProps) {
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      description: '',
      amount: 0,
      category: 'Autre',
    },
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Description"
        name="description"
        value={values.description}
        onChange={handleChange}
        required
      />

      <Input
        label="Montant"
        type="number"
        name="amount"
        value={values.amount}
        onChange={handleChange}
        step="0.01"
        required
      />

      <select
        name="category"
        value={values.category}
        onChange={(e) => handleChange(e as any)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="Salaires">Salaires</option>
        <option value="Loyer">Loyer</option>
        <option value="Électricité">Électricité</option>
        <option value="Autres">Autres</option>
      </select>

      <Button type="submit" isLoading={isLoading} className="w-full">
        Créer la dépense
      </Button>
    </form>
  );
}
