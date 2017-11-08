const salesforceIdValidator = require('../src/index');

const validationExpectations = [
  // input,                valid, error
  [''                    , false, 'ID_IS_NOT_A_STRING'],
  [undefined             , false, 'ID_IS_NOT_A_STRING'],
  [null                  , false, 'ID_IS_NOT_A_STRING'],
  ['12345678901234asd '  , false, 'INVALID_LENGTH'    ],
  ['1234567890asd%\n\rsd', false, 'INVALID_CHARACTERS'],
  ['XXXA0000006Vm9uIAC'  , false, 'INVALID_PREFIX'    ],
  ['001A0000006Vm9uIAA'  , false, 'INVALID_CHECKSUM'  ],
  ['001A0000006Vm9uIAC'  , true , null                ],
];

const generationExpectations = [
  // input,                valid, error
  [''                 , false, 'ID_IS_NOT_A_STRING', null],
  [undefined          , false, 'ID_IS_NOT_A_STRING', null],
  [null               , false, 'ID_IS_NOT_A_STRING', null],
  ['12345678901asd '  , false, 'INVALID_LENGTH'    , null],
  ['1234590asd%\n\rsd', false, 'INVALID_CHARACTERS', null],
  ['XXXA0000006Vm9u'  , false, 'INVALID_PREFIX'    , null],
  ['001A0000006Vm9u'  , true , null                , '001A0000006Vm9uIAC'],
];

let errors = 0;

// TEST validateId18
validationExpectations.forEach(expectation => {
  result = salesforceIdValidator.validateId18(expectation[0]);

  if (result.valid !== expectation[1]) {
    console.error(
      `For input '${expectation[0]}', Expected  '${expectation[1]}', Got '${result.valid}'`
    );
    errors++;
  }

  if (result.error !== expectation[2]) {
    console.error(
      `For input '${expectation[0]}', Expected  '${expectation[2]}', Got '${result.error}'`
    );
    errors++;
  }
});


// TEST generateId18FromId15
generationExpectations.forEach(expectation => {
  result = salesforceIdValidator.generateId18FromId15(expectation[0]);

  if (result.valid !== expectation[1]) {
    console.error(
      `For input '${expectation[0]}', Expected  '${expectation[1]}', Got '${result.valid}'`
    );
    errors++;
  }

  if (result.error !== expectation[2]) {
    console.error(
      `For input '${expectation[0]}', Expected  '${expectation[2]}', Got '${result.error}'`
    );
    errors++;
  }

  if (result.id18 !== expectation[3]) {
    console.error(
      `For input '${expectation[0]}', Expected  '${expectation[3]}', Got '${result.id18}'`
    );
    errors++;
  }
});

if (errors > 0) {
  console.log(`Total of ${errors} occured.`);
  process.exit(1);
}

console.log('All tests passed.');