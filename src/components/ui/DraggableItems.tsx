import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import SortableItem from "./SortableItem";
import { TodoItem as TodoItemType } from "@/types";
import TodoItem from "./TodoItem";
import { useRouter } from "next/router";

import { useAtom } from "jotai";
import { todosAtom } from "@/helpers";

function DraggableItems() {
  const router = useRouter();
  const spaceName = router.query.id! as string;

  const [activeItemId, setActiveItemId] = useState(null);

  const [todos, setTodos] = useAtom(todosAtom(spaceName));

  function handleDragEnd(event: any) {
    const { active, over } = event;

    setActiveItemId(null);

    if (active.id !== over.id) {
      setTodos((prevValue: TodoItemType[]) => {
        const activeIndex = prevValue.findIndex((td) => td.id === active.id);
        const overIndex = prevValue.findIndex((td) => td.id === over.id);

        return arrayMove(prevValue, activeIndex, overIndex);
      });
    }
  }

  function handleDragStart(event: any) {
    const { active } = event;
    setActiveItemId(active.id);
  }

  const handleEdit = (editedTodo: TodoItemType) => {
    setTodos((prevValue) => {
      return prevValue.map((td) => {
        if (td.id === editedTodo.id) {
          return editedTodo;
        } else {
          return td;
        }
      });
    });
  };

  const handleDelete = (id: string) => {
    setTodos((prevValue) => {
      const updatedTodos = prevValue.filter((td) => {
        return td.id !== id;
      });
      return updatedTodos;
    });
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="flex flex-col gap-1">
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          {todos.map((td) => (
            <SortableItem
              key={td.id}
              id={td.id}
              handle={true}
              activeItemId={activeItemId}
              value={
                <TodoItem
                  key={td.id}
                  todo={td}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              }
            />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeItemId ? (
            <TodoItem
              key={activeItemId}
              todo={todos.find((todo) => todo.id === activeItemId)!}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

export default DraggableItems;
