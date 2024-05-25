import { ReactNode } from "react"

export interface ITagProps {
  children: ReactNode
}

export default function Tag({ children }: ITagProps) {
  return (
    <div className="px-3 rounded-full bg-gradient-to-b from-main-500 to-main-400 text-main-50 text-sm">
      {children}
    </div>
  )
}