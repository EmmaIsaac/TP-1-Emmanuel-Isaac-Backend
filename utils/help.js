import { readFileSync } from "node:fs";
import dotenv from "dotenv";

dotenv.config();

const help = () => {
  const readHelp = readFileSync(process.env.PATH_FILE_HELP, "utf-8");
    return readHelp;  
};

export {help};