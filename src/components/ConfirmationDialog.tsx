import { Button, ButtonProps } from "@/components/Button";
import { Dialog, DialogActions, DialogProps } from "@/components/Dialog";

export function ConfirmationDialog(
  props: DialogProps & {
    confirmLabel: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmButtonProps?: ButtonProps;
  },
) {
  const {
    confirmLabel,
    onConfirm,
    onCancel,
    confirmButtonProps,
    ...dialogProps
  } = props;
  return (
    <Dialog {...dialogProps}>
      {props.children}
      <DialogActions>
        <Button
          variant="secondary"
          onClick={() => {
            props.onClose?.(true);
            onCancel?.();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          {...confirmButtonProps}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
