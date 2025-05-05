'use client'

import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function Notes() {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useUser();

    const handleAddNote = async () => {
      if (!title) return;
      setLoading(true);
  
      try {
        await addDoc(collection(db, "notes"), {
          userId: user?.id,
          title,
          description: desc,
          createdAt: Timestamp.now(),
        });
        setTitle("");
        setDesc("");
        toast("Note Created Successfully...");
        setLoading(false);
      } catch (error) {
        console.error("Error adding todo: ", error);
      } finally{
        setLoading(false);
      }
    };

  return (
    <div className='flex m-5 mx-auto w-3/4 gap-3'>

        <div className='p-3 border-3 rounded-md w-2/3 bg-gray-800'>
        
        </div>

        <div className="p-3 border-3 rounded-md w-1/3"> {/*Make Notes*/}
        {" "}
        {/* Add Notes */}
        <div className="flex items-center justify-between px-5 pb-5">
          <h1 className="text-gray-800 text-lg">Make Notes</h1>
        </div>
        <div className="px-5 py-2">
          <h1>Title</h1>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title..."
          />
        </div>
        <div className="px-5 py-2">
          <h1>Description</h1>
          <Textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter the description..."
            className="h-24 resize-none"
          />
        </div>
        <div className="px-5 py-2">
          <Button
            onClick={handleAddNote}
            className="bg-emerald-300 text-gray-900 hover:bg-emerald-700 hover:text-gray-100"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Notes
