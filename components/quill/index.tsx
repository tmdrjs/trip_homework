"use client";

import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; //

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", { background: [] }],
      [{ align: [] }, { list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div style={{ height: "400px" }}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        style={{ height: "350px" }}
      />
    </div>
  );
}
