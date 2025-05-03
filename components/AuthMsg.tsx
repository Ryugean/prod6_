'use client';
import { SignedOut } from "@clerk/nextjs";

export default function AuthMessage() {
  return (
    <SignedOut>
      <div className="flex justify-center items-center mt-10 p-30 border-3 bg-amber-100 rounded-md w-3/4 mx-auto">
        <h1 className="text-lg">🚪 Please sign in to use the app. </h1>
      </div>
    </SignedOut>
  );
}
