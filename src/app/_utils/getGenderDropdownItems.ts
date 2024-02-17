import type { DropdownItem } from "@/app/_types/dropdownItem";

export const getGenderDropdownItems = (): DropdownItem[] => [
    {
        value: "female",
        label: "Female",
    },
    {
        value: "male",
        label: "Male",
    },
    {
        value: "unknown",
        label: "Unknown",
    },
    {
        value: "n/a",
        label: "N/A",
    },
];
