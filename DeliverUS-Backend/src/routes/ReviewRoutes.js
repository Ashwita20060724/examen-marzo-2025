import ReviewController from '../controllers/ReviewController.js'
import * as ReviewValidation from '../controllers/validation/ReviewValidation.js'
import { isLoggedIn, hasRole } from '../middlewares/AuthMiddleware.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import { checkEntityExists } from '../middlewares/EntityMiddleware.js'
import { Restaurant, Review } from '../models/models.js'
import { userHasPlacedOrderInRestaurant, checkReviewOwnership, checkReviewBelongsToRestaurant, checkCustomerHasNotReviewed } from '../middlewares/ReviewMiddleware.js'

const loadReviewRoutes = function (app) {
  // eslint-disable-next-line no-unused-expressions
  app.route('/restaurants/:restaurantId/reviews')
    .get(
      checkEntityExists(Restaurant, 'restaurantId'), // VERIFICA QUE EL RESTAURANTE EXISTE
      ReviewController.index // FUNCIÓN: BUSCAR TODAS LAS RESEÑAS ASOCIADAS AL RESTAURANTE Y DEVOLVERLAS
    )
    .post( // PARA PUBLICAR UN REVIEW TIENE QUE ESTAR:
      isLoggedIn, // 1. LOGGEADO
      hasRole('customer'), // 2. TENER EL ROL DE CLIENTE
      checkEntityExists(Restaurant, 'restaurantId'), // 3. VERIFICAR QUE EL RESTAURANTE EXISTE
      userHasPlacedOrderInRestaurant, // 4. QUE EL CLIENTE HAYA PEDIDO EN ESE RESTAURANTE
      checkCustomerHasNotReviewed, // 5. QUE NO HAYA VALORADO AL RESTAURANTE ANTERIORMENTE
      ReviewValidation.create, // 6. EL CONTENIDO DE LA VALORACIÓN ES CORRECTO
      handleValidation, // 7. GESTIÓN DE LOS ERRORES Y SI HAY ALGÚN FALLO SE CORTA LA EJECUCIÓN
      ReviewController.create // 8. CREA LA REVIEW EN LA BASE DE DATOS
    )

  app.route('/restaurants/:restaurantId/reviews/:reviewId')
    .put(
      isLoggedIn,
      hasRole('customer'),
      checkEntityExists(Restaurant, 'restaurantId'), // QUE EXISTA EL RESTAURANTE
      checkEntityExists(Review, 'reviewId'), // SI EXISTE RESTAURANTE REVISAR EL ID DEL REVIEW
      checkReviewOwnership, // EL QUE HA CREADO LA VALORACIÓN SEA LA MISMA PERSONA QUE LO VA A CONSULTAR
      checkReviewBelongsToRestaurant, // QUE LA VALORACIÓN A UN RESTAURANTE PERTENEZCA A ESE RESTAURANTE
      ReviewValidation.update, // ACTUALIZAR EL CONTENIDO
      handleValidation,
      ReviewController.update
    )
    .delete(
      isLoggedIn,
      hasRole('customer'),
      checkEntityExists(Restaurant, 'restaurantId'),
      checkEntityExists(Review, 'reviewId'),
      checkReviewOwnership,
      checkReviewBelongsToRestaurant,
      ReviewController.destroy // AL ELIMINAR EL CONTENIDO NO TIENES QUE VER SI LOS DATOS "PUESTOS" SON CORRECTOS
    )
}

export default loadReviewRoutes
