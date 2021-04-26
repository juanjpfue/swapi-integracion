import { DynamoRepository } from "../../commons/db/repository-dynamo";
import Utils from "../../commons/utils/utils"
import { v4 as uuidv4 } from 'uuid';
import { RepositoryDB } from "../../commons/db/repository-db";

import { PersonasService } from "../../../services/swapi/personas_service";
import { PersonaResponseFromSwapiModel } from "../model/personaResponseModel";

const dynamodb = new RepositoryDB().getClient()


export class PersonaListService {
  static async listar(event) {
    try {
      
      const request = Utils.getQueryStringRequest(event);
      let dataFilmacion =  await this.listarPersonas(request);
      return {dataUtil: new PersonaResponseFromSwapiModel(dataFilmacion), messages: [`Se ha obtenido la información solicitada`] };

    } catch (error) {
      throw (error);
    }
  }

  static async listarPersonas(request) {

    try {

      return await PersonasService.obtenerListaPersonas(request);
    }
    catch (error) {
      throw error;
    }
  }



}

