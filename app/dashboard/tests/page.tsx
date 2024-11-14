'use client';

import { Navbar } from '@/components/navbar';
import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import QR from '@/components/qr';
import { Button, Card, Tooltip } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

interface TestItem {
  _id:string;
  name: string;
  type: string;
  url: string;
  desc: string;
  deadline: string;
  startdate: string;
  timestamp: string;
}

const Tests = () => {
  const [tests, setTests] = useState<TestItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTests = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated.');
        return;
      }

      try {
        const response = await fetch('https://stm.glasscube.io/dashboard/tests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Something went wrong');

        setTests(data.tests); // Assume data.tests contains the tests array
      } catch (err) {
        console.error('Error fetching tests:', err);
        setError('Failed to fetch tests.');
      }
    };

    fetchTests();
  }, []);

  const handlePreview = (url: string) => {
    const fullUrl = `https://tm.glasscube.io/${url}`;
    window.open(fullUrl, '_blank'); // Open preview in a new tab
  };

  const handleReports = (testId: string) => {
    router.push(`/dashboard/reports/${testId}`); // Redirect to the reports page for that test
  };

  return (
    <div className="flex flex-row h-full">
      {/* Navbar on the left side */}
      <div className="w-60 bg-gray-800 text-white">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="flex-grow flex flex-col items-center p-8">
        {error && <p className="text-red-500">{error}</p>}

        {!error && tests.length > 0 ? (
          tests.map((item, index) => (
            <Card key={index} className="flex m-4 w-9/12 items-center p-6 bg-white shadow-lg rounded-lg">
              <div className="flex flex-row w-full">
                {/* Test Information */}
                <div className="flex flex-col justify-between mr-8 max-w-md">
                  <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                  <p className="text-gray-600 mb-1">Created at: {new Date(item.timestamp).toLocaleString()}</p>
                  <p className="text-gray-600 mb-1">Deadline: {new Date(item.deadline).toLocaleString()}</p>
                  <p className="text-gray-600 mb-1">Starts at: {new Date(item.startdate).toLocaleString()}</p>
                  <Tooltip content={item.desc} color="primary">
                    <p className="text-gray-700 mb-2">Description: {item.desc.slice(0, 60)}...</p>
                  </Tooltip>
                  <p className="text-gray-600">URL: <a href={`https://tm.glasscube.io/${item.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">{`tm.glasscube.io/${item.url}`}</a></p>
                </div>

                {/* QR Code */}
                <div className="mr-8">
                  <QR url={item.url} />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col justify-center">
                  <Button color="primary" className="m-1" onClick={() => handleReports(item._id)}>
                    Reports & Analytics
                  </Button>
                  <Button color="secondary" className="m-1" onClick={() => handlePreview(item.url)}>
                    Preview
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-600">No tests available.</p>
        )}

        {/* Create Test Button */}
        <NextLink href="/dashboard/create" passHref>
          <button className="mt-5 mb-8 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create a Test
          </button>
        </NextLink>
      </div>
    </div>
  );
};

export default Tests;
