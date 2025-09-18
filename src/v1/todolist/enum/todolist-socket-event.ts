export enum TodolistSocketEvent {
  // Client -> Server
  createTodolist = "todolist:create",
  updateTodolist = "todolist:update",
  deleteTodolist = "todolist:delete",

  // Server -> Client
  createdTodolist = "todolist:created",
  updatedTodolist = "todolist:updated",
  deletedTodolist = "todolist:deleted",

  //room
  todolistRoomPrefix = "todolist-room:",
}
