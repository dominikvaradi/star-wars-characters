import React from "react";
import { PiCaretDoubleLeft, PiCaretDoubleRight, PiCaretLeft, PiCaretRight } from "react-icons/pi";
import PaginationButton from "@/app/_components/PaginationButton";

type TPaginationProps = {
    totalPageCount: number;
    page: number;
    onPageClick: (page: number) => void;
    maxPageButtons?: number;
};

const Pagination: React.FC<TPaginationProps> = ({ totalPageCount, page, onPageClick, maxPageButtons = 5 }) => {
    const firstPage = 1;
    const lastPage = totalPageCount;

    const previousPage = Math.max(firstPage, page - 1);
    const nextPage = Math.min(lastPage, page + 1);

    const firstPageToShow = Math.max(
        firstPage,
        Math.min(page - Math.floor((maxPageButtons - 1) / 2), page - (maxPageButtons - 1) + (lastPage - page)),
    );
    const lastPageToShow = Math.min(
        lastPage,
        Math.max(page + Math.ceil((maxPageButtons - 1) / 2), page + (maxPageButtons - 1) - (page - firstPage)),
    );

    return (
        <div className="flex gap-1">
            <PaginationButton onClick={() => onPageClick(firstPage)}>
                <PiCaretDoubleLeft className="h-6 w-6" />
            </PaginationButton>
            <PaginationButton onClick={() => onPageClick(previousPage)}>
                <PiCaretLeft className="h-6 w-6" />
            </PaginationButton>
            {Array.from({ length: lastPageToShow - firstPageToShow + 1 }, (_, i) => i + firstPageToShow).map(
                (pageNumber) => (
                    <PaginationButton
                        key={pageNumber}
                        active={pageNumber === page}
                        onClick={() => onPageClick(pageNumber)}
                    >
                        <span>{pageNumber}</span>
                    </PaginationButton>
                ),
            )}
            <PaginationButton onClick={() => onPageClick(nextPage)}>
                <PiCaretRight className="h-6 w-6" />
            </PaginationButton>
            <PaginationButton onClick={() => onPageClick(lastPage)}>
                <PiCaretDoubleRight className="h-6 w-6" />
            </PaginationButton>
        </div>
    );
};

export default Pagination;
