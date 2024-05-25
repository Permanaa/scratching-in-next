"use client"

import Button from "@/components/button";
import Trash from "@/icons/trash"
import { DragEvent, FormEvent, useState } from "react"
import { v4 as uuidv4 } from "uuid";

interface IData {
  id: string;
  title: string;
}

const initialData: IData[] = [
  {
    id: "1",
    title: "1st",
  },
  {
    id: "2",
    title: "2nd",
  },
  {
    id: "3",
    title: "3rd",
  },
  {
    id: "4",
    title: "4th",
  },
  {
    id: "5",
    title: "5th",
  },
]

export default function MultipleDrag() {
  const [data, setData] = useState<IData[]>(initialData)
  const [selected, setSelected] = useState<string[]>([])

  const onChangeSelect = (id: string) => {
    if (selected.includes(id)) {
      const newSelected = selected.filter(item => item !== id)
      setSelected(newSelected)
    } else {
      setSelected(prev => ([...prev, id]))
    }
  }

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const onDrop = () => {
    const newData = data.filter(item => !selected.includes(item.id))
    setData(newData)
    setSelected([])
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title } = e.currentTarget as typeof e.currentTarget & { title: { value: string } }
    if (title?.value) {
      const newData = {
        id: uuidv4(),
        title: title?.value
      }
      setData(prev => ([...prev, newData]))
    }
    e.currentTarget.reset()
  }

  return (
    <main className="py-4 pr-4">
      <h2 className="mx-6 font-bold text-4xl mb-8">Multi-Select</h2>

      <div className="mx-6 mb-6">
        <h3 className="font-bold mb-2">Create Item</h3>
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            type="text"
            name="title"
            className="border border-main-200 rounded-lg focus:ring-main-500 focus:border-main-500 block w-96 p-2"
          />
          <Button type="submit">Create</Button>
        </form>
      </div>

      <div className="mx-6 grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          {data.map(item => (
            <div
              key={item.id}
              draggable={selected.includes(item.id)}
              className="flex gap-2 py-2 px-3 rounded-lg bg-gray-100"
            >
              <input type="checkbox" onChange={() => onChangeSelect(item.id)} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
        <div>
          <div
            onDragOver={onDragOver}
            onDrop={onDrop}
            className="flex flex-col gap-2 items-center justify-center text-center bg-red-50 rounded-lg text-red-700 h-36 border-2 border-dashed border-red-700"
          >
            <Trash className="w-10" strokeWidth={0.8} />
            <p>Drag here to delete item(s)</p>
          </div>
        </div>
      </div>
    </main>
  )
}