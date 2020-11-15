import { exec } from "child_process";

export async function execPromise(command: string): Promise<string> {
  const output = new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        reject();
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        reject();
      }
      resolve(stdout);
    });
  });

  return output;
}
