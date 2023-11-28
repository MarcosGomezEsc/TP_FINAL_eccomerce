import { isValid } from "zod";
import { connection } from "../../db_config.js";

export class Autos_Models {
  static async getAll(Marca) {
    try {
      if (!Marca) {
        const [autos_nuevos, _info] = await connection.query(
          `SELECT
            Marca,
            Modelo,
            Anio,
            Color,
            TipoCombustible,
            Precio,
            NumPuertas
            Motor,
            Imagen
          FROM autos_nuevos.autos_nuevos`
        );
        return autos_nuevos.length > 0 ? autos_nuevos : [];
      }
    } catch (error) {
      console.error(
        `Error al obtener autos nuevos: ${(error.message = "no autos")}`
      );
      throw error;
    }
  }
  static async getById(id) {
    const [autos_nuevos, _info] = await connection.query(
      `SELECT
          Marca,
          Modelo,
          Anio,
          Color,
          TipoCombustible,
          Precio,
          NumPuertas,
          Motor,
          Imagen,
          BIN_TO_UUID(id) as id
        FROM autos_nuevos.autos_nuevos WHERE id = UUID_TO_BIN(?)`,
      [id]
    );
    return autos_nuevos[id];
  }

  //     /*complete with list of genre per movie:
  //     SELECT m.title, g.name, m.year, m.director, BIN_TO_UUID(m.id) AS id FROM movies m
  // JOIN movie_genres mg ON mg.movie_id = m.id
  // JOIN genres g ON mg.genre_id = g.id
  //     */
  //     return movie;

  static async deleteOne(id) {
    const [info] = await connection.query(
      `DELETE FROM autos_nuevos WHERE autos_nuevos.autos_nuevos.id = UUID_TO_BIN(?)`,
      [id]
    );
    return info.affectedRows;
  }

  //agrega peli

  static async addOne(autos) {
    const {
      Marca,
      Modelo,
      Anio,
      Color,
      TipoCombustible,
      Precio,
      NumPuertas,
      Motor,
      Imagen,
    } = autos;

    try {
      const result = await connection.query(
        `
        INSERT INTO autos (Marca, Modelo, Anio, Color, TipoCombustible, Precio, NumPuertas, Motor, Imagen) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          Marca,
          Modelo,
          Anio,
          Color,
          TipoCombustible,
          Precio,
          NumPuertas,
          Motor,
          Imagen,
        ]
      );

      return result ? result : null;
    } catch (error) {
      console.error("Error inserting auto:", error);
      throw new Error("Error inserting auto into the database");
    }
  }
}
