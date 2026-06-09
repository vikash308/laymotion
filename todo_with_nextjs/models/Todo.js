import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
export default Todo;
