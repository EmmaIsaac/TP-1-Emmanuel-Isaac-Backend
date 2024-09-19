import { handleError } from "./handleError.js";
import dotenv from "dotenv";

dotenv.config();
const createUserObject = (args) => {
  try {
    const [nombre, apellido, email, password] = args.slice(1); 

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
    const [id, nombre, apellido, email, password] = args.slice(1); 

    const updatedUser = {};
    updatedUser.id = id;    
    if (nombre) updatedUser.nombre = nombre;
    if (apellido) updatedUser.apellido = apellido;    
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = password;

    return updatedUser;
  } catch (error) {
    const objError = handleError(error, process.env.PATH_FILE_ERROR);
    return objError;
  }
};

export { createUserObject, createUpdateUserObject };