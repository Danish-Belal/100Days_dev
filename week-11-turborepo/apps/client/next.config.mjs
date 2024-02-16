/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages : ["@repo/ui" , "@repo/db" , "store"]
};

export default nextConfig;
