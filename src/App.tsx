import { useState } from "react";
import { Column as ColumnType, Task } from "./types";
import Column from "./Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Draggable from "./Draggable";
import DropZone from "./DropZone";
import FormElement from "./FormElement";

type InputElement = {
  id: string;
  type: string;
  label: string;
};

const ELEMENTS = [
  { id: "text", type: "text", label: "Text Input" },
  { id: "email", type: "email", label: "Email Input" },
];

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
  const [formElements, setFormElements] = useState<InputElement[]>([]);

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
    if (!over) return;

    const element = ELEMENTS.find((el) => el.id === active.id);
    if (element) {
      setFormElements((prev) => [
        ...prev,
        {
          id: `${element.id}-${Date.now()}`,
          type: element.type,
          label: element.label,
        },
      ]);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-neutral-800 p-4">
          <h2 className="mb-4 text-neutral-100">Drag Elements</h2>
          {ELEMENTS.map((el) => (
            <Draggable key={el.id} id={el.id}>
              {el.label}
            </Draggable>
          ))}
        </div>

        {/* Drop Zone */}
        <div className="flex-1 bg-neutral-100 p-4">
          <DropZone>
            {formElements.map((el) => (
              <FormElement key={el.id} type={el.type} label={el.label} />
            ))}
          </DropZone>
        </div>
      </div>
    </DndContext>
  );
}

export default App;
