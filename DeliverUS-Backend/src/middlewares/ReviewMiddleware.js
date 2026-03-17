import { Order, Review } from '../models/models.js'

const userHasPlacedOrderInRestaurant = async (req, res, next) => {
  // OBTENEMOS EL USUARIO
  const userId = req.user.id
  // OBTENEMOS EL RESTAURANTE
  const restaurantId = req.params.restaurantId
  // CONTAMOS LOS PEDIDOS QUE HA REALIZADO UN CLIENTE ESPECÍFICO EN EL RESTAURANTE
  const contarPedidos = await Order.count({ where: { userId, restaurantId } })
  // SI ESTE ES 0, NUNCA HA PEDIDO AHÍ
  if (contarPedidos === 0) {
    return res.status(409).json({ error: 'User cannot review this restaurant without completed orders' })
  }
  next() // SI ES MAYOR QUE 0, PUEDE CONTINUAR
}

const checkCustomerHasNotReviewed = async (req, res, next) => {
  try {
    // OBTENEMOS EL USUARIO
    const userId = req.user.id
    // OBTENEMOS EL RESTAURANTE
    const restaurantId = req.params.restaurantId
    // MIRAMOS SI YA HA HECHO UNA REVIEW
    const existingReviews = await Review.findOne({
      where: { userId, restaurantId }
    })
    // SI ESTE ES VERDADERO
    if (existingReviews) {
      return res.status(409).json({ error: "User can't have previous reviews" })
    }
    next()
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const checkReviewOwnership = async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId)
  if (review.customerId !== req.user.id) {
    return res.status(403).json({ message: 'You do not have permission to modify this review.' })
  }
  next()
}

const checkReviewBelongsToRestaurant = async (req, res, next) => {
  const { restaurantId, reviewId } = req.params

  try {
    const review = await Review.findByPk(reviewId)

    // El comparador doble es intencionado por la diferencia de tipo de datos string vs integer
    // eslint-disable-next-line eqeqeq
    if (review.restaurantId != restaurantId) {
      return res.status(409).json({ error: 'Review does not belong to the specified restaurant.' })
    }

    next()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export { checkCustomerHasNotReviewed, userHasPlacedOrderInRestaurant, checkReviewOwnership, checkReviewBelongsToRestaurant }
