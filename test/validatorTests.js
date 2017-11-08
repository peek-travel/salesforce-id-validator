const salesforceIdValidator = require('../src/index');

const validationExpectations = [
  // input, valid, error
  [''                    , false, 'ID_IS_NOT_A_STRING'],
  [undefined             , false, 'ID_IS_NOT_A_STRING'],
  [null                  , false, 'ID_IS_NOT_A_STRING'],
  ['12345678901234asd '  , false, 'INVALID_LENGTH'    ],
  ['1234567890asd%\n\rsd', false, 'INVALID_CHARACTERS'],
  ['XXXA0000006Vm9uIAC'  , false, 'INVALID_PREFIX'    ],
  ['001A0000006Vm9uIAA'  , false, 'INVALID_CHECKSUM'  ],
  ['001A0000006Vm9uIAC'  , true , null                ],
];

let errors = 0;

validationExpectations.forEach(expectation => {
  result = salesforceIdValidator.validateId18(expectation[0]);

  if (result.valid !== expectation[1]) {
    console.error(`${result.valid} !== ${expectation[1]}`);
    errors++;
  }

  if (result.error !== expectation[2]) {
    console.error(`${result.error} !== ${expectation[2]}`);
    errors++;
  }
});

if (errors != 0) {
  console.log(`Total of ${errors} occured.`);
  process.exit(1);
}

console.log('All tests passed.');