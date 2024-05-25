"use client"

import { useState, DragEvent } from "react";
import DocumentArrowUp from "@/icons/document-arrow-up";

export default function File() {
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!isDragOver) {
      setIsDragOver(true)
    }
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (item.kind) {
          const file = item.getAsFile()
          if (file) {
            setFiles(prev => ([...prev, file]))
          }
        }
      })
    } else {
      [...e.dataTransfer.files].forEach((file) => {
        setFiles(prev => ([...prev, file]))
      })
    }
  }

  return (
    <main className="py-4 pr-4">
      <h2 className="font-bold text-4xl mb-8 mx-6">File</h2>

      <div className="mx-6 grid grid-cols-2 gap-6">
        <div
          onDragOver={onDragOver}
          onDrop={onDrop}
          className="flex flex-col gap-2 text-center items-center justify-center bg-main-50 border-main-700 border-2 border-dashed rounded-lg p-6 h-36 text-main-700"
        >
          <DocumentArrowUp strokeWidth={0.8} className="w-12" />
          <p>Drag one or more files here.</p>
        </div>
        <div className="flex flex-col gap-2">
          {files.map((file, i) => (
            <div key={file.name + i} className="rounded-lg py-2 px-3 bg-gray-100 whitespace-nowrap overflow-hidden text-ellipsis">
              {file.name}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}