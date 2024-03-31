require("dotenv").config();

const express = require("express");
const next = require("next");

const isDev = process.env.NODE_ENV != "production";
const app = next({dev: isDev});
const handle = app.getRequestHandler();

app.prepare().then(()=>{
    const server = express();

    // Handle custom routes or middleware as needed.

    // The request handler function is responsible for delegating incoming HTTP requests to the appropriate page component
    server.get("*", (req, res)=>{
        return handle(req, res);
    })

    server.listen(3000, (err)=>{
        if(err){
            throw err;
        }
        console.log("Server running on port 3000");
    })
})




