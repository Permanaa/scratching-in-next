"use client"

import { HTMLAttributes, useState } from "react";
import Tag from "./tag";
import EllipsisVertical from "@/icons/ellipsis-vertical";
import Trash from "@/icons/trash";

interface IKanbanCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  tags?: string[];
  onDelete?: () => void;
}

export default function KanbanCard({
  title,
  description,
  tags,
  onDragStart,
  className,
  onDelete
}: IKanbanCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={"rounded-lg p-4 bg-main-50 cursor-grab relative " + className}
    >
      {!!tags?.length && (
        <div className="mb-2 flex gap-2">
          {tags?.map(tagItem => (
            <Tag key={tagItem}>{tagItem}</Tag>
          ))}
        </div>
      )}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <button onClick={() => setIsOpen(prev => !prev)}>
            <EllipsisVertical />
          </button>
          <ul hidden={!isOpen} className="absolute z-20 -right-1 bg-white border py-2 rounded-lg">
            <li
              onClick={onDelete}
              className="hover:bg-main-50 px-4 py-2 cursor-pointer flex gap-2 text-red-600"
            >
              <Trash className="w-5" /> Delete
            </li>
          </ul>
        </div>
      </div>
      <p className="font-semibold mb-1">{title}</p>
      <p className="text-sm">{description}</p>
    </div>
  )
}