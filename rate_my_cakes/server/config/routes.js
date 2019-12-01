const CakeController = require('../controllers/cake.controller')

module.exports = function Route(app, server){

    const mongoose = require('mongoose');

    mongoose.set('useUnifiedTopology', true);

    app.get('/cakes', (req, res) => {
        CakeController.index(req, res);
    })

    app.post('/cakes', (req, res) => {
        CakeController.create(req, res);
    });
};