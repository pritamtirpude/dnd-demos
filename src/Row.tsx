import React from "react";
import Column from "./Column";

type RowProps = {
  row: {
    id: string;
    columns: {
      id: string;
      items: { id: string; type: string; label: string }[];
    }[];
  };
};

function Row({ row }: RowProps) {
  return (
    <div className="flex gap-4">
      {row.columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
}

export default Row;
