"use client";

import React, { useState } from "react";
import { PiMagnifyingGlassLight, PiX } from "react-icons/pi";
import { clsx } from "clsx";

type TSearchboxProps = {
    className?: string;
    onSubmit: (searchValue: string) => void;
};

const SearchBox: React.FC<TSearchboxProps> = ({ className, onSubmit }) => {
    const [fieldValue, setFieldValue] = useState<string>("");

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        onSubmit(fieldValue.trim());
    };

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(event.target.value);
    };

    const handleClearFieldButtonClick = () => {
        setFieldValue("");
        onSubmit("");
    };

    return (
        <form className={clsx("flex", className)} onSubmit={handleFormSubmit}>
            <div className="relative flex-1">
                <input
                    className="peer block h-full w-full appearance-none overflow-hidden rounded-l-lg border border-r-0 border-slate-400 pl-10 pr-7 text-sm transition-colors placeholder:text-slate-400 hover:border-violet-300 focus:border-violet-500 focus:outline-none focus:ring-0 md:pl-14 md:pr-10 md:text-base"
                    id="search"
                    placeholder="Search by name"
                    value={fieldValue}
                    onChange={handleFieldChange}
                />
                <div className="absolute inset-y-0 left-2.5 flex items-center text-slate-400 peer-hover:text-violet-300 peer-focus:text-violet-500 md:left-4">
                    <PiMagnifyingGlassLight className="h-5 w-5 transition-colors md:h-6 md:w-6" />
                </div>
                <button
                    className={clsx(
                        "absolute inset-y-0 right-0 flex items-center px-1 text-slate-400 transition hover:text-violet-500 focus:text-violet-900 focus:outline-none focus:ring-0 active:text-violet-500 md:px-2",
                        fieldValue ? "scale-100" : "pointer-events-none scale-0",
                    )}
                    type="button"
                    onClick={handleClearFieldButtonClick}
                    disabled={!fieldValue}
                >
                    <PiX className="h-5 w-5 md:h-6 md:w-6" />
                </button>
            </div>
            <button
                className="flex flex-none items-center justify-center rounded-r-lg border border-violet-500 bg-violet-500 p-2 text-sm text-white transition-colors hover:border-violet-600 hover:bg-violet-600 focus:border-violet-900 focus:outline-none focus:ring-0 active:border-violet-600 active:bg-violet-600 md:p-4 md:text-base"
                type="submit"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBox;
