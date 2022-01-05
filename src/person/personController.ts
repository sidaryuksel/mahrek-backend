import Person from "./personModel";
import {RequestHandler} from "express";

export const getPerson: RequestHandler = async (req, res) => {
    try {
        const persons = await Person.find();
        console.log("get people: ",persons);
        if(persons.length === 0)
            res.status(204)
                .json({status: "success", message: "No Person in database!"});
        else
            res.status(200)
            .json({status: "success", message: "Persons found", data: persons});
    }catch(err){
        res.status(500).json({
            status: "fail",
            message: "Some error occured, please reffer the error",
            err,
        });
    }
};

export const updateNode: RequestHandler = async (req, res) => {
    console.log("update: ", req.body.data); 
	console.log(req.params.id);
	try {
		if (req.body.data.id === undefined)
			res
				.status(400)
				.json({ status: "fail", message: "Request Body is not acceptable!" });
		else {
			const updateNode = await Person.findByIdAndUpdate(req.params.id,{
				name: req.body.data.name,
				price: req.body.data.price
			});
            console.log("update person: ", updateNode);
			res.status(200).json({
				status: "success",
				message: "Person Updated",
				data: { person: updateNode },
			});
		}
	} catch (err) {        
        console.log("update 500 err: ",err);

		res.status(500).json({
			status: "fail",
			message: "Some error occured please reffer the error",
			err,
		});
	}
	
};


export const createNode: RequestHandler = async (req, res) => {

	const node = {
		name: "",
		price: 0,
		totalPrice: 0,
		parentId: req.body.parentId
	} 
	console.log("create: ", node);

	try {
		if (req.body.parentId === undefined)
			res
				.status(400)
				.json({ status: "fail", message: "Request is not acceptable!" });
		else {
			const createNode = await Person.create(node);
            console.log("create node: ", createNode);
			res.status(201).json({
				status: "success",
				message: "Person Updated",
				data: createNode,
			});
		}
		
	} catch (err) {        
        console.log("update 500 err: ",err);

		res.status(500).json({
			status: "fail",
			message: "Some error occured please reffer the error",
			err,
		});
	}
	
};
