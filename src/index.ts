// External imports
import cors from "cors";
import path from 'path';
import dotenv from "dotenv";
import express from "express";

// Internal imports
import registeredRouters from "./routes/register-routing-files";
import { options } from "./middlewares/common/cors";

const app = express();
const port = process.env.PORT || 5000; // Default port to listen
// Define a route handler for the default home page
app.use(express.json({limit: '50mb'})); // Support json encoded bodies upto 50 mb
app.use(express.urlencoded({ extended: true, limit: '50mb'})); // Support encoded bodies
app.use(cors());
dotenv.config();

// Set views
app.set('views', "views");

// Middle ware for no caching.
// So, after logout we can prevent the browser's back button from accessing restricted information, after the user has logged out?
app.use((req, res, next) => {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
});

// Set static folder
app.use(express.static("uploaded-image"));
app.use(express.static("public"));

// Routing setup
app.use('/', registeredRouters);


// Start the Express server
app.listen(port, ()=> {
    // tslint: disable-next-line:no-console
    console.log(`Server started at http://localhost:${port}`);
});