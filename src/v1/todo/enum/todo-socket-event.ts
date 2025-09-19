export enum TodoSocketEvent {
  // Client -> Server
  createTodo = "todo:create",
  updateTodo = "todo:update",
  deleteTodo = "todo:delete",

  // Server -> Client
  createdTodo = "todo:created",
  updatedTodo = "todo:updated",
  deletedTodo = "todo:deleted",

  //room
  todoRoomPrefix = "todo-room:",
}
