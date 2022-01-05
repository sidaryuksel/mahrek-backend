import mongoose, { model } from "mongoose";

const personSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            default: 0
        },
        totalPrice: {
            type: Number,
            default: 0
        },
        name: {
            type: String,
            default: "" 
        },
        children: Array

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

personSchema.virtual("id").get((function (this: {_id: string}) {
    return this._id;
}))

const Person = mongoose.model("Person", personSchema);

export default Person;
