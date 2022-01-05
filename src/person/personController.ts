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

export const updatePerson: RequestHandler = async (req, res) => {
    console.log("update: ", req.body.person); 
	try {
		if (req.body.person.name === undefined)
			res
				.status(400)
				.json({ status: "fail", message: "Request Body is not acceptable!" });
		else {
			const updatePerson = await Person.findByIdAndUpdate(req.body.person.id, {
                name: req.body.person.name,
				price: req.body.person.price,
                children: [...req.body.person.children]
			});
            console.log("update person: ", updatePerson);
			res.status(200).json({
				status: "success",
				message: "Person Updated",
				data: { person: updatePerson },
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
