const prefixLookupTable = require('./prefixLookupTable');
const checksumLookupTable = require('./checksumLookupTable');

const errorCodes = {
  ID_IS_NOT_A_STRING :'ID_IS_NOT_A_STRING',
  INVALID_LENGTH     :'INVALID_LENGTH',
  INVALID_CHARACTERS :'INVALID_CHARACTERS',
  INVALID_PREFIX     :'INVALID_PREFIX',
  INVALID_CHECKSUM   :'INVALID_CHECKSUM',
};

const salesforceIdRegexp = new RegExp(/^[0-9A-Za-z]+$/);


// Helper functions
const splitSfId15 = (str) => [
  str.substring(0, 5),
  str.substring(5, 10),
  str.substring(10, 15)
];


const replaceUpperWith1 = (array) => array.map(char =>
  (char >= 'A' && char <= 'Z') ? 1 : 0);


const calcChecksum = (sfId15) => {
  return splitSfId15(sfId15)
    .map(part => part.split('').reverse())  // split & reverse
    .map(replaceUpperWith1)
    .map(part => checksumLookupTable[part.join('')])
    .join('');
};

const basicValidationError = (id, stringLength) => {
  if (!id || typeof id !== 'string') {
    return errorCodes.ID_IS_NOT_A_STRING;
  }

  id = id.trim();

  if (id.length !== stringLength) {
    return errorCodes.INVALID_LENGTH;
  }

  if (id.match(salesforceIdRegexp) === null) {
    return errorCodes.INVALID_CHARACTERS;
  }

  if (!prefixLookupTable.hasOwnProperty(id.substring(0,3))) {
    return errorCodes.INVALID_PREFIX;
  }

  return false;
}


// Returns the result of a validation and error codes
const validateId18 = (sfId18) => {
  const result = {
    valid: false,
    error: null,
    meta: null,
  };

  const validationError = basicValidationError(sfId18, 18);
  if (validationError) {
    result.error = validationError;
    return result;
  }

  sfId18 = sfId18.trim();

  const extractedChecksum = sfId18.substring(15, 18);
  const calculatedChecksum = calcChecksum(sfId18.substring(0, 15));

  if (extractedChecksum !== calculatedChecksum) {
    result.error = errorCodes.INVALID_CHECKSUM;
    return result;
  }

  result.meta = {
    entityType: prefixLookupTable[sfId18.substring(0,3)],
    serverId: sfId18.substring(3,5),
    identifier: sfId18.substring(5, 15),
    extractedChecksum,
    calculatedChecksum,
  };
  result.valid = true;
  return result;
};


// Returns id18 calculated for a given id15, or 
const generateId18FromId15 = (sfId15) => {
  const result = {
    valid: false,
    error: null,
    id18: null,
  };

  const validationError = basicValidationError(sfId15, 15);
  if (validationError) {
    result.error = validationError;
    return result;
  }

  result.valid = true;
  result.id18 = sfId15 + calcChecksum(sfId15);
  return result;
};

module.exports = {
  validateId18,
  generateId18FromId15,
};
