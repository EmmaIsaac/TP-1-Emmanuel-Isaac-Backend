import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID, createHash } from "node:crypto";
import dotenv from "dotenv";
import { handleError } from "./utils/handleError.js";
import {validateEmail} from "./utils/validateEmail.js";

dotenv.config();
const PATH_FILE_USER = process.env.PATH_FILE_USER;
const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR;

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

    if (!validateEmail(email)) {
      throw new Error("Invalid Email");
    }

    const users = getUsers(PATH_FILE_USER);

    const findEmail = users.find((user) => user.email === email);

    if (findEmail) {
      throw new Error("Email already exists. Try another email.");
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

const updateUser = (userData) => {
  try {
    const {id, nombre, apellido, email, password} =  userData;

    if (!id) {
      throw new Error("ID is missing");
    }

    if (!nombre || !apellido || !email || !password) { 
      throw new Error("Missing data");
    }
    
    if ((typeof nombre !== "string") || (typeof apellido !== "string") || (typeof email !== "string")){
      throw new Error("Data not string");
    }

    if (!validateEmail(email)) {
      throw new Error("Invalid Email");
    }

    const users = getUsers(PATH_FILE_USER);

    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
      throw new Error("User not found");
    }
    //Filtro la lista de usuarios excluyendo al id cargado
    const filteredUsers = users.filter((user) => user.id !== id);
    //Con la lista filtrada, busco que otra cuenta no este usando el email que se quiere actualizar
    const foundEmail = filteredUsers.find((user) => user.email === email);
    //Si otra cuenta posee el email, arroja el error
    if (foundEmail) {
      throw new Error("Email already exists. Try another email.")
    }

    if (nombre) foundUser.nombre = nombre;
    if (apellido) foundUser.apellido = apellido;
    if (email) foundUser.email = email;
    const hash = createHash("sha256").update(password).digest("hex")
    if (password) foundUser.password = hash;

    writeFileSync(PATH_FILE_USER, JSON.stringify(users));
    return foundUser;

  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

const deleteUser = (id) => {
  try {
    if (!id) {
      throw new Error("ID is missing");
    }

    const users = getUsers(PATH_FILE_USER);
    const userToDelete = getUserById(id);

    const filteredUsers = users.filter((user) => user.id !== id);

    writeFileSync(PATH_FILE_USER, JSON.stringify(filteredUsers));
    return userToDelete;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };