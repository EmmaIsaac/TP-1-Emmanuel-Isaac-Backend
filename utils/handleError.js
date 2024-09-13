import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const handleError = (error, path) => {
    const dbError = JSON.parse(readFileSync(path));
    const newError = {
        id : randomUUID(),
        type: error.message,
        date: new Date().toISOString(),
    };

    dbError.push(newError);
    writeFileSync(path, JSON.stringify(dbError));
    return newError;
};

export { handleError };