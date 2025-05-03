'use client';
import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

function Navbar() {
const {user} = useUser()

  return (
    <div className="flex justify-between items-center mt-10 p-3 border-3 rounded-md w-3/4 mx-auto">
      <div className="px-10">
        <h1 className="font-bold text-lg text-gray-800">Productivity Space</h1>
      </div>
      <div className="px-10">
          <SignedOut>
            <div className="flex gap-4">
              <div className="hover:scale-110 hover:text-gray-600"><SignInButton /></div>
              <div className="hover:scale-110 hover:text-gray-600"><SignUpButton /></div>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="hover:scale-110"><UserButton /></div>
          </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;
