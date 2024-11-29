"use client";
import { Oval } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Oval
        color="#ee3220"
        secondaryColor="#ee322040"
        height={60}
        width={60}
      />
    </div>
  );
};

export default Loading