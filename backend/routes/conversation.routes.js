const express = require('express')
const conversationController = require('../controllers/conversation.controller')
const conversationRouter=express.Router();

conversationRouter.route('/getConversations').post(
    (req,res)=>new conversationController().getConversationsForUser(req,res)
);

conversationRouter.route('/updateLastMessage').post(
    (req,res)=>new conversationController().updateLastMessage(req,res)
);

module.exports = conversationRouter;