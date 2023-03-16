/** External import */
import express from "express";

/** Internal import */
import {runPythonScript, runMongoDbBackupScript} from "../../controllers/bashScript/controller.bashScript";

const bashScriptRoute = express.Router();

/** Server Route for Python Bash Script */
bashScriptRoute.get('/python-script', runPythonScript);

/** Server Route for MongoDb Backup Script */
bashScriptRoute.get('/docker-mongodb-backup', runMongoDbBackupScript);

export = bashScriptRoute;

