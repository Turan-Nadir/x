'use client';
import React from 'react';
import { Skeleton } from '@nextui-org/react';

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-row h-full">
      {/* Skeleton Navbar */}
      <div className="w-60 bg-gray-300 h-full flex flex-col items-center p-4">
        <Skeleton   className="mb-6" />
        <Skeleton  className="mb-4" />
        <Skeleton className="mb-4" />
        <Skeleton  className="mb-4" />
      </div>

      {/* Skeleton Main Content */}
      <div className="flex-grow p-8">
        <Skeleton className="mb-6" />
        <div className="space-y-4">
          <Skeleton  />
          <Skeleton />
          <Skeleton  />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
