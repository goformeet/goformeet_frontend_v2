"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const UpdateTransaction = () => {
  const [id, setId] = useState("");
  const updateTransactionId = (e: any) => {
    e.preventDefault();
    console.log(id);
  };
  return (
    <form
      className="flex w-full max-w-sm items-center space-x-2"
      onSubmit={updateTransactionId}
    >
      <Input
        type="text"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
        placeholder="Enter Transaction Id"
      />
      <Button type="submit">Update</Button>
    </form>
  );
};

export default UpdateTransaction;
