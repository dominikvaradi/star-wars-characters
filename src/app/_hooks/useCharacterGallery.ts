"use client";

import React, { useCallback, useEffect, useState } from "react";
import type { CharacterCardData } from "@/app/_types/characterCardData";
import type { Page } from "@/app/_types/page";
import { getEmptyPage } from "@/app/_utils/getEmptyPage";
import { fetchCharacterCardDataPage } from "@/app/_utils/fetchCharacterCardDataPage";

type TCharacterGalleryState = {
    searchTerm: string;
    updateSearchTerm: (searchTerm: string) => Promise<void>;
    addGenderFilter: (genderValue: string) => Promise<void>;
    removeGenderFilter: (genderValue: string) => Promise<void>;
    addHomeworldFilter: (homeworldValue: string) => Promise<void>;
    removeHomeworldFilter: (homeworldValue: string) => Promise<void>;
    updatePage: (nextPage: number) => Promise<void>;
    page: number;
    totalCharacterCardCount: number;
    loading: boolean;
    characterCardDataList: CharacterCardData[];
};

export const useCharacterGallery = (): TCharacterGalleryState => {
    const [page, setPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [genderFilterValues, setGenderFilterValues] = useState<string[]>([]);
    const [homeworldFilterValues, setHomeworldFilterValues] = useState<string[]>([]);
    const [characterCardDataPage, setCharacterCardDataPage] = useState<Page<CharacterCardData>>(getEmptyPage);
    const [loading, setLoading] = useState<boolean>(true);

    const getCharacterCardDataPage = useCallback(async (searchTerm: string, page: number) => {
        setLoading(true);
        const characterCardDataPage = await fetchCharacterCardDataPage(searchTerm, page);
        setCharacterCardDataPage(characterCardDataPage);
        setLoading(false);
    }, []);

    useEffect(() => {
        (async () => {
            await getCharacterCardDataPage("", 1);
        })();
    }, [getCharacterCardDataPage]);

    const updateSearchTerm = async (newSearmTerm: string) => {
        if (newSearmTerm === searchTerm) return;

        setPage(1);
        setSearchTerm(newSearmTerm);

        await getCharacterCardDataPage(newSearmTerm, 1);
    };

    const addFilter = async (genderValue: string, setStateAction: React.Dispatch<React.SetStateAction<string[]>>) => {
        if (genderFilterValues.includes(genderValue)) return;

        setStateAction((prev) => [...prev, genderValue]);
    };

    const removeFilter = async (
        genderValue: string,
        setStateAction: React.Dispatch<React.SetStateAction<string[]>>,
    ) => {
        setStateAction((prev) => prev.filter((value) => value !== genderValue));
    };

    const updatePage = async (nextPage: number) => {
        if (page === nextPage) return;

        setPage(nextPage);

        await getCharacterCardDataPage(searchTerm, nextPage);
    };

    const filteredCharacterCardDataList = characterCardDataPage.results
        .filter((character) => (genderFilterValues.length > 0 ? genderFilterValues.includes(character.gender) : true))
        .filter((character) =>
            homeworldFilterValues.length > 0 ? homeworldFilterValues.includes(character.homeworld) : true,
        );

    return {
        searchTerm,
        updateSearchTerm,
        addGenderFilter: (genderValue) => addFilter(genderValue, setGenderFilterValues),
        removeGenderFilter: (genderValue) => removeFilter(genderValue, setGenderFilterValues),
        addHomeworldFilter: (genderValue) => addFilter(genderValue, setHomeworldFilterValues),
        removeHomeworldFilter: (genderValue) => removeFilter(genderValue, setHomeworldFilterValues),
        updatePage,
        page,
        totalCharacterCardCount: characterCardDataPage.count,
        loading,
        characterCardDataList: filteredCharacterCardDataList,
    };
};
