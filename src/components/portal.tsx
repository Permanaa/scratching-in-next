"use client"

import { FC, PropsWithChildren, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Portal: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [tempNode, setTempNode] = useState<HTMLElement | null>(null)
  const portal = useRef<HTMLDivElement | null>(null)

  const [, forceUpdate] = useState({})
  useEffect(() => forceUpdate({}), [])

  useLayoutEffect(() => {
    if (!tempNode) return

    const doc = tempNode.ownerDocument

    portal.current = doc.createElement("div")
    portal.current.className = "portal"

    doc.body.appendChild(portal.current)
    forceUpdate({})

    const portalNode = portal.current

    return () => {
      if (doc.body.contains(portalNode)) {
        doc.body.removeChild(portalNode)
      }
    }
  }, [tempNode])


  return portal.current ? createPortal(
    children,
    portal.current
  ) : (
    <span
      ref={el => {
        if (el) setTempNode(el)
      }}
    />
  )
}

export default Portal