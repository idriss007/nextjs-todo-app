import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineDragIndicator } from "react-icons/md";

function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const selectedItemsStyle = {
    position: props.activeItemId === props.id ? "relative" : undefined,
    zIndex: props.activeItemId === props.id ? "10" : undefined,
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
    ...selectedItemsStyle,
  };

  return (
    //@ts-ignore
    <div ref={setNodeRef} style={style}>
      <div className="flex">
        <button {...listeners} {...attributes}>
          <MdOutlineDragIndicator />
        </button>
        {props.value}
      </div>
    </div>
  );
}

export default SortableItem;
