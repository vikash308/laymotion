import { connectDB } from "../../lib/db";
import Todo from "../../models/Todo";
import { verifyToken } from "../../lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Helper to authenticate user from cookies
async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  const decoded = verifyToken(token);
  return decoded ? decoded.userId : null;
}

export const GET = async () => {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 });
        return NextResponse.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
    }
};

export const POST = async (request) => {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { text } = await request.json();
        if (!text?.trim()) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }
        await connectDB();
        const todo = new Todo({ text: text.trim(), user: userId });
        await todo.save();
        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        console.error("Error creating todo:", error);
        return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
    }
};

export const PATCH = async (request) => {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id, completed } = await request.json();
        await connectDB();
        
        // Ensure user owns this todo before updating
        const todo = await Todo.findOneAndUpdate(
            { _id: id, user: userId },
            { completed },
            { new: true }
        );
        if (!todo) {
            return NextResponse.json({ error: "Todo not found or unauthorized" }, { status: 404 });
        }
        return NextResponse.json(todo);
    } catch (error) {
        console.error("Error updating todo:", error);
        return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
    }
};

export const DELETE = async (request) => {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id } = await request.json();
        await connectDB();
        
        // Ensure user owns this todo before deleting
        const todo = await Todo.findOneAndDelete({ _id: id, user: userId });
        if (!todo) {
            return NextResponse.json({ error: "Todo not found or unauthorized" }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting todo:", error);
        return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
    }
};
