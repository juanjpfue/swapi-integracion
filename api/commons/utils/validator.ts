import Ajv from "ajv"
const localize = require('ajv-i18n');
const ajv = new Ajv({ allErrors: true, $data: true });
require('ajv-keywords')(ajv, 'select');
import Utils from './utils';

export default class Validator {

  static validate(event, schema) {
    const validate = ajv.compile(schema);
    const valid = validate(Utils.getRequest(event));
    let errors: Array<any> = [];
    if (!valid) {
      localize.es(validate.errors);
      errors = ajv.errorsText(validate.errors, { separator: ',' }).split(',');
      throw { messages: errors, httpCode: 400 };
    }
    return errors;
  }

  
  static validateObject(obj, schema) {
    console.log(obj)
    const validate = ajv.compile(schema);
    const valid = validate(obj);
    let errors: Array<any> = [];
    if (!valid) {
      localize.es(validate.errors);
      errors = ajv.errorsText(validate.errors, { separator: ',' }).split(',');
      throw { messages: errors, httpCode: 400 };
    }
    return errors;
  }
}