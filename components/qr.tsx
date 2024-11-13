// awesomeqr.tsx
import React from 'react';
import  { QRCodeSVG } from 'qrcode.react';

interface AwesomeQRProps {
  url: string;
}

const QR: React.FC<AwesomeQRProps> = ({ url }) => {
    const completeUrl = `https://tm.glasscube.io/${url}`;
  return (
    <div className="flex flex-col items-center p-4 bg-blue-600 rounded-lg ">
      <h2 className="text-lg font-semibold mb-1">Scan the QR Code</h2>
      <QRCodeSVG
       value={completeUrl} 
       size={160} 
       bgColor="#ffffff" 
      fgColor="#000000" 
      level="Q" 
      imageSettings={{
        src: '/logo.png', // Logo URL
          x: undefined, // Centers the image horizontally
          y: undefined, // Centers the image vertically
          height: 40,   // Set logo height
          width: 40,    // Set logo width
          excavate: true // Removes the QR color under the image, making the logo clear
      }}/>
          </div>
  );
};

export default QR;
