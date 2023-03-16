/** Internal Import */
import { runBashScript } from "../../services/bashScript/service.bashScript";

/** Run Bash Script Throw API */

/** Run python script */
export const runPythonScript = async (req: any, res: any, next: any) => {
  try {
    const script = `bash src/scripts/bash/run_python.sh`;
    const result = await runBashScript(script).catch((error: any) => {
      throw error;
    });
    res.status(200).send({ data: result, message: "run script successfully" });
  } catch (error) {
    res.status(500).send({ data: null, message: error });
  }
};

/** Run Docker MongoDb Backup Scripts */
export const runMongoDbBackupScript = async (req: any, res: any, next: any) => {
  try {
    const script = `bash src/scripts/bash/docker_mongodb_backup_scripts.sh`;
    const result:any = await runBashScript(script).catch((error: any) => {
      throw error;
    });
    const data = result.split(',');
    res.status(200).send({ File_Path: data[0], Log_File: data[1], message: data[2] });
  } catch (error) {
    const data = error.split(',');
    res.status(500).send({ Error_Log: data[0], message: data[1] });
  }
};
