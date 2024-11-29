"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const AdminLoginForm = () => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/login`;
      // const apiUrl = `http://localhost:3009/admin/login`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to login.");
      }
      const data = await response.json();
      console.log(data);
      // Store the token in the local storage.
      Cookies.set("adminToken", data.jwt);
      Cookies.set("admin", JSON.stringify(data.admin));
      router.push("/admin");
    } catch (error) {
      console.error(error);
      alert("Failed to login. Please check your credentials.");
    }
  }

  return (
    <Card className="w-[90%] lg:w-[40%] xl:w-[30%]">
      <CardHeader>
        <Image
          src="/assets/images/goformeetNavLogo.svg"
          className="mb-4"
          alt="logo"
          height={80}
          width={180}
        />
        <CardTitle>Admin Login</CardTitle>
        <CardDescription>Login to the admin panel of Goformeet</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AdminLoginForm;
