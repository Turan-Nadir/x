import React from "react";

interface SurveyMailProps {
  userName: string;
  surveyTitle: string;
}

const SurveyMail: React.FC<Readonly<SurveyMailProps>> = ({userName, surveyTitle, }) => (
  
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
        <h1>Thank you for completing the survey!</h1>
        <p>Hi {userName},</p>
        <p>Thank you for participating in the "{surveyTitle}" survey.</p>
        <p>Your responses have been successfully recorded. We appreciate your time and feedback.</p>
      </div>
    </div>
  
);

export default SurveyMail;
