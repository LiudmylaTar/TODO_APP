import { createAction } from "@reduxjs/toolkit";

export const actionAddToDo = createAction("ToDo/addToDo");

export const actionDeleteToDo = createAction("ToDo/deleteToDo");
export const actionToggleCompleted = createAction("ToDo/toggleCompleted");
