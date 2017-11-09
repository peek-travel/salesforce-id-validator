# salesforce-id-validator
A Library to validate and convert to Salesforce 18IDs


## Install via NPM

```
npm install --save salesforce-id-validator
```

## Usage


### Validate a given ID18

```
const salesforceIdValidator = require('salesforce-id-validator');

salesforceIdValidator.validateId18('001A00000006Vm9uIAC');

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

```


### Generate a ID18 from a ID15

```
const salesforceIdValidator = require('salesforce-id-validator');

salesforceIdValidator.generateId18FromId15('001A00000006Vm9u');

  {
    valid: true,
    error: null,
    id18: '001A00000006Vm9uIAC'
  }
```

## Using Validator in browser

Grab a copy of either `salesforce-id-validator.js` or the minified version
`salesforce-id-validator.min.js` and add it to your HTML file like this:

```
<script src=".../salesforce-id-validator.min.js"></script>
```

It will automatically hook into the `window` object and can be accessed like this

``` 
window.salesforceIdValidator.validateId18( ... )
```

### CAVEAT

DON'T USE THE RESULT IN AN IF CLAUSE,
BECAUSE IT WILL ALWAYS EVALUATE TO TRUE SINCE IT'S AN OBJECT!!!

### Errors

- `ID_IS_NOT_A_STRING`: id is not a string
- `INVALID_LENGTH`: id not 18 characters long, 15 if you are using `generateId18FromId15` function
- `INVALID_CHARACTERS`: id contains invalid characters; (only `[0-9a-zA-Z]`)
- `INVALID_PREFIX`: prefix unkown to salesforce ![Help Doc](https://help.salesforce.com/articleView?id=Standard-Field-Record-ID-Prefix-Decoder&language=en_US&type=1)
- `INVALID_CHECKSUM`: checksum calculation doesn't match with the provided one ![Useful Blog Post](https://astadiaemea.wordpress.com/2010/06/21/15-or-18-character-ids-in-salesforce-com-%E2%80%93-do-you-know-how-useful-unique-ids-are-to-your-development-effort/)

