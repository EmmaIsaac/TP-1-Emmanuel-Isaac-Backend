// 1° objetener los argumentos pasador por terminal (que vienen del index)
// 2° desarrollar las funciones que crean los objetos para añadir un usario y actualizar un usuario
// 3° aplicar control de errores entorno a las posibilidades de que surja uno
import { handleError } from "./handleError.js";
import dotenv from "dotenv";

dotenv.config();
const createUserObject = (args) => {
  try {
    const [nombre, apellido, email, password] = args.slice(1); 

  if (!nombre || !apellido || !email || !password) {
    throw new Error("Missing data2");
  }

  return {
    nombre, 
    apellido, 
    email, 
    password
  };
  } catch (error) {
    const objError = handleError(error, process.env.PATH_FILE_ERROR);
    return objError;
  }
};

const createUpdateUserObject = (args) => {
  try {
  } catch (error) {}
};

export { createUserObject, createUpdateUserObject };
