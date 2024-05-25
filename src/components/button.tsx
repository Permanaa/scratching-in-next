"use client"

import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={"rounded-lg px-4 py-2 text-main-50 bg-gradient-to-br from-main-400 to-main-500 h-fit w-fit hover:to-main-600 focus:ring-4 focus:ring-main-200 focus:outline-none " + props.className}
    >
      {props.children}
    </button>
  )
}