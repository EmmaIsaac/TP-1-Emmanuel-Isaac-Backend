import { getUsers, getUserById, addUser, updateUser, deleteUser } from "./models.js";
import dotenv from "dotenv";
import {createUserObject, createUpdateUserObject} from "./utils/createObjetcUser.js";
import { handleError } from "./utils/handleError.js";
import { help } from "./utils/help.js";

dotenv.config();

const args = process.argv.splice(2);
const option = args[0];

switch (option) {
  case "list":
    console.log(getUsers(process.env.PATH_FILE_USER));
    break;
  case "search":
    console.log(getUserById(args[1]));
    break;
  case "add":
    const newUser = createUserObject(args);
    console.log(addUser(newUser));
    break;
  case "update":
    const updatedUser = createUpdateUserObject(args);
    console.log(updateUser(updatedUser));
    break;
  case "delete":
    console.log(deleteUser(args[1]));
    break;
  case "help":
  console.log(help());
  break;
  default:
    const error = handleError(
      new Error("Comand Incorrect"),
      process.env.PATH_FILE_ERROR
    );
    console.log(error);
    break;
}