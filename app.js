import http from "http";
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";

const port=4350;
const host="localhost";
const app=express();
const server=http.createServer(app);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post("/convert-temperature",(req,res)=>{
    const tempnum=req.body.tempnum;
    const type=req.body.type;
    if(isNaN(tempnum) || type!=="CtoF" && type!=="FtoC"){
        return res.status(400).json({
            message:"Use number and CtoF or FtoC"
        })
    }
    let converted;
    let unit;
    if(type=="CtoF"){
        converted=(tempnum*9)/5+32;
        unit="fahnereit";
     }else if(type=="FtoC"){
        converted=(tempnum-32)*5/9;
        unit="celcius";
        
    }
    res.status(200).json({
        message:"Conversion successful",
        conversionType:type,
        result:converted,
        unit:unit
    })

    
})
server.listen(port,host,()=>{
    console.log("It works");
})