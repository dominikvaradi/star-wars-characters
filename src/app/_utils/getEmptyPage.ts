import { Page } from "@/app/_types/page";

export const getEmptyPage = <T>(): Page<T> => ({
    count: 0,
    next: null,
    previous: null,
    results: [],
});
