import Modal from "../modals/Modal";
import Button from "../buttons/Button";
import { confirmable } from "react-confirm";
import en from "@/lang/en.json";

type ConfirmationProps = {
  show?: boolean;
  confirmation: string;
  proceed?: (status: boolean) => void;
};

const ConfirmDialog = confirmable((props: ConfirmationProps) => {
  const { show = false, confirmation, proceed = () => {} } = props;

  return (
    <Modal open={show} setOpen={() => proceed(false)}>
      <p className="mb-5 text-center text-xl text-black">{confirmation}</p>
      <div className="flex justify-center gap-2">
        <Button
          bgColor="bg-black"
          textColor="text-white"
          hover="hover:bg-neutral-700"
          width="min-w-[80px]"
          onClick={() => proceed(false)}
        >
          {en._confirmation.cancel}
        </Button>
        <Button
          bgColor="bg-red-400 hover:bg-red-600"
          hover=""
          textColor="text-white"
          width="min-w-[80px]"
          onClick={() => proceed(true)}
        >
          {en._confirmation.ok}
        </Button>
      </div>
    </Modal>
  );
});

export default ConfirmDialog;
