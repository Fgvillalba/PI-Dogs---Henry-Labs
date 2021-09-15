require("dotenv").config();
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

async function breedsOfApi() {
  const apiInfo = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const infoRes = apiInfo.data.map((raza) => {
    return {
      id: raza.id,
      name: raza.name,
      height: raza.height.metric,
      weight: raza.weight.metric,
      temperaments: raza.temperament?.replace(/ /g, "").split(","),
      image: raza.image.url,
      life_span: raza.life_span,
    };
  });

  return infoRes;
}

async function breedsOfDB() {
  const infoDataBase = await Dog.findAll({
    attributes: [
      "id",
      "name",
      "weight",
      "image",
      "height",
      "life_span",
      "createdAt",
    ],
    include: [
      {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  const dataInfo = infoDataBase.map((breed) => {
    return {
      ...breed.get(),
      temperaments: breed.temperaments.map((t) => t.name),
    };
  });

  return dataInfo;
}

async function temperamentsOfApi() {
  const apiInfo = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  apiInfo.data.forEach((element) => {
    const temp = element.temperament?.split(",");
    temp?.forEach((t) => {
      Temperament.findOrCreate({
        where: {
          name: t.replace(" ", ""),
        },
      });
    });
  });
}

module.exports = {
  breedsOfApi,
  breedsOfDB,
  temperamentsOfApi,
};
