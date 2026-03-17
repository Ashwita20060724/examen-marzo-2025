import { check } from 'express-validator'

// HAY QUE COMPROBAR QUE EXISTEN LOS PARÁMETROS QUE HAY EN LAS ENTIDADES, EN ESTE CASO: STARS Y BODY
const create = [
  // COMPURUEBAS QUE LAS ESTRELLAS EXISTAN PORQUE SON OBLIGATORIAS, SI NO APARECE MENSAJE
  // LAS ESTRELLAS DEBEN ESTAN EN EL RANGO [0,5], SI NO APARECE MENSAJE
  check('stars')
    .exists().withMessage('Stars rating is required')
    .isInt({ min: 0, max: 5 }).withMessage('Stars have to be between the range 0 to 5').toInt(),
  // COMPRUEBA QUE HAYA UN CUERPO (MENSAJE), NO ES OBLIGATORIO Y PUEDE SER NULO
  check('body')
    .optional({ nullable: true, checkFalsy: true }).isString().trim()
]

const update = [
  // COMPURUEBAS QUE LAS ESTRELLAS EXISTAN PORQUE SON OBLIGATORIAS, SI NO APARECE MENSAJE
  // LAS ESTRELLAS DEBEN ESTAN EN EL RANGO [0,5], SI NO APARECE MENSAJE
  check('stars')
    .exists().withMessage('Stars rating is required')
    .isInt({ min: 0, max: 5 }).withMessage('Stars have to be between the range 0 to 5').toInt(),
  // COMPRUEBA QUE HAYA UN CUERPO (MENSAJE), NO ES OBLIGATORIO Y PUEDE SER NULO
  check('body')
    .optional({ nullable: true, checkFalsy: true }).isString().trim()
]

export { create, update }
