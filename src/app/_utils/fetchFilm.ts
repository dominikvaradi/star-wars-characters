import type { Film } from "@/app/_types/film";

export const fetchFilm = async (filmUrl: string): Promise<Film | null> => {
    try {
        const response = await fetch(filmUrl);
        const responseData: Film = await response.json();

        if (!response.ok || !responseData) {
            return null;
        }

        return responseData;
    } catch (e) {
        console.error(e);

        return null;
    }
};
