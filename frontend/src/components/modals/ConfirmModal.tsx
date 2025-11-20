// src/components/modals/ConfirmModal.tsx
import { AlertCircle } from "lucide-react";
import Modal from "../common/Modal";
import Button from "../common/Button";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  variant = "warning",
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <div className="space-y-4">
        <div className="flex gap-3">
          <AlertCircle
            className={
              variant === "danger"
                ? "text-red-600"
                : variant === "warning"
                ? "text-yellow-600"
                : "text-blue-600"
            }
            size={24}
          />
          <p className="text-gray-700">{message}</p>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
