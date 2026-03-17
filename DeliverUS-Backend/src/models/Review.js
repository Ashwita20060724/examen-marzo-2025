import { Model } from 'sequelize'

const loadModel = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate (models) {
      // HACE BELONG A LAS ENTIDADES RELACIONADAS, EN ESTE CASO: LOS USERS Y RESTAURANTS
      Review.belongsTo(models.User, { foreignKey: 'customerId', onDelete: 'CASCADE' }) // CON USUARIO SE
      // RELACIONA CON EL ATRIBUTOS customerId, Y SE ELIMINA EN CASCADA
      Review.belongsTo(models.Restaurant, { foreignKey: 'restaurantId', onDelete: 'CASCADE' }) // CON RESTAURANTE SE
      // RELACIONA CON EL ATRIBUTOS restaurantId, Y SE ELIMINA EN CASCADA
    }
  }

  // SE PONEN LOS ATRIBUTOS QUE TENGA REVIEW: STARTS, BODY, RESTAURANTID, CUSTOMERID
  Review.init({
    stars: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5
      }
    },
    body: {
      allowNull: true,
      type: DataTypes.STRING
    },
    customerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // ENTIDAD MADRE Y EN PLURAL
        key: 'id'
      }
    },
    restaurantId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Restaurants', // EN PLURAL
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Review'
  })

  return Review
}

export default loadModel
