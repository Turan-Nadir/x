'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDateFormatter } from "@react-aria/i18n";
import { getLocalTimeZone, parseDate } from '@internationalized/date';
const Preview = () => {
  let formatter = useDateFormatter({dateStyle: "full"});
  const [testDetails, setTestDetails] = useState<any>(null); // State to store the test details
  const router = useRouter();

  useEffect(() => {
    // Get the preview test details from localStorage
    const previewTest = localStorage.getItem('previewTest');
    
    if (previewTest) {
      setTestDetails(JSON.parse(previewTest));
      console.log(testDetails);
    } else {
      // If no test preview found, redirect to create test page
      router.push('/dashboard/create');
    }
  }, [router]);

  //const parsed = parseDate(testDetails.startDate)
  if (!testDetails) return <div>Loading...</div>;

  return (
    <div className="preview-container">
      <h1>Test Preview</h1>
      <div className="test-details">
        <h2>{testDetails.name}</h2>
        <p><strong>Description:</strong> {testDetails.desc}</p>
        <p><strong>Type:</strong> {testDetails.type}</p>
        <p><strong>Start Date:</strong> {testDetails.startDate}</p>
        <p><strong>Deadline:</strong> {testDetails.deadline  }</p>
        <p><strong>Email Send:</strong> {testDetails.mailsend ? 'Enabled' : 'Disabled'}</p>
        <p><strong>Reveal Results:</strong> {testDetails.revealResults ? 'Enabled' : 'Disabled'}</p>
      </div>

      <div className="questions-section">
        <h3>Questions</h3>
        {testDetails.questions.map((question: any, index: number) => (
          <div key={index} className="question">
            <p><strong>Question {index + 1}:</strong> {question.desc}</p>
            {question.type === 'm' && (
              <div>
                <strong>Options:</strong>
                <ul>
                  {question.options.map((option: string, optionIndex: number) => (
                    <li key={optionIndex}>{option}</li>
                  ))}
                </ul>
              </div>
            )}
            {question.type === 's' && (
              <div>
                <strong>Input:</strong> {question.input}
              </div>
            )}
            <p><strong>Answer:</strong> {question.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preview;
