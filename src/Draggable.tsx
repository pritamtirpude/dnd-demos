import React from "react";
import { useDraggable } from "@dnd-kit/core";

type DraggableProps = {
  id: string;
  children: React.ReactNode;
};

function Draggable({ id, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="mb-2 cursor-grab rounded bg-neutral-700 p-2 text-neutral-100"
    >
      {children}
    </div>
  );
}

export default Draggable;
