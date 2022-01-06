import Person from "./personModel";

export default async function totalPrice(data: any, queue: any){
    
console.log("hwkkozxcsd");
    const childNodes = await Person.find({parentId: data});
    if(childNodes.length == 0) return;

    childNodes.map((child: any) => {
        queue.push(child.price);
        console.log("map child:", child);
        totalPrice(child._id, queue)
    })

}