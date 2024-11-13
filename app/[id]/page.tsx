'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Input, Spacer } from '@nextui-org/react';

interface Question {
  type: string;
  desc: string;
  options: string[];
  answer: string;
  input: string;
}

interface Test {
  _id:string;
  name: string;
  type: string;
  desc: string;
  startdate: string;
  deadline: string;
  revealresults: boolean;
  question: Question[];
}

interface Answer {
  questionNumber: number;
  answer: string;
  time: number;
}

export default function TestTakingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [test, setTest] = useState<Test | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [deadlinePassed, setDeadlinePassed] = useState(false);
  const [startDateMet, setStartDateMet] = useState(false);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios
      .post('http://localhost:3040/dashboard/test', { id: params.id })
      .then((response) => {
        const test = response.data.test as Test;
        setTest(test);

        const now = new Date();
        const start = new Date(test.startdate);
        const deadline = new Date(test.deadline);

        setStartDateMet(now >= start);
        setDeadlinePassed(now > deadline);
      })
      .catch((error) => console.error('Error fetching test:', error));
  }, [params.id]);

  const handleUserDetailsSubmit = async () => {
    if (username && email) {
      try {
        const response = await fetch("http://localhost:3040/user/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email }),
        });
  
        if (response.status === 200) {
          const data = await response.json();
          setUserId(data.id);
          setShowDetails(false);
        } else if (response.status === 403) {
          console.log("User already exists");
        } else {
          console.log("An unexpected error occurred");
        }
      } catch (error) {
        console.error("Error submitting user details:", error);
      }
    }
  };

  const handleAnswerChange = (index: number, answer: string) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = { questionNumber: index, answer, time: 0 };
      return updatedAnswers;
    });
  };

  const handleTestSubmit = async () => {
    const payload = {
      user: userId,
      test: test?._id,
      answers: userAnswers,
      timeStamp: new Date(),
    };

    try {
      await axios.post('http://localhost:3040/dashboard/submit', payload);
      setTestSubmitted(true);  // Set the test as submitted
      await axios.post(`api/email/survey`, {email:email, username:username, testTitle:test?.name});
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      {test ? (
        <div>
          {testSubmitted ? (
            <div className="text-center">
              <h1 className="text-2xl font-bold">Congratulations!</h1>
              <p className="text-lg">
                {test.name} completed successfully. 🎉
              </p>
              <p>
                {test.desc.includes("survey") 
                  ? "Thank you for participating in the survey. Your feedback is invaluable!"
                  : "Well done on completing the test. Your results will be available soon."}
              </p>
            </div>
          ) : showDetails ? (
            <div>
              <h1 className="text-2xl font-bold">{test.name}</h1>
              <p>{test.desc}</p>
              <Spacer y={1} />
              <Input
                isClearable
                variant='bordered'
                fullWidth
                color="primary"
                size="lg"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Spacer y={1} />
              <Input
                isClearable
                variant='bordered'
                fullWidth
                color="primary"
                size="lg"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Spacer y={1} />
              <Button onClick={handleUserDetailsSubmit}>Start Test</Button>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold">{test.name}</h1>
              {test.question.map((q, index) => (
                <div key={index} className="mb-4">
                  <p>Question {index + 1}: {q.desc}</p>
                  {q.type === "m" ? (
                    <select
                      className="border p-2 rounded w-full"
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                    >
                      <option value="">Select an answer</option>
                      {q.options.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      isClearable
                      fullWidth
                      variant='bordered'
                      placeholder="Your answer"
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                  )}
                </div>
              ))}
              <Spacer y={1} />
              <Button onClick={handleTestSubmit}>Submit Test</Button>
            </div>
          )}
        </div>
      ) : (
        <p>Test is not available anymore.</p>
      )}
    </div>
  );
}
