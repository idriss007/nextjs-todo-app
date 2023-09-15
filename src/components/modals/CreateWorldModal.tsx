import * as React from "react";
import Modal from "@mui/material/Modal";
import CreateWorldForm from "../forms/CreateWorldForm";

type CreateWorldModalProps = {
  open: any;
  handleClose: any;
};

const CreateWorldModal = (props: CreateWorldModalProps) => {
  const { open, handleClose } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] md:w-96 bg-white p-5">
        <CreateWorldForm margin="mb-5" handleClose={handleClose} />
      </div>
    </Modal>
  );
};

export default CreateWorldModal;
