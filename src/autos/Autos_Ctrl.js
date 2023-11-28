import { Autos_Models } from "./Autos_Model.js";
import { isValidUUID } from "../utils/isValidUUID.js";

export class Autos_Crtl {
  static async getAll(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const { Marca } = req.query;
    const autos = await Autos_Models.getAll(Marca);
    //resolver que la respuesta sea una película con todos sus géneros en vez de repetir la
    // película por cada género al que la película pertenece
    autos
      ? res.status(200).json(autos)
      : res.status(404).json({ message: "Autos Not Found" });
  }

  //busca por ID
  static async getById(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID(id);
    if (!isValidID) return res.status(422).json({ message: "Not valid ID" });

    const autos = await Autos_Models.getById(id);
    if (!autos.length)
      return res.status(404).json({ message: "Auto Not Found" });

    res.status(200).json(autos);
  }

  //borra una peli
  static async deleteOne(req, res) {
    const { id } = req.params;
    const isValidID = isValidUUID(id);
    if (!isValidID) return res.status(422).json({ message: "Not valid ID" });

    const result = await Autos_Models.deleteOne(id);
    if (!result) return res.status(404).json({ message: "Car Not Found" });

    res.status(204).end();
  }

  //ubsca por director
  /*  static async getByQuery(req, res) {
    if (!req.query.Marca)
      return res
        .status(400)
        .json({ message: `debe tener el nombre similar a ${Marca}` });
  }
*/

  //crea nuevo post de auto
  static async addOne(req, res) {
    const { title, year, director, duration, genre, rate } = req.body;
    const Imagen = `${URL}/${req.file.filename}`;
    const id = req.body.id;

    const isValidID = isValidUUID(id);
    if (!isValidID) {
      return res.status(422).json({ message: "Invalid ID" });
    }

    try {
      await Autos_Models.addOne(req.body);
      res.status(201).json({ message: "Auto created" });
    } catch (error) {
      if (error.message.startsWith("Incorrect")) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  // static async updateOne(req, res) {
  //   const { id } = req.params;
  //   const isValidID = isValidUUID(id);
  //   if (!isValidID) return res.status(422).json({ message: "Not valid ID" });
  //   const [isMovie, _info] = await MovieMd.getById(id);

  //   if (!isMovie) return res.status(404).json({ message: "Movie Not Found" });
  //   const updatedMovie = await MovieMd.updateOne(id, req.body);
  //   updatedMovie
  //     ? res.status(200).json({ message: "Movie updated" })
  //     : res.status(500).json({ message: "Internal Server Error" });
  // }
}
