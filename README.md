# developer-mail-com-unofficial
![build tests](https://github.com/beyond-danube/developer-mail-com-unofficial/actions/workflows/node.js.yml/badge.svg)

  
Unofficial wrapper for https://www.developermail.com disposable email service.  

Developer Mail is quite nice disposable email service that does not require registration and does not have API calls limit.  

## Module usage
Mailbox class constuctor accepts name and token from Developer Mail. In case you did use it in past, you can use your credentials. If not, you can simply create new Mailbox, credentials will be assigned to class instance.  

### Usage example
```JavaScript
const Mailbox = require('developer-mail-com-unofficial').Mailbox;

(async () => {

    let mail = new Mailbox()
    let credentials = await mail.createMailbox()
    console.log(credentials)

    // some actions where email received

    let messages = await mail.getAllMessages()
    console.log(messages)

    await mail.deleteMailbox()
})();
```

### Important notice
Module is an unoficcial wrapper, it is explicity written in the package name. In case https://www.developermail.com will go down one day, module will stop working as well.
