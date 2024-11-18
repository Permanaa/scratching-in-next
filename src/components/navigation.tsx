"use client";

import Link from "next/link";
import StackIcon from "@/icons/stack";
import Stack3DIcon from "@/icons/stack-3d";
import { usePathname } from "next/navigation";
import DocumentArrowUp from "@/icons/document-arrow-up";
import ArrowDownOnSquare from "@/icons/arrow-down-on-square";

const menu = [
  {
    title: "Kanban Board",
    slug: "/drag-n-drop",
    icon: StackIcon,
  },
  {
    title: "Sortable List",
    slug: "/drag-n-drop/sortable-list",
    icon: Stack3DIcon,
  },
  {
    title: "File",
    slug: "/drag-n-drop/file",
    icon: DocumentArrowUp,
  },
  {
    title: "Multi-Select",
    slug: "/drag-n-drop/multi-select",
    icon: ArrowDownOnSquare,
  },
];

export default function Navigation() {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col gap-2">
      {menu.map((item) => {
        const isActive = item.slug === pathname;
        return (
          <li key={item.slug}>
            <Link
              href={item.slug}
              className={`flex gap-2 px-4 py-3 rounded-lg font-semibold ${
                isActive
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "hover:bg-primary/20"
              }`}
            >
              <item.icon className="w-6" />
              <p>{item.title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
