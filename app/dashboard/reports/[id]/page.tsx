'use client';
import { Navbar } from '@/components/navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Tooltip } from '@nextui-org/react';

interface Report {
  name: string;
  totalcount: number;
  finishcount: number;
  users: User[];
}

interface User {
  username: string;
  email: string;
  timestamp: Date;
  total: number;
  finishdate: Date;
}

export default function ReportPage({ params }: { params: { id: string } }) {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch report data when component mounts
    const fetchReport = async () => {
      try {
        const response = await axios.post('http://localhost:3040/dashboard/report', { id: params.id });
        setReport(response.data.report);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [params.id]);

  if (loading) return <p>Loading report...</p>;

  return (
    <div className="flex flex-row h-full">
      {/* Navbar on the left side */}
      <div className="w-60 bg-gray-800 text-white">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="flex-grow p-8">
        {report ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">{report.name}</h1>
            <p>Tested Users: {report.totalcount}</p>
            <p>Finished: {report.finishcount}</p>

            {/* User cards */}
            <div className="grid grid-cols-1 gap-4 mt-6">
              {report.users.map((user, index) => (
                <Card key={index} className="p-4 shadow-md">
                  <h3 className="font-semibold">{user.username}</h3>
                  <p>Email: {user.email}</p>
                  <p>Date Started: {new Date(user.timestamp).toLocaleString()}</p>
                    <Tooltip content="The score is calculated based on comparing test answers and user answers.">
                  <p>
                    Total Score: {user.total}
                  </p>
                  </Tooltip>
                  <p>Finished On: {user.finishdate ? new Date(user.finishdate).toLocaleString() : 'N/A'}</p>
                  
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <p>Report data not found.</p>
        )}
      </div>
    </div>
  );
}
