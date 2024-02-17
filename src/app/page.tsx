import React from "react";
import CharacterGallery from "@/app/_components/CharacterGallery";

const HomePage: React.FC = () => {
    return (
        <main className="min-h-[calc(100vh-7rem)] bg-slate-100 px-2.5 py-6 md:px-8">
            <div className="mx-auto max-w-[1200px] space-y-8">
                <CharacterGallery />
            </div>
        </main>
    );
};

export default HomePage;
