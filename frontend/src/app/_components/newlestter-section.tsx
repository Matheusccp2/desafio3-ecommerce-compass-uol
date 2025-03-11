"use client";

import type React from "react";

import { Mail } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

export default function Newsletter() {
  return (
    <section className="py-12 bg-white">
      <div className="flex items-center bg-background rounded-lg justify-between mx-auto max-w-7xl px-6 py-8 md:px-6">
        <h2 className="text-9xl font-bold  mb-6 md:text-3xl">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h2>

        <form className="flex flex-col w-1/3 gap-4">
          <div className="relative flex flex-col">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="pl-10 py-6 bg-white rounded-full"
              required
            />
            <Mail className="absolute top-4 left-2 text-gray-400" size={18} />
          </div>
          <Button
            type="submit"
            className="bg-white text-black hover:bg-gray-800 py-6 rounded-full"
          >
            Subscribe to Newsletter
          </Button>
        </form>
      </div>
    </section>
  );
}
