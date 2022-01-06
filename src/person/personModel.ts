import mongoose, { model } from "mongoose";

const personSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "",
            trim: true,
        },
        price: {
            type: Number,
            default: 0
        },
        totalPrice: {
            type: Number,
            default: 0
        },
        parentId: {
            type: String,
            default: ""
        },
        children: {
            type: Array,
            default: []
        }

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true

    }
)

personSchema.virtual("id").get((function (this: { _id: string }) {
    return this._id;
}))

const Person = mongoose.model("Person", personSchema);

export default Person;
