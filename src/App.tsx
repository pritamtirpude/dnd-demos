import { useState } from "react";
import { Column as ColumnType, Task } from "./types";
import Column from "./Column";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  UniqueIdentifier,
} from "@dnd-kit/core";
import Draggable from "./Draggable";
import DropZone from "./DropZone";
import FormElement from "./FormElement";
import { arrayMove } from "@dnd-kit/sortable";
import Row from "./Row";

type InputElement = {
  id: string;
  type: string;
  label: string;
};

const ELEMENTS = [
  { id: "text", type: "text", label: "Text Input" },
  { id: "email", type: "email", label: "Email Input" },
];

type ColumnData = {
  id: UniqueIdentifier;
  items: InputElement[];
};

type RowData = {
  id: UniqueIdentifier;
  columns: ColumnData[];
};

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Research Project",
    description: "Gather requirements and create initial documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create component library and design tokens",
    status: "TODO",
  },
  {
    id: "3",
    title: "API Integration",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Testing",
    description: "Write unit tests for core functionality",
    status: "DONE",
  },
];

function App() {
  // const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  // const [formElements, setFormElements] = useState<InputElement[]>([]);
  const [rows, setRows] = useState<RowData[]>([
    {
      id: "row-1",
      columns: [
        { id: "column-1-1", items: [] },
        { id: "column-1-2", items: [] },
      ],
    },
    {
      id: "row-2",
      columns: [
        { id: "column-2-1", items: [] },
        { id: "column-2-2", items: [] },
      ],
    },
  ]);

  const [draggingItem, setDraggingItem] = useState<InputElement | null>(null);

  // function handleDragEnd(event: DragEndEvent) {
  //   const { active, over } = event;

  //   if (!over) return;

  //   const taskId = active.id as string;
  //   const newStatus = over.id as Task["status"];

  //   setTasks(() =>
  //     tasks.map((task) =>
  //       task.id === taskId ? { ...task, status: newStatus } : task
  //     )
  //   );
  // }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setDraggingItem(null);
      return;
    }

    const [fromRowId, fromColumnId] = active.data.current?.container || [];
    const [toRowId, toColumnId] = over.data.current?.container || [];

    if (fromRowId === toRowId && fromColumnId === toColumnId) {
      // Sort within the same column
      setRows((prev) =>
        prev.map((row) =>
          row.id === fromRowId
            ? {
                ...row,
                columns: row.columns.map((column) =>
                  column.id === fromColumnId
                    ? {
                        ...column,
                        items: arrayMove(
                          column.items,
                          column.items.findIndex(
                            (item) => item.id === active.id
                          ),
                          column.items.findIndex((item) => item.id === over.id)
                        ),
                      }
                    : column
                ),
              }
            : row
        )
      );
    } else {
      // Move between columns
      setRows((prev) =>
        prev.map((row) =>
          row.id === fromRowId || row.id === toRowId
            ? {
                ...row,
                columns: row.columns.map((column) =>
                  column.id === fromColumnId
                    ? {
                        ...column,
                        items: column.items.filter(
                          (item) => item.id !== active.id
                        ),
                      }
                    : column.id === toColumnId
                    ? {
                        ...column,
                        items: [
                          ...column.items,
                          prev
                            .find((r) => r.id === fromRowId)
                            ?.columns.find((c) => c.id === fromColumnId)
                            ?.items.find((item) => item.id === active.id)!,
                        ],
                      }
                    : column
                ),
              }
            : row
        )
      );
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={(event) => {
        const [fromRowId, fromColumnId] =
          event.active.data.current?.container || [];
        const draggedItem = rows
          .find((row) => row.id === fromRowId)
          ?.columns.find((column) => column.id === fromColumnId)
          ?.items.find((item) => item.id === event.active.id);

        setDraggingItem(draggedItem || null);
      }}
    >
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-neutral-800 p-4">
          <h2 className="mb-4 text-white">Draggable Elements</h2>
          {ELEMENTS.map((el) => (
            <Draggable key={el.id} id={el.id}>
              {el.label}
            </Draggable>
          ))}
        </div>

        {/* Rows */}
        <div className="flex-1 flex flex-col gap-4 p-4">
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </div>
      </div>

      <DragOverlay>
        {draggingItem ? (
          <div className="cursor-grab rounded bg-gray-500 p-2 text-white shadow">
            {draggingItem.label}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
