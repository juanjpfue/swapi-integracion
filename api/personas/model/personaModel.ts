export class  PersonaFromSwapiModel {

  nombre: string
  talla:  string
  peso: string
  color_cabello: string
  color_piel: string
  color_ojos: string
  fecha_nacimiento: string
  genero: string
  planeta_hogar: string
  filmaciones: string[]
  especies: string[]
  vehiculos: string[]
  naves: string[]
  fecha_creacion: string
  fecha_edicion: string
  link: string

  constructor(params: any) {
    this.nombre = params['name']
    this.talla = params['height']
    this.peso = params['mass']
    this.color_cabello = params['hair_color']
    this.color_piel = params['skin_color'] 
    this.color_ojos = params['eye_color']
    this.fecha_nacimiento = params['birth_year']
    this.genero = params['gender']
    this.planeta_hogar = params['home_world']
    this.filmaciones = params['films']
    this.especies = params['species']
    this.vehiculos = params['vehicles']
    this.naves = params['starships']

    this.fecha_creacion = params['created']
    this.fecha_edicion = params['edited']
    this.link = params['url']
  }

}