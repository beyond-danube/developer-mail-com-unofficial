const Mailbox = require('../index').Mailbox
const assert = require('chai').assert

describe('Basic Developer Mail Tests', function () {
    this._timeout = 10000

    let mail

    let letter = { subject: "Test mail subject", body: "Mail Body", isHtml: true }


    beforeEach(async () => {
        mail = new Mailbox()
        await mail.createMailbox()
    })

    afterEach(async () => {
        await mail.deleteMailbox()
    })

    it('Creatre Mailbox', async function () {

        assert.notEqual(mail.name, undefined)
        assert.notEqual(mail.token, undefined)
    })

    it('Reset Mailbox Token', async function () {
        let initialToken = mail.token
        await mail.resetMailboxToken()

        assert.notEqual(mail.token, initialToken)
    })

    it('Send message to Mailbox', async function() {
        let messagesBeforeSend = await mail.getMessagesIds()

        let result = await mail.sendMessage(letter)

        let messagesAfterSend = await mail.getMessagesIds()

        assert.equal(result, true)
        assert.isAbove(messagesAfterSend.length, messagesBeforeSend.length)
    })

    it('Get Message Ids', async function() {
        await mail.sendMessage(letter)
        await mail.sendMessage(letter)

        let messages = await mail.getMessagesIds()

        assert.equal(messages.length, 2)
    })

    it('Get Message by Id', async function() {
        await mail.sendMessage(letter)

        let messagesIds = await mail.getMessagesIds()
        let message = await mail.getMessageById(messagesIds[0])

        let result = message.includes(mail.name)

        assert.isTrue(result)
    })

    it('Get All Messages', async function() {
        await mail.sendMessage(letter)
        await mail.sendMessage(letter)

        let result = await mail.getAllMessages()

        assert.equal(result.length, 2)

        result.forEach(message => {
            assert.isNotEmpty(message.key)
            assert.isNotEmpty(message.value)
        })
    })

    it('Delete Mailbox', async function () {
        let result = await mail.deleteMailbox()

        assert.equal(result, true)
    })
})