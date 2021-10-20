const { Mailbox } = require(".");

class MailboxExtended extends Mailbox {

    constructor(name, token) {
        super(name, token);
    }

    async getLastMessage() {
        let messagesIds = await super.getMessagesIds()
        
        let message = await super.getMessage(messagesIds[messagesIds.length - 1])
        return message
    }

    async getNewMessagesSinceTime(timestamp, margin = 5000) {

    }

    async getStructuredMessage(messageId) {

    }
}

module.exports = { MailboxExtended: MailboxExtended }
