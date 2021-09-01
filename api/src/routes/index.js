require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { Dog, Temperament} = require('../db');
const {API_KEY}  = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// async function getAllApi(){
//     const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

// }


router.get('/dogs', async (req, res) => {
 
 const race =  req.query.name;
 const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
 const infoRes =  apiInfo.data.map(raza => {
  return {
      id: raza.id,
      name: raza.name,
      weight: raza.weight.metric,
      temperament: raza.temperament,
      image: raza.image.url,
  }
 });
 const dataInfo = await Dog.findAll( { attributes: ['id', 'name', 'weight', 'image'] });
 const info = infoRes.concat(dataInfo);
 
  if(race){
    const filterByName = info.filter((raza)=> raza.name.toLocaleLowerCase().includes(race.toLocaleLowerCase()));
    filterByName.length?
    res.status(200).json(filterByName): res.status(404).send("No existe una raza que incluya name")
  }
   res.status(200)
      .json(info)
});


router.get('/dogs/:idRaza', async (req, res) => {
 const id = req.params.idRaza;
 const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
 const infoRes = apiInfo.data.map(raza =>{
    return {
        id: raza.id,
        name: raza.name,
        height: raza.height.metric,
        weight: raza.weight.metric,
        temperament: raza.temperament,
        image: raza.image.url,
        life_span: raza.life_span
    }
 });
 const dataInfo = await Dog.findAll({ attributes: ['id', 'name','height' ,'weight', 'image', 'life_span']});
 const info = infoRes.concat(dataInfo);
 const dog = info.find((r) => r.id == id);
 if(dog){
     return res.status(200)
               .json(dog);
 } 
  res.status(404)
     .send("No existe una raza para dicho Id") 
});


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
 

router.post("/dog", async function(req, res) {
 const { name, height, weight, life_span, image, temperaments } = req.body;
 if(name && height && weight && life_span ){
 const dog = await Dog.create({ name, height, weight, life_span, image })
//  dog.setTemperaments(temperaments);
 res.status(200).json(dog);
 } else {
   res.status(400).send("Faltan inputs");
 }
})


module.exports = router;
