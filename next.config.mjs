/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
                hostname: "firebasestorage.googleapis.com",
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**', // Allows all paths under res.cloudinary.com
            },
            {
                hostname: "goformeet.s3.ap-south-1.amazonaws.com",
            },
            {
                hostname: "www.goformeet.co", // Add this line
            },
            {
                hostname: "cashfreelogo.cashfree.com", // Add this for cashfree logo
            },
        ],
    },
};

export default nextConfig;