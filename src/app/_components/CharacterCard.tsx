import React from "react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/app/_components/ImageWithFallback";

type TCharacterCardProps = {
    characterName: string;
    characterImageSrc: string;
    onClick: () => void;
};

const CharacterCard: React.FC<TCharacterCardProps> = ({ characterName, characterImageSrc, onClick }) => {
    return (
        <motion.div
            className="cursor-pointer overflow-hidden rounded-lg shadow"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            layout
        >
            <div className="relative aspect-square">
                <ImageWithFallback
                    className="object-cover object-center"
                    src={characterImageSrc}
                    fallbackSrc="/images/character-card-fallback.jpg"
                    alt={characterName}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 288px"
                />
            </div>
            <div className="bg-white p-4">
                <h2 className="text-center text-slate-900">{characterName}</h2>
            </div>
        </motion.div>
    );
};

export default CharacterCard;
