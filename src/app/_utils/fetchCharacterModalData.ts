import type { Person } from "@/app/_types/person";
import type { CharacterModalData } from "@/app/_types/characterModalData";
import { fetchFilm } from "@/app/_utils/fetchFilm";

export const fetchCharacterModalData = async (characterUrl: string): Promise<CharacterModalData | null> => {
    try {
        const assetsBaseUrl = process.env.NEXT_PUBLIC_STAR_WARS_ASSETS_BASE_URL;
        const response = await fetch(characterUrl);
        const responseData: Person = await response.json();

        if (!response.ok || !responseData) {
            return null;
        }

        const films: string[] = [];
        for (const filmUrl of responseData.films) {
            const film = await fetchFilm(filmUrl);
            if (film) films.push(film.title);
        }

        const characterId = responseData.url.split("/")[5];

        return {
            name: responseData.name,
            url: responseData.url,
            height: responseData.height,
            weight: responseData.mass,
            imageUrl: `${assetsBaseUrl}/characters/${characterId}.jpg`,
            films,
        };
    } catch (e) {
        console.error(e);

        return null;
    }
};
