'use client';
import React, { useState } from 'react';
import { Input,Button, ButtonGroup,Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { EyeFilledIcon, EyeSlashFilledIcon } from './icons';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import { title, subtitle } from "@/components/primitives";
import { color } from 'framer-motion';
const Registr = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    surname: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize router

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const url = isSignUp
      ? 'https://stm.glasscube.io/auth/signup'
      : 'https://stm.glasscube.io/auth/signin';

    const requestBody = isSignUp
      ? {
          username: formData.username,
          firstname: formData.firstname,
          surname: formData.surname,
          email: formData.email,
          password: formData.password
        }
      : {
          email: formData.email,
          password: formData.password
        };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (data.token) {
        // Save the token to localStorage
        localStorage.setItem('token', data.token);
        
        // Redirect to the dashboard page
        router.push('/dashboard');
      }
      if(isSignUp) setIsSignUp(!isSignUp);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen">
      <div className="flex-row inline-block max-w-lg text-center justify-center">
        <img src="/logo.png" className='h-14 w-14 mr-4' alt="" />
        <h2 className={title({ color: "blue" })}>TEST&nbsp;</h2>
        <h2 className={title({color:"yellow"})}> MATE </h2>
      </div>
      <Card className="w-[90%] max-w-md p-6 mx-auto shadow-lg">
        <CardHeader className="flex justify-center">
          <ButtonGroup color="primary" variant="flat">
            <Button onClick={() => setIsSignUp(true)} disabled={isSignUp}>
              Sign Up
            </Button>
            <Button onClick={() => setIsSignUp(false)} disabled={!isSignUp}>
              Sign In
            </Button>
          </ButtonGroup>
        </CardHeader>

        <CardBody className="flex flex-col space-y-4">
          <form onSubmit={handleSubmit} className="w-full">
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            {isSignUp ? (
              <>
                {/* Sign Up Fields */}
                <Input
                  isClearable
                  fullWidth
                  variant="bordered"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <Input
                  isClearable
                  variant="bordered"
                  fullWidth
                  placeholder="First Name"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
                <Input
                  isClearable
                  variant="bordered"
                  fullWidth
                  placeholder="Surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                />
                <Input
                  isClearable
                  variant="bordered"
                  fullWidth
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Input
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? 'text' : 'password'}
                  className="max-w-xs"
                />
              </>
            ) : (
              <>
                {/* Sign In Fields */}
                <Input
                  isClearable
                  variant="bordered"
                  fullWidth
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Input
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? 'text' : 'password'}
                  className="max-w-xs"
                />
              </>
            )}
            <Button
              variant="shadow"
              color="primary"
              type="submit"
              className="w-full"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Registr;
