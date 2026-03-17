import { Review } from '../models/models.js'

const ReviewController = {

  async index (req, res) {
    try {
      const review = await Review.findAll( // Buscamos todas las reviews en la tabla Review.
        {
          where: {
            restaurantId: req.params.restaurantId, // Filtramos por el restaurante que viene en la URL (/restaurants/:restaurantId/reviews)
            order: [['createdAt', 'DESC']] // Ordenamos las reviews de más reciente a más antigua.
          }
        }
      )
      res.json(review) // Devuelves todas las reviews
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  async create (req, res) {
    try {
      const review = await Review.create({ // Creamos una nueva review en la base de datos.
        stars: req.body.stars, // La puntuación viene del body del POST, por eso se usa body y no params
        body: req.body.body, // El texto del review viene del body no de la URL
        restaurantId: req.params.restaurantId, // Sí que viene de la URL
        customerId: req.user.id // Como no viene de URL tiene que buscarlo en user
      })
      res.json(review)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  async update (req, res) {
    try {
      const review = await Review.findByPk(req.params.reviewId)
      // Buscamos review por su id
      await review.update(req.body) // Actualizas la valoración con los datos enviados en el body
      res.json(review)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  async destroy (req, res) {
    try {
      const result = await Review.destroy({
        where: { id: req.params.reviewId }
      })
      let message = ''
      if (result === 1) {
        message = 'Sucessfuly deleted review id' + req.params.reviewId
      } else {
        message = 'Could not delete review'
      }
      res.json(message)
    } catch (err) {
      res.status(500).send(err.message)
    }
  }

}

export default ReviewController
