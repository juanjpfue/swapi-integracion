
import axios from "axios";

export default class Utils {

  static async generateOkResponse(event, context, callback, data) {
    context.callbackWaitsForEmptyEventLoop = false;
    const { dataUtil, messages } = data;

    const response = {
      data: (!dataUtil) ? null : dataUtil,
      success: true,
      messages: messages,

    };

    if (this.isLambdaProxyIntegration(event)) {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });
      return;
    }
    if (this.isLambdaIntegration(event)) {
      callback(null, JSON.stringify(response));
      return;
    }
    callback(null, response);
  }

  static async generateErrorResponse(event, context, callback, error) {
    context.callbackWaitsForEmptyEventLoop = false;
    const { httpCode, messages } = error || {};
    const response = {
      data: null,
      success: false,
      messages: messages,
    };

    if (this.isLambdaProxyIntegration(event)) {
      callback(null, {
        statusCode: httpCode || 400,
        body: JSON.stringify(response),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });
      return;
    }
    if (this.isLambdaIntegration(event)) {
      callback(JSON.stringify(response));
      return;
    }
    callback(null, response);

  }

  static isLambdaProxyIntegration(event) {
    return !!event.requestContext;
  }

  static isLambdaIntegration(event) {
    return !!event.requestPath;
  }

  static getRequest(event) {
    let requestbody = event;
    if (this.isLambdaProxyIntegration(event)) {
      requestbody = JSON.parse(event.body);
    }
    if (event.body) {
      requestbody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    }
    return requestbody;
  }

  static decodeObjectUriComponent(obj) {
    for (let key in obj) {
      obj[key] = decodeURIComponent(obj[key]);

    }
    return obj
  }
  static getQueryStringRequest(event) {
    let requestbody: any = {};//event;
    if (this.isLambdaProxyIntegration(event)) {
      requestbody = typeof event.queryStringParameters === 'string' ?
        JSON.parse(event.queryStringParameters) : event.queryStringParameters;
    }
    if (event.queryStringParameters) {
      requestbody = typeof event.queryStringParameters === 'string' ?
        JSON.parse(event.queryStringParameters) : event.queryStringParameters;
    }
    if (requestbody) requestbody = this.decodeObjectUriComponent(requestbody);
 
    return requestbody;
  }

  static getPathParameterRequest(event) {
    let requestbody: any = {};//event;
    if (this.isLambdaProxyIntegration(event)) {
      requestbody = typeof event.pathParameters === 'string' ?
        JSON.parse(event.pathParameters) : event.pathParameters;
    }
    if (event.pathParameters) {
      requestbody = typeof event.pathParameters === 'string' ?
        JSON.parse(event.pathParameters) : event.pathParameters;
    }
    if (requestbody) requestbody = this.decodeObjectUriComponent(requestbody);
 
    return requestbody;
  }


  static async generateBadRequestResponse(event, context, callback, dataError) {
    context.callbackWaitsForEmptyEventLoop = false;
    const { data, messages } = dataError;
    const response = {
      data: (!data) ? null : data,
      code: '9001',
      success: false,
      messages: messages,

    };

    if (this.isLambdaProxyIntegration(event)) {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify(response),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });
      return;
    }
    if (this.isLambdaIntegration(event)) {
      callback(null, JSON.stringify(response));
      return;
    }
    callback(null, response);

  }

  static throwMessageValidation(error) {
    const messageValidation = Object.assign({}, error, { httpCode: 400 })
    throw (messageValidation);
  }

  static translateSwapiUrl(url){
        if(!url) return url;
        url= url.toUpperCase().replace(`${process.env.URL_SWAPI?.toUpperCase()}/`,'');
        var endpointName= url.substr(0,url.indexOf('/'))
        switch(endpointName)
        {
          case "PEOPLE":
              url= url.replace(endpointName,'personas');
              break;
          case "FILMS":
                url= url.replace(endpointName,'filmaciones');
                break;
          default:
              
              break;

        }
        url= `${process.env.URL_WEB_DESPLEGADO}/${url.replace('?PAGE=','?pagina=')}`.toLowerCase();
        
        return url

  }
  
}

