/** External Import */
import { exec } from "child_process";

/** service for run bash script for python */
export const runBashScript = async (script: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      exec(script, (error, stdout, stderr) => {
        if (!error) {
          const result = stdout.toString().replace("\n", " ");
          resolve(result);
        } else {
          reject(stderr.toString().replace("\n", " "));
        }
      });
    } catch (error) {
      reject(error);
    }
  }).catch((error) => {
    throw error;
  });
};
