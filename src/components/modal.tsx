import { FC, PropsWithChildren } from "react";
import Portal from "./portal";

interface IModalProps {
  isOpen: boolean;
}

const Modal: FC<PropsWithChildren<IModalProps>> = ({
  children,
  isOpen,
}) => {
  return (
    <>
      {isOpen && (
        <Portal>
          <div tabIndex={-1} className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur">
            {children}
          </div>
        </Portal>
      )}
    </>
  )
}

export default Modal