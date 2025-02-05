const express = require('express');
const axios = require("axios");
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const checkPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const checkPerfect = (num) => {
    if (num <= 1) return false;
    let sumOfDivisor = 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            sumOfDivisor += i;
            if (i !== num / i) sumOfDivisor += num / i; // Add pair divisor
        }
    }
    return sumOfDivisor === num;
};

const sumDigit = (num) => {
    return num.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
};

const checkArmstrong = (num) => {
    const digits = num.toString().split("");
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), power), 0);
    if (sum === num) {
        return "armstrong"
    } 
    return ;
};

const checkOdd = (num) => {
    return num % 2 === 0 ? "even" : "odd";
};

const funFact = async (num) => {
    try {
        const api_url = `http://numbersapi.com/${num}/trivia`;
        const response = await axios.get(api_url);
        return response.data;
    } catch (error) {
        return "No fun fact available.";
    }
};

// ✅ FIXED ROUTE
app.get("/api/classify-number", async (req, res) => {
    try {
        const { number } = req.query;

        if(!req.query ) {
            res.status(500).json({
                "detail":
                [{"type":"missing","loc":["query","number"],"msg":"Field required","input":null}]
            })
        }
        if(number == null) {
            res.status(500).json({
                "detail":
                [{"type":"missing","loc":["query","number"],"msg":"Field required","input":null}]
            })
        }
        const newNum = Number(number);

        const numberFormatted = Math.abs(newNum);

        if (isNaN(numberFormatted)) {
            return res.status(400).json({
                "number": number,
                "error": true
            });
        }

        const fact = await funFact(numberFormatted); 
     
        const propertiesSection =(numberFormatted)=>{
            checkOdd(numberFormatted)
            if(checkArmstrong(numberFormatted)) {
                return ["armstrong", checkOdd(numberFormatted)]
            }
            else {
                return[checkOdd(numberFormatted)]
            }

        }

        res.status(200).json({
            "number": numberFormatted,
            "is_prime": checkPrime(numberFormatted),
            "is_perfect": checkPerfect(numberFormatted),
            "properties": propertiesSection(numberFormatted),
            "digit_sum": sumDigit(numberFormatted),
            "fun_fact": fact
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            "error": "Internal Server Error"
        });
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running...");
});
