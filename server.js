import express from 'express'
import cors from 'cors';
import path from 'node:path';

const app = express();
const PORT = 5000;

app.use(express());
app.use(cors());



app.post("/student", (req, res) => {
    const reqBody = req.body;
    if(!reqBody.firstName || !reqBody.lastName || !reqBody.course || !reqBody.batch || !reqBody.rollNum || !reqBody.age){
        res.status(400).send({ status: "ERROR", message: "Required Parameter Missing!" })
        return;
    }

    try {
        const databaseRes = db.query(`INSERT INTO students (first_name, last_name, course, batch, roll_number, age)
            VALUES
            ($1,
            $2,
            $3,
            $4,
            $5,
            $6);` [reqBody.firstName, reqBody.lastName, reqBody.course, reqBody.batch, reqBody.rollNum, reqBody.age])
            res.status(201).send({ status: "success", message: "student Added Successfuly" })
    } catch (error) {
        console.log("Err", error);
        res.status(500).send({ status: 'error', message: "Internal Server Error" })
    }

});


// Get Api (For Get Data) //
app.get("/", async (req, res) => {
    try {
        const students = await db.query(`SELECT * FROM students:`)
        res.status(200).send({ status: "success", message: students.rows })
    } catch (error) {
        res.status(500).send({status: "ERROR", message: "Internal Server Error"})
    }
});

// Edit Api (For Update) //
app.put("/", (req, res) => {
    
});

// Delete Api (For Delete) //
app.delete("/", (req, res) => {
    
});

//
app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})

// Static Hosting //
const _dirName = path.resolve();
const __frontend = path.join(__dirname, './web/build');
app.use('/', express.static(__frontend));
app.use("/*splat", express.static(__frontend));
