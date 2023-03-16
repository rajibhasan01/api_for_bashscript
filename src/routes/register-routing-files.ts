// External import
import express from "express";

// Internal import
import bashScriptRoute from "./bash_script/bash.script.route";

// Create a new router object
const registeredRouters = express.Router();

registeredRouters.use("/bash-script", bashScriptRoute);

export = registeredRouters;