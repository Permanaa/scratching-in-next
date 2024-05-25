"use client"

// import Button from "@/components/button";
import { useState, DragEvent } from "react";

const dataSample = [
  {
    id: "1",
    title: "Naruto",
  },
  {
    id: "2",
    title: "One Piece",
  },
  {
    id: "3",
    title: "Attack on Titan",
  },
]

interface IDragInfo {
  index: number | null;
  id: string;
}

export default function SortableList() {
  const [data, setData] = useState(dataSample)
  const [dragInfo, setDragInfo] = useState<IDragInfo>({ index: null, id: '' })
  const [hoverId, setHoverId] = useState<string>('')

  const onDragOver = (e: DragEvent<HTMLDivElement>, hoverIdParam: string) => {
    e.preventDefault()
    if (hoverId !== hoverIdParam) {
      setHoverId(hoverIdParam)
    }
  }

  const onDragEnd = () => {
    setHoverId('')
    setDragInfo({ index: null, id: '' })
  }

  const onDragStart = (cardId: string) => {
    const cardIndex = data.findIndex(card => card.id === cardId)
    setDragInfo({
      index: cardIndex,
      id: cardId,
    })
  }

  const onDrop = (e: DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault()
    const cardIndex = data.findIndex(card => card.id === dragInfo.id)
    const targetIndex = data.findIndex(card => card.id === targetId)
    const newData = [...data]
    newData.splice(cardIndex, 1)
    newData.splice(targetIndex, 0, {...data[cardIndex]})
    setData(newData)
  }

  return (
    <main className="py-4 pr-4">
      <div className="flex justify-between mx-6">
        <h2 className="font-bold text-4xl mb-8">Sortable List</h2>
        {/* <Button>Create</Button> */}
      </div>

      <div className="mx-6">
        <p className="mb-4">Rank your anime list</p>
        <ul className="flex flex-col gap-2 max-w-lg">
          {data.map((item, index) => (
            <li key={item.id}>
              {/* <hr className={`mb-1 ${item.id === hoverId && typeof dragInfo.index === 'number' && dragInfo.index > index ? 'border-main-400' : 'border-white'}`} /> */}
              <div className="flex items-center">
                <div className="w-[50px] p-4 flex justify-center bg-main-500 text-white font-bold rounded-l-lg">
                  {index + 1}
                </div>
                <div
                  className="flex-1 font-bold border p-4 rounded-r-lg"
                  draggable
                  onDragOver={(e) => onDragOver(e, item.id)}
                  onDragStart={() => onDragStart(item.id)}
                  onDrop={(e) => onDrop(e, item.id)}
                  onDragEnd={onDragEnd}
                >
                  {item.title}
                </div>
              </div>
              {/* <hr className={`mb-1 ${item.id === hoverId && typeof dragInfo.index === 'number' && dragInfo.index < index ? 'border-main-400' : 'border-white'}`} /> */}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}