module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stars: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { // HAY QUE PONER LAS ESTRELLAS ENTRE 0 Y 5
          min: 0,
          max: 5
        }
      },
      body: {
        allowNull: true,
        type: Sequelize.STRING
      },
      // HAY QUE PONER LAS RELACIONES CON LAS ENTIDADES RELACIONADAS, EN ESTE CASO: LOS CUSTOMERS Y RESTAURANTS
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // FALTA: HACÍA QUE ENTIDAD HACE REFERENCIA Y COMO SE ELIMINA DE LA BASE DE DATOS
        references: {
          model: 'Users', // HACE REFERENCIA A LA ENTIDAD MADRE Y EN PLURAL
          key: 'id'
        },
        onDelete: 'CASCADE'// ELIMINACIÓN EN CASCADA
      },
      restaurantId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // FALTA: HACÍA QUE ENTIDAD HACE REFERENCIAS Y COMO SE ELIMINA DE LA BASE DE DATOS
        references: {
          model: 'Restaurants', // EN PLURAL
          key: 'id'
        },
        onDelete: 'CASCADE' // PARA ELIMINAR EN CASCADA
      },
      // HAY QUE AÑADIR LOS CAMPOS DE CREACIÓN Y ACTUALIZACIÓN
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        // PONER UN VALOR POR DEFECTO
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        // HAY QUE PONER UN VALOR POR DEFECTO
        defaultValue: new Date()
      }

    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews')
  }
}
