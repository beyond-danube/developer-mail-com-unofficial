const axios = require('axios')

const devMailApi = {
    BASE_URL: 'https://www.developermail.com/api/v1/mailbox',
    MESSAGES: 'messages',
    TOKEN: 'token',

    baseUrl: function () {
        return this.BASE_URL
    },

    mailBoxUrl: function (mailbox) {
        if (!mailbox) {
            throw new Error("Mailbox not provided (incorrect, null or undefined)")
        }

        return `${this.BASE_URL}/${mailbox}`
    },

    messagesUrl: function (mailbox) {
        return `${this.mailBoxUrl(mailbox)}/${this.MESSAGES}`
    },

    messageByIdUrl: function (mailbox, id) {
        return `${this.messagesUrl(mailbox)}/${id}`
    },

    tokenUrl: function (mailbox) {
        return `${this.mailBoxUrl(mailbox)}/${this.TOKEN}`
    }
}

function responseHandler(response) {
    return response.data.success === true ? response.data.result : response.data.errors
}

class Mailbox {
    name
    token
    authHeader
    constructor(name, token) {
        this.name = name;
        this.token = token;
        this.authHeader = { headers: { 'X-MailboxToken': this.token } }
    }

    async createMailbox() {
        let result = await axios.put(devMailApi.baseUrl())

        this.name = result.data.result.name
        this.token = result.data.result.token
        this.authHeader = { headers: { 'X-MailboxToken': this.token } }

        return responseHandler(result)
    }

    async resetMailboxToken() {
        let result = await axios.put(devMailApi.tokenUrl(this.name), this.authHeader)

        let response = responseHandler(result)

        this.token = response === undefined ? this.token : response.token
        return response
    }

    async deleteMailbox() {
        let result = await axios.delete(devMailApi.mailBoxUrl(this.name), this.authHeader)

        return responseHandler(result)
    }	
    
    async getMessagesIds() {
        let result = await axios.get(devMailApi.mailBoxUrl(this.name), this.authHeader)

        return responseHandler(result)
    }

    async getAllMessages() {
        let ids = await this.getMessagesIds()

        let result = await axios.post(devMailApi.messagesUrl(this.name), ids, this.authHeader)

        return responseHandler(result)
    }

    async getMessage(id) {
        let result = await axios.get(devMailApi.messageByIdUrl(this.name, id), this.authHeader)

        return responseHandler(result)
    }

    async sendMessage(mail) {

        let config = this.authHeader

        config.headers['Content-Type'] = 'application/json'
        let result = await axios.put(devMailApi.messagesUrl(this.name), mail, this.authHeader)

        return responseHandler(result)
    }

    async deleteMessage(id) {
        let result = await axios.delete(devMailApi.messageByIdUrl(this.name, id), this.authHeader)

        return responseHandler(result)
    }
    
}

module.exports = { Mailbox: Mailbox }
