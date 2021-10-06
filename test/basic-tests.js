const Mailbox = require('../index').Mailbox
const assert = require('chai').assert

describe('Basic Developer Mail Tests', function () {
    this._timeout = 120000

    let mail;

    it('Creatre Mailbox', async function () {
        mail = new Mailbox()
        let result = await mail.createMailbox()

        assert.notEqual(result.name, undefined)
        assert.notEqual(result.token, undefined)
    })

    it('Reset Mailbox Token', async function () {
        let initialToken = mail.token
        await mail.resetMailboxToken()

        assert.notEqual(mail.token, initialToken)
    })

    it('Send message to Mailbox', async function() {
        let result = await mail.sendMessage({ subject: "Test mail subject", body: "Mail Body", isHtml: true })

        assert.equal(result, true)
    })

    it('Delete Mailbox', async function () {
        let result = await mail.deleteMailbox()

        assert.equal(result, true)
    })
})