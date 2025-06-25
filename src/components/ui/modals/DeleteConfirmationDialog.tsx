import {
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Loader,
  Portal,
} from "@chakra-ui/react";
import { HiTrash } from "react-icons/hi";
import { useFetcher } from "react-router";

interface DeleteConfirmationDialogProps<T> {
  title: string;
  action: string;
}

export function DeleteConfirmationDialog<T>({
  action,
  title,
}: DeleteConfirmationDialogProps<T>) {
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton variant={"subtle"}>
          <HiTrash />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              Are you sure you want to delete this item?
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <fetcher.Form method="delete" action={action}>
                <Button type="submit" disabled={busy}>
                  {busy ? <Loader /> : "Save"}
                </Button>
              </fetcher.Form>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
