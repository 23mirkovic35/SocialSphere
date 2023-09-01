const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:4200"],
  },
});

let onlineUsers = [];

const addUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
  return onlineUsers.some((user) => user.userId === userId);
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("addOnlineUser", (username) => {
    let added = addUser(username, socket.id);
    console.log(onlineUsers);
    if (added) io.emit("newOnlineUser", { username });
  });

  socket.on("sendFriendRequest", ({ sender, receiver }) => {
    const receiverUser = getUser(receiver);
    io.to(receiverUser.socketId).emit("getFriendRequestNotification", sender);
    console.log(sender + " has sent friend request to " + receiver);
  });

  socket.on("cancleFriendRequest", ({ sender, receiver }) => {
    const receiverUser = getUser(receiver);
    io.to(receiverUser.socketId).emit("FriendRequestCanceled", sender);
    console.log(sender + " has sent friend request to " + receiver);
  });

  socket.on("acceptFriendRequest", ({ sender, receiver }) => {
    const receiverUser = getUser(receiver);
    io.to(receiverUser.socketId).emit("getFriendRequestAcceptedNotification", {
      sender,
      receiver,
    });
    console.log(sender + " has accepted friend request from " + receiver);
  });

  socket.on("getOnlineFriends", () => {
    let usernameArray = [];
    for (let i = 0; i < onlineUsers.length; i++) {
      usernameArray.push(onlineUsers[i].userId);
    }
    io.emit("allOnlineUsers", { usernameArray });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

http.listen(4200, () => {
  console.log("Socket server started on port 4200");
});
