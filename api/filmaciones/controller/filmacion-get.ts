'use strict'

import Utils from "../../commons/utils/utils"
import {  FilmacionGetService } from '../service/filmacionGetService'


module.exports.obtener = async (event, context, callback) => {
  try {
    
    const result = await FilmacionGetService.obtener(event);

    return Utils.generateOkResponse(event, context, callback,result);
  } catch (error) {
    return Utils.generateErrorResponse(event, context, callback, error);
  }
};

module.exports.listar = async (event, context, callback) => {
  try {
    
    const result = await FilmacionGetService.listar(event);

    return Utils.generateOkResponse(event, context, callback,result);
  } catch (error) {
    return Utils.generateErrorResponse(event, context, callback, error);
  }
};