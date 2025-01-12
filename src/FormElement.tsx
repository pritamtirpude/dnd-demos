import React from "react";

type FormElementProps = {
  type: string;
  label: string;
};

function FormElement({ type, label }: FormElementProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-neutral-700">{label}</label>
      <input
        type={type}
        className="w-full rounded border border-neutral-300 p-2"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}

export default FormElement;
