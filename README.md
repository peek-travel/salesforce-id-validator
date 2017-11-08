# salesforce-id-validator
A Library to validate and convert to Salesforce 18IDs


## Install via NPM

```
npm install salesforce-id-validator -s
```

## Usage

```
> const salesforceIdValidator = require('salesforce-id-validator');

// validate a given ID18
> result = salesforceIdValidator.validateId18('001A00000006Vm9uIAC');
> result
{
  valid: true,
  error: null,
  meta: {
    entityType: 'ACCOUNT',
    serverId: 'A0',
    identifier: '0000006Vm9u',
    extractedChecksum: 'IAC',
    calculatedChecksum: 'IAC'    
  }
}

> result.valid
true


// generate a ID18 from a ID15
> salesforceIdValidator.generateId18FromId15('001A00000006Vm9u');
{
  valid: true,
  error: null,
  id18: '001A00000006Vm9uIAC'
}


// CAVEAT
// DON'T USE THE RESULT IN A IF CLAUSE,
// BECAUSE IT WILL ALWAYS EVALUATE TO TRUE SINCE ITS AN OBJECT!!!

```

### Errors

- `ID_IS_NOT_A_STRING`: id is not a string
- `INVALID_LENGTH`: id not 18 characters long, 15 if you are using `generateId18FromId15` function
- `INVALID_CHARACTERS`: id contains invalid characters; (only [0-9a-zA-Z])
- `INVALID_PREFIX`: prefix unkown to salesforce ![Help Doc](https://help.salesforce.com/articleView?id=Standard-Field-Record-ID-Prefix-Decoder&language=en_US&type=1)
- `INVAILD_CHECKSUM`: checksum calculation doesn't match with the provided one ![Useful Blog Post](https://astadiaemea.wordpress.com/2010/06/21/15-or-18-character-ids-in-salesforce-com-%E2%80%93-do-you-know-how-useful-unique-ids-are-to-your-development-effort/)

