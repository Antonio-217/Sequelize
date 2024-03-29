const Spaceship = require('../models/Spaceship');
const Cap = require('../models/Cap');

module.exports = {
    async store (req, res) {
        const {capId} = req.params;
        const {name, capacity} = req.body;

        const cap = await Cap.findByPk(capId);
        
        if(!cap) {
            res.send('Erro! esse capitão não existe!');
        }

        const {spaceships} = await Spaceship.findOrCreate({
            where: {name, capacity},
        });
        await cap.addSpaceship(spaceships);
        return res.json(spaceships);
    },

    async index (req, res) {
        const {capId} = await req.params;

        if (!capId){
            res.send('Esse capitão não existe!');
        }
        
        const cap = await Cap.findByPk(capId, {
            include: {association: 'spaceships'},
        });
        return res.json(cap);
    },
};