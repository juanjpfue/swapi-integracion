'use strict'
import Validator from "../../commons/utils/validator"
import * as RequestSchema from './../schema/FilmacionSchema.json';
import Utils from "../../commons/utils/utils"
import { FilmacionCrearService } from '../service/filmacionCrearService'


module.exports.crear = async (event, context, callback) => {
  try {
    
    Validator.validate(event, RequestSchema)
    const result = await FilmacionCrearService.crear(event);

    return Utils.generateOkResponse(event, context, callback,result);
  } catch (error) {
    console.log(error)
    return Utils.generateErrorResponse(event, context, callback, error);
  }
};