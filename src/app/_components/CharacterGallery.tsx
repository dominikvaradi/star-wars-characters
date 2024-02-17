"use client";

import React, { useState } from "react";
import { getGenderDropdownItems } from "@/app/_utils/getGenderDropdownItems";
import { getHomeworldDropdownItems } from "@/app/_utils/getHomeworldDropdownItems";
import { useCharacterGallery } from "@/app/_hooks/useCharacterGallery";
import { AnimatePresence } from "framer-motion";
import { PiSpinner } from "react-icons/pi";
import SearchBox from "@/app/_components/SearchBox";
import Dropdown from "@/app/_components/Dropdown";
import Pagination from "@/app/_components/Pagination";
import CharacterCard from "@/app/_components/CharacterCard";
import CharacterModal from "@/app/_components/CharacterModal";

const PAGE_RESULTS_LIMIT = 10;

const CharacterGallery: React.FC = () => {
    const state = useCharacterGallery();

    const [modalCharacterCharacterUrl, setCharacterModalCharacterUrl] = useState<string | null>(null);

    const totalPageCount = Math.max(1, Math.ceil(state.totalCharacterCardCount / PAGE_RESULTS_LIMIT));

    return (
        <>
            <div className="flex flex-wrap gap-2 rounded-lg bg-white p-3 shadow md:p-6">
                <SearchBox className="grow basis-[250px] md:basis-[350px]" onSubmit={state.updateSearchTerm} />
                <div className="flex flex-wrap gap-2">
                    <Dropdown
                        items={getGenderDropdownItems()}
                        label="Filter by gender"
                        onItemSelected={state.addGenderFilter}
                        onItemUnselected={state.removeGenderFilter}
                    />
                    <Dropdown
                        items={getHomeworldDropdownItems()}
                        label="Filter by home world"
                        onItemSelected={state.addHomeworldFilter}
                        onItemUnselected={state.removeHomeworldFilter}
                    />
                </div>
            </div>
            <div className="flex flex-wrap justify-between gap-4">
                <p>{`Displaying ${state.totalCharacterCardCount > 0 ? (state.page - 1) * PAGE_RESULTS_LIMIT + 1 : 0} - ${state.totalCharacterCardCount > 0 ? Math.min(state.page * PAGE_RESULTS_LIMIT, state.totalCharacterCardCount) : 0} of ${state.totalCharacterCardCount} characters`}</p>
                <Pagination
                    totalPageCount={totalPageCount}
                    page={state.page}
                    onPageClick={state.updatePage}
                    maxPageButtons={3}
                />
            </div>
            {state.loading && (
                <div className="flex justify-center">
                    <PiSpinner className="h-16 w-16 animate-spin text-slate-400" />
                </div>
            )}
            {!state.loading && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <AnimatePresence>
                        {!state.loading &&
                            state.characterCardDataList.map(({ url, name, imageUrl }) => (
                                <CharacterCard
                                    key={url}
                                    characterName={name}
                                    characterImageSrc={imageUrl}
                                    onClick={() => setCharacterModalCharacterUrl(url)}
                                />
                            ))}
                    </AnimatePresence>
                </div>
            )}
            {!state.loading && state.characterCardDataList.length === 0 && (
                <p>
                    No characters found{totalPageCount > 1 ? " on this page." : "."} Try removing some filters
                    {totalPageCount > 1 ? " or switch page." : "."}
                </p>
            )}
            <CharacterModal
                characterUrl={modalCharacterCharacterUrl}
                onClose={() => setCharacterModalCharacterUrl(null)}
            />
        </>
    );
};

export default CharacterGallery;
