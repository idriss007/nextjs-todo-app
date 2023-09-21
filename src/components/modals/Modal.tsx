import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type CreateWorldModalProps = {
  children: any;
  open: boolean;
  setOpen: any;
  title?: string;
};

function Modal(props: CreateWorldModalProps) {
  const { children, open, setOpen, title } = props;

  function closeModal() {
    setOpen(false);
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <div className="fixed inset-0 overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="rounded-md w-full max-w-md transform overflow-hidden p-6 text-left align-middle bg-white">
              {title && (
                <p className="mb-5 text-center text-lg text-black">{title}</p>
              )}
              {children}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
