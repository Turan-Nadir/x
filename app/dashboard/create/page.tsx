"use client";

import React, { useState } from 'react';
import {
  Input,
  Button,
  Textarea,
  Checkbox,
  DatePicker,
  Card,
  Divider,
  Select,
  SelectItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import InfoIcon, { ThreeDotsIcon } from '@/components/icons';
import { DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";

interface Question {
    type: 's' | 'm' | '';  // 's' for single input, 'm' for multiple choice, or empty string
    desc: string;
    options: string[];  // options for multiple choice questions
    input: string;  // input field for single question types
    answer: string;  // correct answer for tests
  }
const CreateTest = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('test');
  const [deadline, setDeadline] = useState("");
  const [startDate, setStartDate] = useState("");
  const [mailsend, setMailsend] = useState(false);
  const [revealResults, setRevealResults] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState<Question[]>([
    { type: '', desc: '', options: [''], input: '', answer: '' }
  ]);

  // Handle question change, ensuring that the field can only be a valid key in the Question type
  const handleQuestionChange = <K extends keyof Question>(
    index: number, 
    field: K, 
    value: Question[K]
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };
  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType( e.target.value);
  };

   // Function to handle preview click
   const handlePreview = () => {
    const testDetails = {
      name,
      desc,
      type,
      deadline, 
      startDate,
      mailsend,
      revealResults,
      questions
    };
    
    // Save the test details to localStorage
    localStorage.setItem('previewTest', JSON.stringify(testDetails));

    // Navigate to the preview page
    router.push('/dashboard/preview');
  };

  const deleteQuestion = (index:any) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(index, 1);
      return updatedQuestions;
    });
  };

  // Handle adding options to a question
  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  // Handle adding a new question
  const addQuestion = () => {
    setQuestions([...questions, {type:'', desc: '', options: [''], input:'', answer: ''}]);
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setFile(event.target.files[0]);
  };

  // Handle file upload and question conversion
  const handleSubmitFile = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("https://stm.glasscube.io/dashboard/convert", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.data) {
        const convertedQuestions = result.data.map((q: any) => ({
          type: q.type,
          desc: q.desc,
          options: q.options.map((choice: string) => choice),
          answer: '',
        }));
        setQuestions([...questions, ...convertedQuestions]);
        setError('');
      } else {
        setError(result.message || "Unexpected file conversion response format.");
      }
    } catch (err) {
      console.error("Error in file upload:", err);
      setError("An error occurred during the file upload.");
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("User not authenticated.");
      return;
    }
    
    const testDetails = {
        name,
        desc,
        type,
        deadline, 
        startDate,
        mailsend,
        revealResults,
        questions,
        token
      };

    try {
      const response = await fetch('https://stm.glasscube.io/dashboard/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testDetails),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to create test');
      localStorage.removeItem('user');
      router.push("/dashboard/tests"); // Redirect to dashboard on success
    } catch (error) {
      console.error("Error creating test:", error);
      setError("Failed to create test.");
    }
  };
    

  return (
    <div className="flex flex-row h-full">
      {/* Navbar on the left side */}
      <div className="w-60 bg-gray-800 text-white">
        <Navbar />
      </div>

     {/* Main content area */}
<div className="flex-grow ">
  <Card className="p-8 w-5/6 mx-auto items-center flex-grow overflow-y-auto">
    <h2 className="text-2xl mb-4">Create New Test or Survey</h2>
    {error && <p className="text-red-500">{error}</p>}

    {/* Test Details */}
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full">
        <Input
          label="Test Name"
          placeholder="Enter test name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          className="mb-4"
        />
        <Textarea
          label="Description"
          placeholder="Describe the test"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          fullWidth
          className="mb-4"
        />
        <Select
          label="Type"
          placeholder="Select test form type"
          variant="bordered"
          selectedKeys={[type]}
          onChange={handleType}
          className="mb-4"
        >
          <SelectItem key='test'>Test</SelectItem>
          <SelectItem key='survey'>Survey</SelectItem>
          <SelectItem key='poll'>Poll</SelectItem>
        </Select>
      </div>
      <div className="w-full">
      <Input
        type="datetime-local"
        label="Select Date"
        value={startDate}
        placeholder="Choose a starting date"
        onChange={(e)=>{setStartDate(e.target.value)}}
      />
        
        <Input
        type="datetime-local"
        label="Select Date"
        value={deadline}
        onChange={(e)=>{setDeadline(e.target.value)}}
        placeholder="Choose a deadline date"
      />
        <Checkbox
          isSelected={mailsend}
          onValueChange={setMailsend}
          className="mb-4"
        >
          Send Email Notification
        </Checkbox>
        <Checkbox
          isSelected={revealResults}
          onValueChange={setRevealResults}
          className="mb-4"
        >
          Reveal Results After Deadline
        </Checkbox>
      </div>
    </div>

    {/* File Upload */}
    <div className="my-4">
      <div className='flex flex-row'>
        <label className="block mb-2 font-semibold">Upload a File</label>
        <Tooltip className='w-60' content="Upload a PDF, DOCX, or image file. The file will be converted into questions and options if structured correctly." placement="bottom-start">
          <span className="ml-2">
            <InfoIcon className="text-gray-500 cursor-pointer" />
          </span>
        </Tooltip>
      </div>
      <form onSubmit={handleSubmitFile}>
        <input type="file" onChange={handleFileChange} accept=".pdf,.docx,image/*" />
        <Button type="submit">Upload and Convert</Button>
      </form>
    </div>

    <Divider className="my-4" />

    {/* Questions Section */}
    <h3 className="text-xl mb-2">Questions</h3>

    {questions.map((question, index) => (
  <Card key={index} className="w-3/5 mb-4 p-4">
    <div className="flex flex-row justify-between items-center mb-2">
      <label className="font-semibold">Question {index + 1}</label>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Button>
            <ThreeDotsIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>
            <Button color="danger" size="sm" onClick={() => deleteQuestion(index)}>Delete Question</Button>
          </DropdownItem>
          <DropdownItem onClick={() => handleQuestionChange(index, 'type', 's')}>
            Single Input
          </DropdownItem>
          <DropdownItem onClick={() => handleQuestionChange(index, 'type', 'm')}>
            Multiple Choice
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>

    {/* Question Description Input */}
    <Input
      placeholder="Question description"
      value={question.desc}
      variant="bordered"
      onChange={(e) => handleQuestionChange(index, 'desc', e.target.value)}
      fullWidth
      className="mb-2"
    />

    {/* Conditional Rendering for Multiple Choice Options */}
    {question.type === 'm' && (
      <>
        {question.options.map((option, optionIndex) => (
          <Input
            key={optionIndex}
            label={`Option ${optionIndex + 1}`}
            placeholder="Enter option"
            value={option}
            onChange={(e) => {
              const updatedOptions = [...question.options];
              updatedOptions[optionIndex] = e.target.value;
              handleQuestionChange(index, 'options', updatedOptions);
            }}
            fullWidth
            className="mb-2 w-auto"
          />
        ))}
        <Button onClick={() => addOption(index)} color="success" size="sm">Add Option</Button>
      </>
    )}

    {/* Conditionally Render Answer Input Based on Type */}
    {type === 'test' && (
      question.type === 'm' ? (
        // Use NextUI Select component for choosing the correct answer in multiple-choice questions
        <Select
  label="Answer"
  placeholder="Select the correct answer"
  variant="bordered"
  value={question.answer}  // Bind directly to the answer value in state
  onSelectionChange={(selected) => handleQuestionChange(index, 'answer', selected.currentKey)}
  fullWidth
  className="mb-4"
>
  {question.options.map((option, optionIndex) => (
    <SelectItem key={option} value={option}>
      {option}
    </SelectItem>
  ))}
</Select>

      ) : (
        // If single input, render answer as a text input
        <Input
          label="Answer"
          placeholder="Correct answer (only for tests)"
          value={question.answer}
          onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
          fullWidth
          className="mb-4"
        />
      )
    )}
  </Card>
))}


    <Button color="primary" onClick={addQuestion} className="mb-4">Add Question</Button>
    <div className='flex flex-row'>
    <Button color="secondary"  onClick={handlePreview}  className=" mr-4" >  Preview</Button>
    <Button color="primary" onClick={handleSubmit}>Submit Test</Button>
    </div>
  </Card>
</div>

    </div>
  );
};

export default CreateTest;
