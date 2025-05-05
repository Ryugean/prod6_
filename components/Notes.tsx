'use client'

import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
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

type Note= {
  id: string;
  title: string;
  description: string;
  createdAt: Timestamp;
  userId: string;
};

function Notes() {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const [notes, setNotes] = useState<Note[]>([]);
    

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

    useEffect(() => {           {/*getting todos */}
        if (!user) return;
    
        const q = query(
          collection(db, "notes"),
          where("userId", "==", user.id),
          orderBy("createdAt", "desc")
        );
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fetchedNotes: Note[] = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              description: data.description,
              createdAt: data.createdAt,
              userId: data.userId,
            };
          });
    
          setNotes(fetchedNotes);
        });
    
        // 🔁 Cleanup the listener when the component unmounts
        return () => unsubscribe();
      }, [user]);

      const handleDelete = async (id: string) => {
          try {
            await deleteDoc(doc(db, "notes", id)); // This will delete the todo from the Firestore collection
            console.log("Note Deleted successfully.");
            toast("Note Deleted Successfully...");
          } catch (error) {
            console.error("Error deleting todo: ", error);
          } finally {
            setLoading(false); // ✅ Always runs, even on error
          }
        };

  return (
    <div className='flex m-5 mx-auto w-3/4 gap-3'>

        <div className='p-3 border-3 rounded-md w-2/3 bg-gray-800'>
          <div className="flex items-center justify-between px-5 pb-3">
            <h1 className="text-gray-200 text-lg">Notes</h1>
          </div>
          <div className="space-y-2 overflow-y-auto h-64 pr-2 scrollbar-hover px-5"> {/*todo objects*/}
          {notes.length === 0 ? (
            <p className="text-gray-200">No todos yet.</p>
          ) : (
            notes.map((note: any) => (
              <div
                key={note.id}
                className="border p-4 rounded-lg shadow-sm bg-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Checkbox and title in same flex row */}
                  <div className="flex items-center gap-3 flex-1">
                    <h3
                      className="font-bold text-gray-800"
                    >
                      {note.title}
                    </h3>
                  </div>

                  {/* Delete button aligned right */}
                  <Button
                    onClick={() => handleDelete(note.id)}
                    className="bg-red-300 text-gray-900 hover:bg-red-700 hover:text-gray-100"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
                <p className="text-gray-600">
                  {note.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Added on {note.createdAt?.toDate().toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
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
