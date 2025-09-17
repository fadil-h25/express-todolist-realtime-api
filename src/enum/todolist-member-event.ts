export enum TodolistMemberSocketEvent {
  // Client -> Server
  addMember = "todolistMember:add",
  updateMember = "todolistMember:update",
  removeMember = "todolistMember:remove",

  // Server -> Client
  memberAdded = "todolistMember:added",
  memberUpdated = "todolistMember:updated",
  memberRemoved = "todolistMember:removed",
}
