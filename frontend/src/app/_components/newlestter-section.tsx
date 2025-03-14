"use client";

import type React from "react";

import { Mail } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

export default function Newsletter() {
  return (
    <section className="py-12 bg-[linear-gradient(to_bottom,_#FFF_50%,_#F0F0F0_50%)] p-8">
      <div className="flex items-center bg-background gap-2 rounded-[20px] justify-around mx-auto max-w-7xl px-6 py-8 md:px-6">
        <h2 className="text-9xl font-integralcf-bold  mb-6 md:text-3xl w-1/3">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h2>

        <form className="flex flex-col gap-4 ">
          <div className="relative flex flex-col w-full">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="pl-10 py-6 bg-white rounded-full w-[300px] font-satoshi-medium text-black" 
              required
            />
            <Mail className="absolute top-4 left-4 text-gray-400" size={18} />
          </div>
          <Button
            type="submit"
            className="bg-white font-satoshi-medium text-black hover:bg-gray-800 py-6 rounded-full w-full"
          >
            Subscribe to Newsletter
          </Button>
        </form>
      </div>
    </section>
  );
}
