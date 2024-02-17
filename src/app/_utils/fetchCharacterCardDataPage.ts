import type { Page } from "@/app/_types/page";
import { getEmptyPage } from "@/app/_utils/getEmptyPage";
import type { Person } from "@/app/_types/person";
import type { CharacterCardData } from "@/app/_types/characterCardData";

export const fetchCharacterCardDataPage = async (
    searchTerm: string,
    page: number,
): Promise<Page<CharacterCardData>> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SWAPI_BASE_URL;
        const assetsBaseUrl = process.env.NEXT_PUBLIC_STAR_WARS_ASSETS_BASE_URL;
        const urlParams = new URLSearchParams({ search: searchTerm, page: page.toString() });
        const response = await fetch(`${baseUrl}/people?` + urlParams.toString());
        const responseData: Page<Person> = await response.json();

        if (!response.ok || !responseData) {
            return getEmptyPage();
        }

        return {
            ...responseData,
            results: responseData.results.map((person) => {
                const characterId = person.url.split("/")[5];

                return {
                    name: person.name,
                    url: person.url,
                    homeworld: person.homeworld,
                    gender: person.gender,
                    imageUrl: `${assetsBaseUrl}/characters/${characterId}.jpg`,
                };
            }),
        };
    } catch (e) {
        console.error(e);

        return getEmptyPage();
    }
};
