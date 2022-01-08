import Person from "./personModel";

export default async function totalPriceUpdate(id: any, diff: number) {
    try {
        const node = await Person.findById(id);
        node.totalPrice += diff;
        node.save();
        console.log("saved node:", node);
        if (node.parentId) {
            await (totalPriceUpdate(node.parentId, diff))
        }
        return node;
    } catch (err) {
        console.log("function error:", err);
    }

}