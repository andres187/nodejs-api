module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
        createdAt: 'createdat',
        updatedAt: 'updatedat'
    });

    return User;
}