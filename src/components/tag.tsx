import { ReactNode } from "react";

export interface ITagProps {
  children: ReactNode;
}

export default function Tag({ children }: ITagProps) {
  return (
    <div className="px-3 rounded-full bg-gradient-to-b from-primary to-primary/80 text-white text-sm">
      {children}
    </div>
  );
}
