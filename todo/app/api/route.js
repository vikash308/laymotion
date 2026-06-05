import { connectDB } from "@/lib/db";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectDB();
        const todos = await Todo.find().sort({ createdAt: -1 });
        return NextResponse.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
    }
};

export const POST = async (request) => {
    try {
        const { text } = await request.json();
        await connectDB();
        const todo = new Todo({ text });
        await todo.save();
        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        console.error("Error creating todo:", error);
        return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
    }
};

export const PATCH = async (request) => {
    try {
        const { id, completed } = await request.json();
        await connectDB();
        const todo = await Todo.findByIdAndUpdate(
            id,
            { completed },
            { new: true }
        );
        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        return NextResponse.json(todo);
    } catch (error) {
        console.error("Error updating todo:", error);
        return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
    }
};

export const DELETE = async (request) => {
    try {
        const { id } = await request.json();
        await connectDB();
        await Todo.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting todo:", error);
        return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
    }
};
