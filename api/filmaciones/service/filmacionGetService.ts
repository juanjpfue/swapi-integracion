import { DynamoRepository } from "../../commons/db/repository-dynamo";
import Utils from "../../commons/utils/utils"
import { RepositoryDB } from "../../commons/db/repository-db";
import { FilmacionModel } from "../model/filmacionModel";

const dynamodb = new RepositoryDB().getClient()


export class FilmacionGetService {
  static async obtener(event) {
    try {

      const request = Utils.getPathParameterRequest(event);

      let dataFilmacion = await this.obtenerFilmacion(request.idEpisodio);
      const { Items: [filmacion] } = dataFilmacion;
      if (filmacion) {
        return { dataUtil: new FilmacionModel(filmacion), messages: [`Se ha obtenido la información solicitada`] };
      }
      else {
        return { messages: [`No existe la información solicitada`] };
      }

    } catch (error) {
      throw (error);
    }
  }

  static async listar(event) {
    try {
      let dataFilmacion = await this.listarFilmacion();
      const { Items } = dataFilmacion;
      return { dataUtil: Items.map(e => { return new FilmacionModel(e) }), messages: [`Se ha obtenido la información solicitada`] };

    } catch (error) {
      throw (error);
    }
  }

  static async obtenerFilmacion(id) {

    try {

      let params = {
        TableName: 'tabla-filmacion',
        KeyConditionExpression: `idPelicula = :idPelicula and idEpisodio = :idEpisodio`,
        ExpressionAttributeValues: {
          ":idPelicula": process.env.ID_PELICULA, //para el caso práctico
          ":idEpisodio": id
        }
      }

      let resultObj = await dynamodb.query(params).promise();

      return resultObj;
    }
    catch (error) {
      return error;
    }
  }

  static async listarFilmacion() {

    try {

      let params = {
        TableName: 'tabla-filmacion',
        KeyConditionExpression: `idPelicula = :idPelicula`,
        ExpressionAttributeValues: {
          ":idPelicula": process.env.ID_PELICULA, //para el caso práctico

        }
      }

      let resultObj = await dynamodb.query(params).promise();

      return resultObj;
    }
    catch (error) {
      return error;
    }
  }


}

