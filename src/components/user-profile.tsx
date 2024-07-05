import useOutsideClick from "@/hooks/useOutsideClick";
import Link from "next/link";
import { useRef, useState } from "react";

export function UserProfile({ horizontal = false }: { horizontal?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const avatarRef = useRef(null);

  function handleClose() {
    if (isOpen) {
      setIsOpen(false);
    }
  }

  const positionStyle = horizontal
    ? "left-12 bottom-0 flex-col-reverse"
    : "right-0 top-11 flex-col";

  useOutsideClick({ ref: avatarRef, action: handleClose });

  return (
    <div className="relative" ref={avatarRef}>
      <button
        type="button"
        onClick={() => setIsOpen((x) => !x)}
        className="size-10 rounded-full bg-neutral-200 cursor-pointer overflow-hidden"
      ></button>

      {isOpen && (
        <div
          className={`absolute z-10 bg-white divide-y divide-gray-100 flex rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${positionStyle}`}
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">name@flowbite.com</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <Link href={"/admin"} onClick={handleClose}>
              <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left">
                Admin
              </li>
            </Link>
            <li>
              <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left">
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
