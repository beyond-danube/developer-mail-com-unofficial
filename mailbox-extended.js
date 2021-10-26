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

    async getStructuredMessage(id) {
        let originalMessage = await super.getMessage(id)

        let messageFlatArray = []
        originalMessage.split('        ').forEach(e => {
            e.split('\r\n').forEach(e => messageFlatArray.push(e))
        })

        return flatMessageArrayToMessage(messageFlatArray)
    }
}

function flatMessageArrayToMessage(array) {
    let from = null
    let to = null
    let subject = null
    let date = null
    let messageText = ''

    let state = states.UNKNOWN;

    for (const line of array) {

        state = states.checkState(line)

        switch (state) {
            case states.UNKNOWN:
                break;
            
            case states.FROM_LINE:
                from = getSecondArrayItemFromString(line)
                break;
            
            case states.TO_LINE:
                to = getSecondArrayItemFromString(line)
                break;
            
            case states.DATE_LINE:
                date = getSecondArrayItemFromString(line)
                break;
            
            case states.SUBJECT_LINE:
                subject = getSecondArrayItemFromString(line)
                break;             
        
            default:
                break;
        }
    }

    return new Message(from, to, date, subject, messageText, messageText)
}

function getSecondArrayItemFromString(line, separator = ': ') {
    return line.split(separator)[1]
}

const states = { 
    MESSAGE_START: 'MESSAGE_START',
    MESSAGE_END: 'MESSAGE_END',
    FROM_LINE: 'FROM_LINE',
    TO_LINE: 'TO_LINE',
    DATE_LINE: 'DATE_LINE',
    SUBJECT_LINE: 'SUBJECT_LINE',
    UNKNOWN: 'UNKNOWN',
    DONE: 'DONE',

    CURRENT_BOUNDARY: undefined,

    checkState: function(line) {

        return line.includes('From: ') ? states.FROM_LINE
        : line.includes('To: ') ? states.TO_LINE 
        : line.includes('Date: ') ? states.DATE_LINE
        : line.includes('Subject: ') ? states.SUBJECT_LINE
        : states.UNKNOWN
    }
}

class Message {
    from
    to
    date
    subject
    messageText
    messageHtml

    constructor(from, to, date, subject, messageText, messageHtml) {
        this.from = from
        this.to = to
        this.date = date
        this.subject = subject
        this.messageText = messageText
        this.messageHtml = messageHtml
    }

}

module.exports = { MailboxExtended: MailboxExtended }
