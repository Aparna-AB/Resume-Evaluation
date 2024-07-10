const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 8180;

const { connectDB } = require("./connectDb.js");
const { resumeRoutes } = require("./Resume/resume.routes.js");


app.get("/", (req, res) => {
    res.send("Home Page");
});
app.use("/resume", resumeRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Running on the port http://localhost:${PORT}`);
    })
})