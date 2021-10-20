const MailboxExtended = require('../mailbox-extended').MailboxExtended
const assert = require('chai').assert

describe('Extended Developer Mail Tests', function () {
    this._timeout = 20000

    let mail

    let letter = { subject: "Test mail subject", body: "Mail Body", isHtml: true }


    beforeEach(async () => {
        mail = new MailboxExtended()
        await mail.createMailbox()
    })

    afterEach(async () => {
        await mail.deleteMailbox()
    })
    
    it('Last Message', async function(){
        await mail.sendMessage(letter)

        let newLetter = { subject: "New mail subject", body: "New Mail Body", isHtml: true }
        await mail.sendMessage(newLetter)

        let lastMessage = await mail.getLastMessage()
        let result = lastMessage.includes(newLetter.body)

        assert.isTrue(result)
    })

    it('Structured Message', async function(){
        assert.isTrue(false)
    })

    it('New Messages Since Time', async function(){
        assert.isTrue(false)
    })
})
