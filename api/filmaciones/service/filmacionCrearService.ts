import { DynamoRepository } from "../../commons/db/repository-dynamo";
import Utils from "../../commons/utils/utils"
import { v4 as uuidv4 } from 'uuid';
import { FilmacionModel } from "../model/filmacionModel";

export class FilmacionCrearService {
  static async crear(event) {
    try {
      const request = Utils.getRequest(event);

      const dataDynamo = this.generarDataDynamo({ request: request });
      // Guardar datos en el Dynamo
      await this.guardarDataDynamo(dataDynamo, request);
    
      return { messages: [`Se ha registrado la filmación con el id: ${dataDynamo.idEpisodio}`] };

    } catch (error) {
      throw (error);
    }
  }

  static async guardarDataDynamo(dataCuenta, request) {
    // Guardar en el Dynamo 
    await this.guardarFilmacion(dataCuenta);
  }

  static async guardarFilmacion(data) {
    const params = {
      TableName: 'tabla-filmacion',
      Item: data
    }
    //GUARDAMOS EN LA BD
    const resp = await DynamoRepository.callSingleOperation('put', params);
    return resp;
  }


  static generarDataDynamo(data) {
    const { request } = data;
    
    request.fecha_creacion= new Date().toISOString();
    let dataFilmacion =  new FilmacionModel(request);
    const dataDynamo = {
      idPelicula: process.env.ID_PELICULA,
      idEpisodio: uuidv4(),// PARA EL CASO PRÁCTICO AUTOGENERADO.
      //filmacion: Object.assign({}, dataFilmacion),
    };

    Object.assign(dataDynamo, dataFilmacion);
    return dataDynamo;
  }


}

