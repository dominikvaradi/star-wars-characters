"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

type TImageWithFallbackProps = ImageProps & { fallbackSrc: string };

const ImageWithFallback: React.FC<TImageWithFallbackProps> = ({ fallbackSrc, alt, src, ...props }) => {
    const [error, setError] = useState<boolean>(false);

    return <Image alt={alt} src={error ? fallbackSrc : src} onError={() => setError(true)} {...props} />;
};

export default ImageWithFallback;
