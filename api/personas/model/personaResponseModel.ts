import { PersonaFromSwapiModel } from "./personaModel"
import  Utils from "../../commons/utils/utils"

export class  PersonaResponseFromSwapiModel {

  cantidad: number
  siguiente:  string
  anterior: string
  resultados:  PersonaFromSwapiModel[]

  constructor(params: any) {
    this.cantidad = params['count']
    this.siguiente =  Utils.translateSwapiUrl (params['next'])
    this.anterior = Utils.translateSwapiUrl (params['previous'])
    this.resultados =  params['results'].map(e=>{return new PersonaFromSwapiModel(e)});
    
  }

}