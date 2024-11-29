import React from 'react';

interface TextCardProps {
  title: string;
  text: React.ReactNode; 
}

const ProfileTextCard = ({ title, text }: TextCardProps) => {
  return (
    <div className='lg:w-1/4 max-w-[800px]'>
      <h4 className="font-bold text-xl">{title}</h4>
      <p className="text-lg">{text}</p>
    </div>
  );
};

export default ProfileTextCard;
