'use client';

import { Container, Image, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';

export function NotFoundImage() {
  const router = useRouter();

  const handleRedirect = () => {
    // Navigate to the /hosts page
    router.push('/hosts');
  };

  return (
    <Container className="pt-20 pb-20 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-10 sm:space-y-0 sm:space-x-10">
        {/* Left side content */}
        <div className="sm:w-1/2 text-center sm:text-left">
          <Title className="text-2xl sm:text-3xl font-extrabold mb-4">
          Page Not Found
          </Title>
          <Text className="text-gray-500 text-lg mb-6">
            The page you are looking for does not exist or may have been moved.
          </Text>
          {/* Custom Tailwind button */}
          <button
            onClick={handleRedirect}
            className="border-2 border-[#a92600] text-[#a92600] px-6 py-3 rounded-lg text-lg font-semibold transition-colors hover:bg-[#a92600] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#a92600]"
          >
            Explore Our Experts
          </button>
        </div>

        {/* Right side image */}
        <div className="sm:w-1/2 mt-10 sm:mt-0">
          <Image
            src="/assets/images/404.svg"
            alt="404 Not Found"
            className="mx-auto"
            width={500}
            height={500}
          />
        </div>
      </div>
    </Container>
  );
}
