import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "../../lib/auth";
import TodoClient from "./TodoClient";

export const metadata = {
  title: "My Tasks - TodoSphere",
  description: "Manage your tasks inside your secure personal account.",
};

export default async function TodoPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = verifyToken(token);
  if (!payload) {
    redirect("/login");
  }

  return <TodoClient />;
}
