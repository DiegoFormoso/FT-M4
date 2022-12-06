const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const Ability = require('../db/models/Ability');
const router = Router();

router.post('/', async (req, res) => {
    const {code, name, age, race, mana, hp} = req.body; 
    if (!code || !name || !mana || !hp) return res.status(404).send('Falta enviar datos obligatorios');
    try {
        const character = await Character.create(req.body);
        res.status(201).json(character);
    }catch(err) {
        res.status(404).send('Error en alguno de los datos provistos')
    };
})

router.get('/', async (req, res) => {
    const {race, age} = req.query;
    const condition = {};

    const where = {};
    if (race) where.race = race;
    if (age) where.age = age;

    condition.where = where;

    const characters = await Character.findAll(condition);
    res.status(200).json(characters);
})

router.get('/young', async(req, res) => {
    const characters = await Character.findAll({
        where: {
            age: {[Op.lt]:25}
        }
    });
    res.status(200).json(characters);
})

router.get('/roles/:code', async (req, res) => {
   const {code} = req.params;
   const character = await Character.findByPk(code, {
        include: Role
   });
   res.status(200).json(character);
})

router.get('/:code', async(req, res) => {
    const { code } = req.params;
//    const character = await Character.findByPk(code);
    // con promesas
    Character.findByPk(code) 
        .then(character => {
            if (!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`);
            res.status(200).json(character)
        });

    // if (!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`);
    // res.status(200).json(character);
})

router.put('/addAbilities', async(req, res) => {
    const { codeCharacter, abilities} = req.body;
    const character = await Character.findByPk(codeCharacter);
    const promises = abilities.map(a => character.createAbility(a));
    await Promise.all(promises);
    res.send('ok');
})

router.put('/:attribute', async(req, res) => {
   const {attribute} = req.params;
   const {value} = req.query;
   await Character.update({[attribute]: value}, {
    where: {
        [attribute]: null
    } 
   });
   res.status(200).send("Personajes actualizados"); 
})

module.exports = router;