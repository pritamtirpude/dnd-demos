import React from "react";
import { useDroppable } from "@dnd-kit/core";

type DropZoneProps = {
  children: React.ReactNode;
};

function DropZone({ children }: DropZoneProps) {
  const { setNodeRef } = useDroppable({ id: "dropzone" });

  return (
    <div
      ref={setNodeRef}
      className="h-full rounded-lg border-2 border-dashed border-neutral-300 p-4"
    >
      {children && children.length > 0 ? (
        children
      ) : (
        <p className="text-neutral-500">
          Drag elements here to build your form
        </p>
      )}
    </div>
  );
}

export default DropZone;
