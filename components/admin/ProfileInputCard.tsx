import React from "react";
import { Input } from "../ui/input";
interface TextCardProps {
  title: string;
  text: string;
  initialValues: string | undefined;
  onChange: (value: string) => void;
}

const ProfileInputCard = ({
  title,
  text,
  initialValues,
  onChange,
}: TextCardProps) => {
  return (
    <div className="lg:w-1/4 max-w-[800px]">
      <h4 className="font-bold text-xl">{title}</h4>
      <Input value={initialValues} />
    </div>
  );
};
 

export default ProfileInputCard;
