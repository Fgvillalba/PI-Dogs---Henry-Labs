require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { Dog, Temperament} = require('../db');
const {API_KEY}  = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();



//GET Razas && Query by Name//
router.get('/dogs', async (req, res) => {
 
 const race =  req.query.name;
 const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
 const infoRes =  apiInfo.data.map(raza => {
  return {
      id: raza.id,
      name: raza.name,
      weight: raza.weight.metric,
      temperaments: raza.temperament?.replace(/ /g, '').split(','),
      image: raza.image.url,
  }
 });
 const infoDataBase = await Dog.findAll({
    attributes: ['id', 'name', 'weight', 'image', 'createdAt'],
    include: [{
      model: Temperament,
      attributes: ["name"],
      through: {
      attributes: []
      }
    }]
  });
  const dataInfo = infoDataBase.map((breed) => {
    return {
      id: breed.id,
      name: breed.name,
      weight: breed.weight,
      createdAt: breed.createdAt,
      temperaments: breed.temperaments.map((t) => t.name),
      image: breed.image,
    }
  });

 const info = infoRes.concat(dataInfo);
 
  if(race){
    const filterByName = info.filter((raza)=> raza.name.toLocaleLowerCase().includes(race.toLocaleLowerCase()));
    if(filterByName.length){
      return res.status(200).json(filterByName);
    } else{
      return res.status(404).send("No existe una raza que incluya name");
    }
  }
   res.status(200)
      .json(info)
});

//GET Raza por ID//
router.get('/dogs/:idRaza', async (req, res) => {
 const id = req.params.idRaza;
 const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
 const infoRes = apiInfo.data.map(raza =>{
    return {
        id: raza.id,
        name: raza.name,
        height: raza.height.metric,
        weight: raza.weight.metric,
        temperaments: raza.temperament?.replace(/ /g, '').split(','),
        image: raza.image.url,
        life_span: raza.life_span
    }
 });
 const infoDataBase = await Dog.findAll({ 
  attributes: ['id', 'name', 'weight', 'image', 'height', 'life_span', 'createdAt'],
  include: [{
    model: Temperament,
    attributes: ["name"],
    through: {
    attributes: []
    }
  }]
  });

  const dataInfo = infoDataBase.map((breed) => {
    return {
      id: breed.id,
      name: breed.name,
      weight: breed.weight,
      image: breed.image,
      height: breed.height,
      life_span: breed.life_span,
      temperaments: breed.temperaments.map((t) => t.name),
    }
  });


 const info = infoRes.concat(dataInfo);
 const dog = info.find((r) => r.id == id);
 if(dog){
     return res.status(200)
               .json(dog);
 } else {
  res.status(404)
     .send("No existe una raza para dicho Id") 
 }
});

//GET Temperaments//
router.get('/temperament', async function(req, res) {
 const dataTemps = await Temperament.findAll();
 if(dataTemps.length){
 res.status(200).json(dataTemps)
 } else {
 const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
 apiInfo.data.forEach(element => {
   const temp = element.temperament?.split(',');
   temp?.forEach(t => {
    Temperament.findOrCreate({
      where: {
        name: t.replace(' ', '')
      }
    })
   })
  });
  const dataTemps = await Temperament.findAll();
  res.status(200).json(dataTemps);
 }
});
 
//POST Crear Raza//
router.post("/dog", async function(req, res) {
 const { name, height, weight, life_span, image, temperaments } = req.body;
 if(name && height && weight && life_span ){
 const dog = await Dog.create({ name, height, weight, life_span, image })
 if(temperaments){
  const temps = await Temperament.findAll({
    where: { name: temperaments}
  }); 
  dog.addTemperament(temps);
 }
 res.json(dog);
} else {
   res.status(400).send("Faltan inputs");
 }
})


module.exports = router;
