import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/_components/Header";

export const metadata: Metadata = {
    title: "Star Wars Characters",
    description: "Interactive Star Wars character gallery, based on https://swapi.dev",
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <html lang="en" className="scrollbar-hide scroll-smooth">
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
