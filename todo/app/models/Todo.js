import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);