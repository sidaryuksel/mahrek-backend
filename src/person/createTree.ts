import Person from "./personModel";

export default async function createTree(nodes: any) {
    //let queue = [...nodes];
    try {

        const newNodes = await Promise.all(nodes.map(async (node: any) => {
            try {
                let id = node.id

                const getChildren = await Person.find({ parentId: id });
                if (getChildren.length == 0) { return };

                node.children = getChildren;

                await createTree(node.children);

            } catch (err) {
                console.log(err);
            }
        }));

        /*
        while (queue.length != 0) {
            let newNode = queue.shift();
            let id = newNode.id;
            const getChildren = await Person.find({ parentId: id });
            queue.push(...getChildren);
            newNode = { ...newNode._doc, children: getChildren };
            console.log("newparent: ", newParent);
    
        }*/
        return newNodes;
    } catch (err) {
        console.log("creating a tree has problem: ", err)
    }

};