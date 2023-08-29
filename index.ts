const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

function capitalize(name: String): String{
    let words: String[] = name.split(" ");
    for(let i: number=0; i<words.length; i++){
        if(words[i].toLowerCase() !== "the" && words[i].toLowerCase() !== "of" && words[i].toLowerCase() !== "and")
        {
            words[i] = words[i][0].toUpperCase() + words[i].substring(1);
        }
    }
    return words.join(" ");
}

mongoose.connect(process.env.MONGO_URL?.toString()).then(console.log("successfully connected"));

const countrySchema = new mongoose.Schema({
    name: String,
    capital: String,
    latitude: Number,
    longitude: Number,
    population: Number,
    code: String,
    continent: String
});

const Country = mongoose.model('Country', countrySchema);

const scoreSchema = new mongoose.Schema({
    name: String,
    score: Number
})

const Score = mongoose.model('Score', scoreSchema);

interface country {
    name: String,
    capital: String,
    latitude: Number,
    longitude: Number,
    population: Number,
    code: String,
    continent: String
}

 app.get("/", async(req: any, res: any): Promise<any> => {
    const countries: country[] = await Country.find().select('-_id -__v');
    res.json(countries);
 })

 app.get("/na", async(req: any, res: any): Promise<any> => {
    const countries: country[] = await Country.find({continent: "North America"}).select('-_id -__v');
    res.json(countries);
 })

 app.get("/eu", async(req: any, res: any): Promise<any> => {
    const countries: country[] = await Country.find({continent: "Europe"}).select('-_id -__v');
    res.json(countries);
 })

 app.get("/as", async(req: any, res: any): Promise<any> => {
    const countries: country[] = await Country.find({continent: "Asia"}).select('-_id -__v');
    res.json(countries);
 })
 
 app.get("/oc", async(req: any, res: any): Promise<any> => {
    const countries: country[] = await Country.find({continent: "Australia"}).select('-_id -__v');
    res.json(countries);
 })

 app.get("/sa", async(req: any, res: any): Promise<any> => {
    const countries: country[] = await Country.find({continent: "South America"}).select('-_id -__v');
    res.json(countries);
 })
 
 app.get("/af", async(req: any, res: any): Promise<any> => {
    const countries: country[] = await Country.find({continent: "Africa"}).select('-_id -__v');
    res.json(countries);
 })

 app.get("/name/:name", async(req: any, res: any): Promise<any> => {
    let name: String = req.params.name;
    name = capitalize(name);
    const countries: country[] = await Country.find({name: name}).select('-_id -__v');
    if(countries.length === 0)
    {
        res.status(404).json("No capitals were found under the name: "+name)
    }
    else
    {
        res.json(countries);
    }
    
 })

 app.get("/capital/:name", async(req: any, res: any): Promise<any> => {
    let name: String = req.params.name;
    name = capitalize(name);
    const countries: country[] = await Country.find({capital: name}).select('-_id -__v');
    if(countries.length === 0)
    {
        res.status(404).json("No countries were found under the name: "+name)
    }
    else
    {
        res.json(countries);
    }
    
 })

 app.get("/population/:comparison/:amount", async(req: any, res:any): Promise<any> => {
    let comparison: String = req.params.comparison;
    let amount: number = parseInt(req.params.amount);
    comparison = capitalize(comparison);
    let countries: object[] = [];

    if(isNaN(amount) || amount >= 1430000000){
        res.status(404).json("invalid value entered for number");
    }
    else{
        if(comparison === "Greater"){
            countries = await Country.find({ population: { $gt: amount } }, { _id: 0, __v: 0 });
        }
        else if(comparison === "Less"){
            countries = await Country.find({ population: { $lt: amount } }, { _id: 0, __v: 0 });
        }
        else{
            res.status(404).json("Comparison method not found");
        }

        res.json(countries);
    }
 })

 app.get("/random", async(req: any, res: any): Promise<any> => {
    const countries: country[] = await Country.aggregate([{$sample: {size: 1}}, { $project: { _id: 0, __v: 0 } }]);
    res.json(countries);
 })

 app.get("/random/:number", async(req: any, res: any): Promise<any> => {
    if(isNaN(parseInt(req.params.number)) || parseInt(req.params.number) >= 195){
        res.status(404).json("invalid value entered for number");
    }
    else{
        const number: Number = parseInt(req.params.number);
        const countries: country[] = await Country.aggregate([{$sample: {size: number}}, { $project: { _id: 0, __v: 0 } }]);
        res.json(countries);
    }
 })

 app.get("/low-score", async function(req: any, res: any): Promise<any>{
    const lowScore = await Score.findOne().sort("score");
    res.json(lowScore);
 })

 app.get("/scores", async function(req: any, res: any): Promise<any>{
    const scores = await Score.find().sort({score: -1}).exec();
    res.json(scores);
 })


 app.post("/score/submit", async (req: any, res: any): Promise<void>=>{
        let scoreInfo = req.body;
        const newScore = new Score({name: scoreInfo.name, score: scoreInfo.score});
        await newScore.save().then(function(err: any){
            if(err){
                console.log(err);
            }
            else{
                console.log("successfully added")
            }

        });
        console.log(newScore);

        const topScoresQuery = Score.find().sort({ score: -1 }).limit(5);
        const topScores = await topScoresQuery.exec();
        console.log(topScores);
        const topScoreIds = topScores.map((score: any) => score._id);
        Score.deleteMany({ _id: { $nin: topScoreIds } }).then(function(){
            console.log("Data deleted")
            res.status(200).send(); // Success
        }).catch(function(error: any){
            console.log(error); // Failure
            res.status(500).send();
        });
 })



 



 



app.listen(5000, function(): void{
    console.log("server listening on port 5000")
})