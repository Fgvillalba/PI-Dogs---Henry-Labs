require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const { breedsOfApi, breedsOfDB, temperamentsOfApi } = require("./getters");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

//GET Razas && Query by Name//
router.get("/dogs", async (req, res) => {
  const race = req.query.name;
  const infoRes = await breedsOfApi();
  const dataInfo = await breedsOfDB();
  const info = infoRes.concat(dataInfo);

  if (race) {
    const filterByName = info.filter((raza) =>
      raza.name.toLocaleLowerCase().includes(race.toLocaleLowerCase())
    );
    if (filterByName.length) {
      return res.status(200).json(filterByName);
    } else {
      return res.status(404).send("No existe una raza que incluya name");
    }
  }
  res.status(200).json(info);
});

//GET Raza por ID//
router.get("/dogs/:idRaza", async (req, res) => {
  const id = req.params.idRaza;
  const infoRes = await breedsOfApi();
  const dataInfo = await breedsOfDB();

  const info = infoRes.concat(dataInfo);
  const dog = info.find((r) => r.id == id);
  if (dog) {
    return res.status(200).json(dog);
  } else {
    res.status(404).send("No existe una raza para dicho Id");
  }
});

//GET Temperaments//
router.get("/temperament", async function (req, res) {
  const dataTemps = await Temperament.findAll();
  if (dataTemps.length) {
    res.status(200).json(dataTemps);
  } else {
    await temperamentsOfApi();
    const dataTemps = await Temperament.findAll();

    res.status(200).json(dataTemps);
  }
});

//POST Crear Raza//
router.post("/dog", async function (req, res) {
  const { name, height, weight, life_span, image, temperaments } = req.body;
  if (name && height && weight && life_span) {
    const dog = await Dog.create({ name, height, weight, life_span, image });
    if (temperaments) {
      const temps = await Temperament.findAll({
        where: { name: temperaments },
      });
      dog.addTemperament(temps);
    }
    res.json(dog);
  } else {
    res.status(400).send("Faltan inputs");
  }
});

module.exports = router;
