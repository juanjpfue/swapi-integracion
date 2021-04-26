export class FilmacionModel {

  titulo: string
  rastreo_apertura:  string
  director: string
  productor: string
  fecha_lanzamiento: string
  personajes: string[]
  planetas: string[]
  naves: string[]
  vehiculos: string[]
  especies: string[]
  fecha_creacion: string
  fecha_edicion: string
  link: string

  constructor(params: any) {
    this.titulo = params['titulo']
    this.rastreo_apertura = params['rastreo_apertura']
    this.director = params['director']
    this.productor = params['productor']
    this.fecha_lanzamiento = params['fecha_lanzamiento'] 
    this.personajes = params['personajes'] || []
    this.planetas = params['planetas']|| []
    this.naves = params['naves']|| []
    this.vehiculos = params['vehiculos']|| []
    this.especies = params['especies']|| []
    this.fecha_creacion = params['fecha_creacion']
    this.fecha_edicion = params['fecha_edicion']
    this.link = params['link']
  }

}