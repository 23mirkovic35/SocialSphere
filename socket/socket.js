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

const getUserBySocketID = (socketId) => {
  return onlineUsers.find((user) => user.socketId === socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("setFriendSoketID", ({ sender, receiver }) => {
    const user = getUser(receiver);

    console.log(receiver);
    const mySocketId = getUser(sender);
    if (user) {
      io.to(mySocketId.socketId).emit("getFriendSocketID", user.socketId);
    } else {
      io.to(mySocketId.socketId).emit("getFriendSocketID", null);
    }
  });
  socket.on("addOnlineUser", (username) => {
    let added = addUser(username, socket.id);
    console.log(onlineUsers);
    if (added) {
      io.emit("getNewOnlineUsers", getUser(username));
    }
  });

  socket.on("sendFriendRequest", ({ sender, receiver }) => {
    const receiverUser = getUser(receiver);
    if (receiverUser) {
      io.to(receiverUser.socketId).emit("getFriendRequestNotification", sender);
    }
    console.log(sender + " has sent friend request to " + receiver);
  });

  socket.on("cancleFriendRequest", ({ sender, receiver }) => {
    const receiverUser = getUser(receiver);
    io.to(receiverUser.socketId).emit("FriendRequestCanceled", sender);
    console.log(sender + " has sent friend request to " + receiver);
  });

  socket.on("acceptFriendRequest", ({ sender, receiver }) => {
    console.log(sender + " has accepted " + receiver + " friend requests");
    const receiverUser = getUser(receiver);
    io.to(receiverUser.socketId).emit("getFriendRequestAcceptedNotification", {
      sender,
      receiver,
    });
  });

  socket.on("getOnlineFriends", ({ myUsername }) => {
    console.log(myUsername + " want to see all online users.");
    let array = onlineUsers.filter((user) => user.userId !== myUsername);
    const userId = getUser(myUsername);
    io.to(userId.socketId).emit("allOnlineUsers", array);
  });

  socket.on("postLiked", ({ sender, receiver, postId }) => {
    console.log(sender + " has liked " + receiver + " post " + postId);
    const user = getUser(receiver);
    if (user) {
      io.to(user.socketId).emit("PostIsLiked", { sender, receiver, postId });
    }
  });

  socket.on("newPostComment", ({ sender, receiver, postId }) => {
    console.log(sender + " has commented your post with id " + postId);
    const userId = getUser(receiver);
    io.to(userId.socketId).emit("commentNotification", {
      sender: sender,
      receiver: receiver,
      postId: postId,
    });
  });

  socket.on("newMessage", ({ sender, receiver, message }) => {
    console.log(sender + " has sent " + receiver + " a new message");
    const userId = getUser(receiver);
    if (userId)
      io.to(userId.socketId).emit("getNewMessage", {
        sender: sender,
        receiver: receiver,
        message: message,
      });
    const me = getUser(sender);
    io.to(me.socketId).emit("updateConversation");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  socket.on("userIsCalling", ({ myUsername, friendsUsername }) => {
    console.log("user  " + myUsername + " is  calling " + friendsUsername);
    const { socketId } = getUser(friendsUsername);
    const { mySocektID } = getUser(myUsername);
    console.log(socketId);
    io.to(socketId).emit("showCallNotification", {
      sender: myUsername,
      receiver: friendsUsername,
      senderSocketID: mySocektID,
      receiverSocketID: socketId,
    });
  });

  socket.on("NewPostFromMe", ({ username }) => {
    console.log(username + " has just post something");
    io.emit("getNewPost", { username: username });
  });

  socket.on("disconnect", () => {
    const user = getUserBySocketID(socket.id);
    removeUser(socket.id);
    if (user) io.emit("userLeft", user.userId);
  });
});

http.listen(4200, () => {
  console.log("Socket server started on port 4200");
});
