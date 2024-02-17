const starWarsAssetsBaseUrl = process.env.NEXT_PUBLIC_STAR_WARS_ASSETS_BASE_URL;
const starWarsAssetsProtocol = starWarsAssetsBaseUrl.split("://")[0];

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: starWarsAssetsProtocol,
                hostname: starWarsAssetsBaseUrl.split("://")[1].split("/")[0],
            }
        ]
    },
    output: "standalone",
};

export default nextConfig;
