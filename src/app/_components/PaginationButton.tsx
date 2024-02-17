import React from "react";
import { clsx } from "clsx";

type TPaginationButtonProps = React.PropsWithChildren<{
    active?: boolean;
    onClick: () => void;
}>;

const PaginationButton: React.FC<TPaginationButtonProps> = ({ active = false, onClick, children }) => {
    return (
        <button
            className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors focus:outline-none focus:ring-0",
                active
                    ? "border-violet-500 bg-violet-500 text-white focus:border-violet-900"
                    : "border-slate-400 text-slate-400 hover:border-violet-500 hover:text-violet-500 focus:border-violet-900 focus:text-violet-900 active:border-violet-500 active:text-violet-500",
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default PaginationButton;
