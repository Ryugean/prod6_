import Notes from "@/components/Notes";
import Pomodoro from "@/components/Pomodoro";
import Todo from "@/components/Todo";

export default function Home() {
  return (
    <main>
      <Pomodoro />
      <Todo />
      <Notes />
    </main>
  );
}
