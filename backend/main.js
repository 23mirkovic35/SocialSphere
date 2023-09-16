const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const db_url = "mongodb://localhost/socialSphere";
const bodyParser = require("body-parser");
const PORT = 5000;
const userRouter = require("./routes/user.routes.js");
const mailRouter = require("./routes/mail.routes.js");
const emojiRouter = require("./routes/emoji.routes.js");
const postRouter = require("./routes/post.routes.js");
const groupRouter = require("./routes/group.routes.js");
const conversationRouter = require("./routes/conversation.routes.js");
const messageRouter = require("./routes/message.routes.js");
mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to SocialSphereDB");
  })
  .catch((err) => {
    console.error("Connection Error\n", err);
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());
const router = express.Router();
app.use("/", router);
router.use("/users", userRouter);
router.use("/send-mail", mailRouter);
router.use("/emojis", emojiRouter);
router.use("/posts", postRouter);
router.use("/groups", groupRouter);
router.use("/conversations", conversationRouter);
router.use("/messages", messageRouter);
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
