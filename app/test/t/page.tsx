// src/pages/date-picker.js
'use client';
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";

const DatePickerPage = () => {
  const [selectedDate, setSelectedDate] = useState("");

  // Function to handle date change
  const handleDateChange = (event:any) => {
    setSelectedDate(event.target.value);
  };

  // Function to send POST request
  const sendDate = async () => {
    try {
      await axios.post("http://localhost:3040/dashboard/time", {
        date: selectedDate,
      });
      alert("Date sent successfully!");
    } catch (error) {
      console.error("Error sending date:", error);
      alert("Failed to send date.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", marginTop: "50px" }}>
      <Input
        type="date"
        label="Select Date"
        placeholder="Choose a date"
        onChange={handleDateChange}
      />
      <Button onPress={sendDate} color="primary">
        Send Date
      </Button>
    </div>
  );
};

export default DatePickerPage;
