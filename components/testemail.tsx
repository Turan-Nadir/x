// TestMail.tsx
import { Html, Head, Preview, Body, Container, Heading, Text } from "@react-email/components";

const TestMail = ({ userName, testTitle }: { userName: string; testTitle: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Test Completion Confirmation</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif" }}>
        <Container style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
          <Heading>Well done on completing the test!</Heading>
          <Text>Hi {userName},</Text>
          <Text>You've successfully completed the "{testTitle}" test.</Text>
          <Text>We hope it was a great learning experience. Feel free to review your responses anytime.</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TestMail;
