import express from 'express'
import cors from 'cors';
import { db } from './db.js'
import path from 'node:path';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());



app.post("/student", async (req, res) => {
    const reqBody = req.body;
    if(!reqBody.firstName || !reqBody.lastName || !reqBody.course || !reqBody.batch || !reqBody.rollNum || !reqBody.age){
        res.status(400).send({ status: "ERROR", message: "Required Parameter Missing!" })
        return;
    }

    try {
        const databaseRes = await db.query(`INSERT INTO students (first_name, last_name, course, batch, roll_number, age)
            VALUES
            ($1, $2, $3, $4, $5, $6);`, [reqBody.firstName, reqBody.lastName, reqBody.course, reqBody.batch, reqBody.rollNum, reqBody.age])
            res.status(201).send({ status: "success", message: "student Added Successfuly" })
    } catch (error) {
        console.log("Err", error);
        res.status(500).send({ status: 'error', message: "Internal Server Error" })
    }

});


app.get("/", async (req, res) => {
    try {
        //  res.send("Server is working!");
        const students = await db.query(`SELECT * FROM students;`)
        res.status(200).send({ status: "success", message: students.rows })
    } catch (error) {
        console.log("GET ERROR:", error);
        res.status(500).send({status: "ERROR", message: "Internal Server Error"})
    }
});


app.put("/students/:id", async(req, res) => {
    const studentId = req.params.id 
    const reqBody = req.body

     if(!reqBody.firstName || !reqBody.lastName || !reqBody.course || !reqBody.batch || !reqBody.rollNum || !reqBody.age){
        res.status(400).send({ status: "ERROR", message: "Required Parameter Missing!" })
        return;
     }

     try {
        const dbRes = await db.query(`UPDATE students SET first_name = $1, last_name = $2, course = $3, batch = $4, roll_number = $5, age = $6 WHERE id = ${studentId};`,
            [reqBody.firstName, reqBody.lastName, reqBody.course, reqBody.batch, reqBody.rollNum, reqBody.age])
             res.status(201).send({ status: "success", message: "Student Updated Successfully" })
     } catch (error) {
         console.log("Err", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" })
     }
});


app.delete("/students/:id", async(req, res) => {
    const studentId = req.params.id;
    try {
        const dbRes = await db.query(`DELETE FROM students WHERE id = ${studentId};`)
        res.status(200).send({ status: "success", message: "student Deleted Successfuly" })
    } catch (error) {
        console.log("Err", error)
        res.status(500).send({ status:"ERROR", message: "Internal Server Error" })
        
    }
});

const __dirname = path.resolve();
const __frontend = path.join(__dirname, './web/build');
app.use('/', express.static(__frontend));
app.use("/*splat", express.static(__frontend));


app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})


