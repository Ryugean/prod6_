"use client";

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
import { Checkbox } from "./ui/check-box";

type Todo = {
  id: string;
  title: string;
  description: string;
  createdAt: Timestamp;
};

function Todo() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = async () => {
    if (!title) return;
    setLoading(true);

    try {
      await addDoc(collection(db, "todos"), {
        userId: user?.id,
        title,
        description: desc,
        createdAt: Timestamp.now(),
      });
      setTitle("");
      setDesc("");
      toast("Todo Created Successfully...");
      setLoading(false);
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
  };

  useEffect(() => {           {/*getting todos */}
    if (!user) return;

    const q = query(
      collection(db, "todos"),
      where("userId", "==", user.id),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedTodos: Todo[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          description: data.description,
          createdAt: data.createdAt,
          userId: data.userId,
          completed: doc.data().completed,
        };
      });

      setTodos(fetchedTodos);
    });

    // 🔁 Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todos", id)); // This will delete the todo from the Firestore collection
      console.log("Todo Deleted successfully.");
      toast("Todo Deleted Successfully...");
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { completed });
  };

  return (
    <div className="flex m-5 mx-auto overflow-y-auto w-3/4 gap-3">
      {" "}
      {/* Todo Space*/}
      <div className="p-3 border-3 overflow-y-auto rounded-md w-1/2">
        <div className="flex items-center justify-between px-5 pb-3">
          <h1 className="text-gray-800 text-lg">Todolist</h1>
        </div>
        <div className="space-y-2 overflow-y-auto h-64 pr-2 scrollbar-hover px-5"> {/*todo objects*/}
          {todos.length === 0 ? (
            <p className="text-gray-500">No todos yet.</p>
          ) : (
            todos.map((todo: any) => (
              <div
                key={todo.id}
                className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Checkbox and title in same flex row */}
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={(checked) =>
                        handleToggleComplete(todo.id, Boolean(checked))
                      }
                    />
                    <h3
                      className={`font-bold ${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.title}
                    </h3>
                  </div>

                  {/* Delete button aligned right */}
                  <Button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-300 text-gray-900 hover:bg-red-700 hover:text-gray-100"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
                <p
                  className={`${
                    todo.completed
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  {todo.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Added on {todo.createdAt?.toDate().toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="p-3 border-3 rounded-md w-1/2">
        {" "}
        {/* Add Todos */}
        <div className="flex items-center justify-between px-5 pb-5">
          <h1 className="text-gray-800 text-lg">Make Todos</h1>
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
            onClick={handleAddTodo}
            className="bg-gray-800"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
