const https = require('https');

import Utils from '../../api/commons/utils/utils';

const axios = require('axios');

export class PersonasService {
  static async obtenerListaPersonasSwapi(request) {
    try {
      let respuesta =await this.obtenerListaPersonas(request);
 
      return respuesta;
    } catch (error) {
      console.log('error Personas swapi:')
      console.log(error)

      return {
        existe: false,
        messageError: 'Error en el Servicio, intentarlo en unos minutos'
      }
    }
  }

  static async obtenerListaPersonas(request) {
    try {
      
      const response = await axios.get(`${process.env.URL_SWAPI}/people${request?.pagina?`?page=${request.pagina}`:''}`);
      
      
      const retornarData = this.getResponse(response);

      return retornarData;
    } catch (error) {
      console.log('error obtenerDataPersonas')
      console.log(error);
    }
  }


  static getResponse(dataRpta) {
    if (!dataRpta.data) {
      //PROBLEMAS PARA CONECTARNOS CON EL SERVICIO (API)
      console.log('Error al llamar al servicio de personas');
      throw ({ messages: ['Error al llamar al servicio de personas.'] });
    }

    const response = dataRpta.data;
    return response;
  }

}