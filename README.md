# Number Classification API

## Overview

This is a simple API that takes a number as input and returns interesting mathematical properties about the number, along with a fun fact. The API calculates whether the number is prime, perfect, Armstrong, and provides the sum of its digits. Additionally, the API fetches a fun fact about the number from the Numbers API.

## Features

- **Prime Number Check**: Determines if the number is prime.
- **Perfect Number Check**: Determines if the number is a perfect number.
- **Armstrong Number Check**: Determines if the number is an Armstrong number.
- **Fun Fact**: Fetches a fun fact about the number from the Numbers API.
- **CORS Handling**: The API supports Cross-Origin Resource Sharing (CORS), so it can be accessed from any domain.

## Technology Stack

- **Express JS**: Web framework for building APIs.

- **Numbers API**: Provides fun facts about numbers.

## API Endpoint

The API exposes the following endpoint:

GET /api/classify-number?number=<number>

### Response Format (200 OK)


{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
Response Format (400 Bad Request)

{
  "number": "alphabet",
  "error": true
}

Setup Instructions
Requirements
Node JS v14+
npm 
Install Dependencies
Clone the repository:

git clone https://github.com/oluwatobi2001/Hng_stage1.git


Install the required Node  dependencies and then run the code via `npm start`




You can access it by visiting the following URL:




https://hng-stage1-fdf1.onrender.com

Example Request
To classify the number 371, make a GET request to:

https://hng-stage1-fdf1.onrender.com/api/classiy-number/classify-number?number=371
Example Response

{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}


Notes
The API checks for errors in the input (i.e., non-integer values) and returns a 400 Bad Request response if invalid data is provided.
The Numbers API is used to fetch fun facts about the number.