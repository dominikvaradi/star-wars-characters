import React, { use } from "react";
import { clsx } from "clsx";
import { PiX } from "react-icons/pi";
import { fetchCharacterModalData } from "@/app/_utils/fetchCharacterModalData";
import ImageWithFallback from "@/app/_components/ImageWithFallback";

type TCharacterModalContentProps = {
    characterUrl: string;
    onClose: () => void;
};

const CharacterModalContent: React.FC<TCharacterModalContentProps> = ({ characterUrl, onClose }) => {
    const data = use(fetchCharacterModalData(characterUrl));

    if (!data) return <p>Not found</p>;

    return (
        <>
            <button
                className={clsx(
                    "absolute right-0.5 top-0.5 flex items-center p-2 text-slate-400 transition hover:text-violet-500 focus:text-violet-900 focus:outline-none focus:ring-0 active:text-violet-500",
                )}
                type="button"
                onClick={onClose}
            >
                <PiX className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <div className="relative aspect-square overflow-hidden rounded-lg">
                <ImageWithFallback
                    className="object-cover object-center"
                    src={data.imageUrl}
                    fallbackSrc="/images/character-card-fallback.jpg"
                    alt={data.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 336px"
                />
            </div>
            <h1 className="text-center text-2xl">{data.name}</h1>
            <div className="flex flex-col items-center gap-2 px-4">
                <div className="text-center">
                    <p>Height: {data.height}</p>
                    <p>Weight: {data.weight}</p>
                </div>
                <div className="text-center">
                    <p className="text-lg">Films starred in</p>
                    <ul>
                        {data.films.map((film) => (
                            <li key={film}>{film}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default CharacterModalContent;
