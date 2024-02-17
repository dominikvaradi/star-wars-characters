"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { PiCaretDown, PiCheck } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import type { DropdownItem } from "@/app/_types/dropdownItem";

type TDropdownProps = {
    items: DropdownItem[];
    label: string;
    onItemSelected: (value: string) => void;
    onItemUnselected: (value: string) => void;
};

const Dropdown: React.FC<TDropdownProps> = ({ items: initialItems, label, onItemSelected, onItemUnselected }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [items, setItems] = useState<(DropdownItem & { selected: boolean })[]>(
        initialItems.map((item) => ({ ...item, selected: false })),
    );

    const windowClickEventListener = useCallback((event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpen(false);
            window.removeEventListener("click", windowClickEventListener);
        }
    }, []);

    useEffect(() => {
        return () => {
            window.removeEventListener("click", windowClickEventListener);
        };
    }, [windowClickEventListener]);

    const handleDropdownButtonClick = () => {
        setOpen((prev) => {
            if (!prev) {
                window.addEventListener("click", windowClickEventListener);
            } else {
                window.removeEventListener("click", windowClickEventListener);
            }

            return !prev;
        });
    };

    const handleItemClick = (value: string, newSelectedState: boolean) => {
        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.value === value) {
                    return { ...item, selected: newSelectedState };
                }

                return item;
            }),
        );

        if (newSelectedState) {
            onItemSelected(value);
        } else {
            onItemUnselected(value);
        }
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button
                className="flex items-center gap-1 rounded-lg border border-slate-400 p-2 text-sm text-slate-400 transition-colors hover:border-violet-500 hover:text-violet-500 focus:border-violet-900 focus:text-violet-900 focus:outline-none focus:ring-0 active:border-violet-500 active:text-violet-500 md:p-4 md:text-base"
                type="button"
                onClick={handleDropdownButtonClick}
            >
                <span>{label}</span>
                <PiCaretDown className={clsx("h-5 w-5 transition md:h-6 md:w-6", open && "rotate-180")} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="dropdown-items"
                        className="scrollbar-hide absolute inset-x-0 top-full z-50 mt-2 max-h-[50vh] origin-top overflow-y-auto rounded-lg bg-white p-2 shadow md:p-4"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <ul className="space-y-2">
                            {items.map(({ value, label, selected }) => (
                                <li
                                    key={value}
                                    className="group flex cursor-pointer items-center gap-2"
                                    onClick={() => handleItemClick(value, !selected)}
                                >
                                    <div
                                        className={clsx(
                                            "flex h-6 w-6 items-center justify-center rounded border transition-colors",
                                            selected
                                                ? "border-violet-500 bg-violet-500"
                                                : "border-slate-500 group-hover:border-violet-500",
                                        )}
                                    >
                                        <PiCheck
                                            className={clsx(
                                                "h-6 w-6 text-white transition-transform",
                                                selected ? "scale-100" : "scale-0",
                                            )}
                                        />
                                    </div>
                                    <p className="text-slate-900 group-hover:text-violet-500">{label}</p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;
