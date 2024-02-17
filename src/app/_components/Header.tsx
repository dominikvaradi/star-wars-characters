import React from "react";
import Logo from "@/app/_components/Logo";

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-center bg-slate-900 px-8 shadow">
            <div className="py-4">
                <Logo className="h-20" />
            </div>
        </header>
    );
};

export default Header;
