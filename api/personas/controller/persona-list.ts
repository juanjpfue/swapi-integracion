'use strict'

import Utils from "../../commons/utils/utils"
import {  PersonaListService } from '../service/personaListService'


module.exports.listar = async (event, context, callback) => {
  try {
    
    const result = await PersonaListService.listar(event);

    return Utils.generateOkResponse(event, context, callback,result);
  } catch (error) {
    return Utils.generateErrorResponse(event, context, callback, error);
  }
};