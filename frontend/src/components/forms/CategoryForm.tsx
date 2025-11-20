// src/components/forms/CategoryForm.tsx
import Input from "../common/Input";
import Button from "../common/Button";
import { useForm } from "../../hooks/useForm";

interface CategoryFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function CategoryForm({
  onSubmit,
  isLoading,
}: CategoryFormProps) {
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nom de la catégorie"
        name="name"
        value={values.name}
        onChange={handleChange}
        required
      />

      <Input
        label="Description"
        name="description"
        value={values.description}
        onChange={handleChange}
      />

      <Button type="submit" isLoading={isLoading} className="w-full">
        Créer la catégorie
      </Button>
    </form>
  );
}
