"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function SignUpBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-black text-white py-2 px-4 flex justify-center items-center relative">
      <p className="text-sm text-center font-satoshi-regular">
        Sign up and get 20% off to your first order.{" "}
        <Link href="/signup" className="underline font-medium font-satoshi-regular">
          Sign Up Now
        </Link>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 text-white"
        aria-label="Close banner"
      >
        <X size={16} />
      </button>
    </div>
  );
}
