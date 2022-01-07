import Person from "./personModel";
import { RequestHandler } from "express";
import createTree from './createTree';
import totalPrice from './totalPrice';
import Pusher from "pusher";




export const getPerson: RequestHandler = async (req, res) => {

	try {
		let treeRoot = await Person.find({ parentId: "" });

		const result = await createTree(treeRoot);

		if (treeRoot.length === 0)
			res.status(204)
				.json({ status: "success", message: "No Person in database!" });
		else
			res.status(200)
				.json({ status: "success", message: "Persons found", data: treeRoot });

	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: "Some error occured, please reffer the error",
			err,
		});
	}
};

export const clearNodeAndChildren: RequestHandler = async (req, res) => {
	let stack = [];
	try {
		if (req.params.id === undefined)
			res
				.status(400)
				.json({ status: "fail", message: "Request body is not acceptable!" });
		else {
			await Person.findByIdAndDelete(req.params.id);
			stack.push(req.params.id);
			while (stack.length != 0) {
				let nodeId = stack.pop();
				const foundNodes = await Person.find({ parentId: nodeId });
				foundNodes.forEach(async (node) => {
					stack.push(node.id);
					const deleted = await Person.findByIdAndDelete(node.id);
				})
			}
		}

	} catch (err) {

		res.status(500).json({
			status: "fail",
			message: "Some error occured during delete operation, please reffer the error",
			err,
		});
	}
}

export const updateNode: RequestHandler = async (req, res) => {

	try {
		if (req.body.data.id === undefined)
			res
				.status(400)
				.json({ status: "fail", message: "Request Body is not acceptable!" });
		else {
			const updateNode = await Person.findByIdAndUpdate(req.params.id, {
				name: req.body.data.name,
				price: req.body.data.price
			});
			res.status(200).json({
				status: "success",
				message: "Person Updated",
				data: { person: updateNode },
			});
		}
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: "Some error occured please reffer the error",
			err,
		});
	}

};

export const updateTotal: RequestHandler = async (req, res) => {
	console.log("total req body:", req.body.data);
	try {
		if (req.body.data.id === undefined)
			res
				.status(400)
				.json({ status: "fail", message: "Request Body is not acceptable!" });
		else {
			let queue:any = [];
			totalPrice(req.params.id, queue);

			console.log("queue: ", queue);
			
			res.status(200).json({
				status: "success",
				message: "Total price Updated",
				data: { person: queue },
			});
		}
	} catch (err) {
		//console.log("update 500 err: ",err);

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
	//console.log("create: ", node);

	try {
		if (req.body.parentId === undefined)
			res
				.status(400)
				.json({ status: "fail", message: "Request is not acceptable!" });
		else {
			const createNode = await Person.create(node);
			// console.log("create node: ", createNode);
			res.status(201).json({
				status: "success",
				message: "Person Created",
				data: createNode,
			});
		}

	} catch (err) {
		console.log("Create 500 err: ", err);

		res.status(500).json({
			status: "fail",
			message: "Some error occured please reffer the error",
			err,
		});
	}

};
