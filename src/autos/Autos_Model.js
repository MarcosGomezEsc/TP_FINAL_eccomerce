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
        console.log("autos_nuevos");
        return autos_nuevos.length > 0 ? autos_nuevos : [];
      }
    } catch (error) {
      console.error(
        `Error al obtener autos nuevos: ${(error.message = "no autos")}`
      );
      throw error;
    }
  }

  //     const [movies, _info] = await connection.query(
  //       `SELECT m.title, g.name as genre, m.year, m.director, BIN_TO_UUID(m.id) AS id FROM movies m
  //       JOIN movie_genres mg ON mg.movie_id = m.id
  //       JOIN genres g ON mg.genre_id = g.id
  //       WHERE director = ?`,
  //       [director]
  //     );
  //     return movies.length ? movies : null;

  //   /*
  //    * @param id number
  //    * @return field list -> title, year, director, rate, id
  //    */
  //   static async getById(id) {
  //     const [movie, _info] = await connection.query(
  //       `
  //   SELECT title, year, director, rate, BIN_TO_UUID(id) as id FROM movies WHERE id = UUID_TO_BIN(?)`,
  //       [id]
  //     );

  //     /*complete with list of genre per movie:
  //     SELECT m.title, g.name, m.year, m.director, BIN_TO_UUID(m.id) AS id FROM movies m
  // JOIN movie_genres mg ON mg.movie_id = m.id
  // JOIN genres g ON mg.genre_id = g.id
  //     */
  //     return movie;
  //   }

  //   static async deleteOne(id) {
  //     const [info] = await connection.query(
  //       `DELETE FROM movies WHERE movies.id = UUID_TO_BIN(?)`,
  //       [id]
  //     );
  //     return info.affectedRows;
  //   }

  //   static async addOne(movie) {
  //     const { title, year, director, duration, poster, rate, genre } = movie;

  //     const result = await connection.query(
  //       `
  //     INSERT INTO movies (title, year, director, duration, poster, rate)
  //     VALUES (?,?,?,?,?,?)`,
  //       [title, year, director, duration, poster, rate]
  //     );
  //     for (const gen of genre) {
  //       await connection.query(
  //         `
  //       INSERT INTO movie_genres (movie_id, genre_id) SELECT m.id, g.id
  //       FROM movies m JOIN genres g ON m.title = ? AND g.name IN ('${gen}')`,
  //         [title]
  //       );
  //     }
  //     return result ? result : null;
  //   }

  //   static async updateOne(id, partialMovie) {
  //     let queryString = "";
  //     for (const key in partialMovie) {
  //       queryString += `${key} = '${partialMovie[key]}', `;
  //     }
  //     queryString = queryString.slice(0, -2);
  //     const [result, _info] = await connection.query(
  //       `UPDATE movies SET ${queryString} WHERE movies.id = UUID_TO_BIN(?)`,
  //       [id]
  //     );
  //     return result.affectedRows;
  //   }
}
