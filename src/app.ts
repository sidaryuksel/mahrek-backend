import express from "express";
import morgan from "morgan";
import personRoute from "./person/personRoute";

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
}

app.use("/api", personRoute);
app.get("/", (req: any, res: any) => {
    res.send("<h1>Sidar Yüksel Mahrek Project, backend side</h1>");
})
/*
app.put('/update', (req, res) => {
    console.log("update: ", req.body);
})
*/

app.all("*", (req: any, res: any) => {
    res.status(404).json({
        status:"fail",
        message: "This route is not defined!"
    });
})

export default app;