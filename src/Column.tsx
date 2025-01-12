import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { useDroppable } from "@dnd-kit/core";

type ColumnProps = {
  column: {
    id: string;
    items: { id: string; type: string; label: string }[];
  };
};

function Column({ column }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <SortableContext
      id={column.id}
      items={column.items}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className="flex-1 rounded-lg bg-gray-200 p-4 min-h-[200px]"
      >
        {column.items.map((item) => (
          <SortableItem key={item.id} id={item.id} label={item.label} />
        ))}
        {column.items.length === 0 && (
          <p className="text-neutral-500">Drag elements here</p>
        )}
      </div>
    </SortableContext>
  );
}

export default Column;
