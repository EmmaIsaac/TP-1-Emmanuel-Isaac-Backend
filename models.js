import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID, createHash } from "node:crypto";
import dotenv from "dotenv";
import { handleError } from "./utils/handleError.js";

// 1° recuperar variables de entorno
dotenv.config();
const PATH_FILE_USER = process.env.PATH_FILE_USER;
const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR;

// 2° Declarar los metodos

const getUsers = (urlfile) => {
  try {
    if (!urlfile) {
      throw new Error("Access denied")
    }

    const exists = existsSync(urlfile);

    if (!exists) {
      writeFileSync(urlfile, JSON.stringify([]));
      return [];
    }

    const users = JSON.parse(readFileSync(urlfile));
    return users;

  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};


const getUserById = (id) => {
  try {
    if (!id) {
      throw new Error("ID is missing");
    }
    
    const users = getUsers(PATH_FILE_USER);
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};


const addUser = (userData) => {
  try {
    const {nombre, apellido, email, password} =  userData;
    
    if (!nombre || !apellido || !email || !password) { 
      throw new Error("Missing data");
    }
    
    if ((typeof nombre !== "string") || (typeof apellido !== "string") || (typeof email !== "string")){
      throw new Error("Data not string");
    }

    if (!email.includes("@")) {
      throw new Error("Invalid Email");
    }

    const users = getUsers(PATH_FILE_USER);

    const findEmail = users.find((user) => user.email === email);

    if (findEmail) {
      throw new Error("Email already exists");
    }

    const hash = createHash("sha256").update(password).digest("hex")
    
    const newUser = 
      {
        id: randomUUID(),
        nombre,
        apellido,
        email,
        password: hash,
        isLoggedIn: false
    }
    
    users.push(newUser);

    writeFileSync(PATH_FILE_USER, JSON.stringify(users));
    return newUser;

  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};


// todos los datos del usuario seleccionado se podrían modificar menos el ID
// si se modifica la pass debería ser nuevamente hasheada
// si se modifica el email, validar que este no exista
const updateUser = (userData) => {
  try {
  } catch (error) {}
};

const deleteUser = (id) => {
  try {
  } catch (error) {}
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };
