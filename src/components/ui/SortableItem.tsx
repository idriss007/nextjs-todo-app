import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRef } from "react";
import { MdOutlineDragIndicator } from "react-icons/md";

function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const selectedItemsStyle = {
    position: props.activeItemId === props.id ? "relative" : undefined,
    zIndex: props.activeItemId === props.id ? "10" : undefined,
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    touchAction: "none",
    ...selectedItemsStyle,
  };

  return (
    //@ts-ignore
    <div className="flex gap-1" ref={setNodeRef} style={style}>
      <button {...listeners} {...attributes}>
        <MdOutlineDragIndicator size={22} />
      </button>
      {props.value}
    </div>
  );
}

export default SortableItem;
