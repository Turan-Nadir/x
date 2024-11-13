'use client';
import React  from 'react'
import { Navbar } from "@/components/navbar"
import { Card, CardBody, CardHeader } from '@nextui-org/react'

const Dashboard = () => {
   
  return (
    <div className="flex flex-row h-full">
      {/* Navbar on the left side */}
      <div className="w-72 bg-gray-800 text-white">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="flex-grow p-8">

    <Card>
      <CardHeader>
        <h2>Test Mate</h2>
      </CardHeader>
      
      <CardBody>
        <h3 >Private, Powerful, and Feature-Rich Testing Platform</h3>
          <p><b>What is Test Mate?</b></p>
          <p>
            Test Mate is a next-generation platform designed for creating,
            managing, and analyzing tests, questionnaires, polls, and surveys. Unlike
            standard form builders, Test Mate brings a privacy-focused approach with
            advanced features that make it ideal for educators, researchers,
            organizations, and anyone seeking more control and insights over user
            responses.
          </p>

          <p><b>Key Features:</b></p>
          <p>
            <b>Dynamic Test Creation:</b> Easily create tests with options for multiple-choice, 
            short-answer, and long-form questions. Each question type is designed to support 
            various response formats, maximizing flexibility for test creators.
          </p>
          <p>
            <b>File Upload and OCR Processing:</b> Test Mate supports image and document uploads 
            (like PDFs or Word files). Uploaded files are processed using OCR (Optical Character 
            Recognition) with Tesseract, transforming image text into structured questions and 
            responses that appear directly in the UI.
          </p>
          <p>
            <b>Deadline Tracking and Automated Notifications:</b> Track test deadlines, ensuring 
            users are notified of upcoming deadlines and receive results via email once the test 
            concludes.
          </p>
          <p>
            <b>Response Analytics:</b> Comprehensive analytics for each test reveal patterns in 
            user responses, helping creators refine future tests and gain a deeper understanding 
            of participants' knowledge or preferences.
          </p>
          <p>
            <b>Downloadable Reports:</b> Get detailed, downloadable reports on user performance 
            and participation, making it simple to share insights or maintain records.
          </p>

          <p><b>Impact and Benefits:</b></p>
          <p>
            <b>For Educators:</b> Test Mate streamlines test creation and grading, allowing teachers 
            to focus on understanding student performance. With custom response tracking and 
            detailed analytics, teachers gain insights into each student's strengths and areas 
            for improvement.
          </p>
          <p>
            <b>For Businesses and Researchers:</b> The platform offers advanced data collection 
            for surveys and polls, essential for informed decision-making. From employee 
            satisfaction surveys to consumer research, Test Mate's analytics and visual reports 
            make it easy to digest complex data and drive strategic change.
          </p>
          <p>
            <b>Data Privacy and Control:</b> Built with a privacy-first approach, Test Mate is designed 
            to handle sensitive information responsibly, offering a secure alternative to traditional 
            survey tools.
          </p>
      </CardBody>
    </Card>
      </div>
    </div>
  )
}

export default Dashboard
