"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PiSpinner } from "react-icons/pi";
import CharacterModalContent from "@/app/_components/CharacterModalContent";

type TModalProps = {
    characterUrl: string | null;
    onClose: () => void;
};

const CharacterModal: React.FC<TModalProps> = ({ characterUrl, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (characterUrl) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [characterUrl]);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current?.contains(event.target as Node)) return;

        onClose();
    };

    if (typeof window !== "object") return null;

    return createPortal(
        <AnimatePresence>
            {characterUrl && (
                <motion.div
                    key="modal-overlay"
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-2"
                    onClick={handleOverlayClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div
                        ref={modalRef}
                        className="scrollbar-hide relative max-h-full w-full max-w-[400px] space-y-2 overflow-y-auto rounded-lg bg-white p-8 shadow"
                    >
                        <Suspense
                            fallback={
                                <div className="flex justify-center">
                                    <PiSpinner className="h-16 w-16 animate-spin text-slate-400" />
                                </div>
                            }
                        >
                            <CharacterModalContent characterUrl={characterUrl} onClose={onClose} />
                        </Suspense>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
};

export default CharacterModal;
