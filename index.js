import cors from "cors";
import express from "express";
import { router as Autos_Router } from "./src/autos/Autos_Router.js";

// import { router as usersRt } from "./src/users/usersRt.js";
const app = express();
app.use(cors("*"));
app.disable("x-powered-by");

app.use(express.json());

const PORT = process.env.PORT || 4200;

app.listen(PORT, (err) => {
  console.log(
    err
      ? `Ocurrió un error: ${err}`
      : `Servidor corre en http://localhost:${PORT}`
  );
});

// Ejemplo de ruta para la raíz
// app.get("/", (req, res) => {
//   res.send("¡Hola!");
// });

app.use("/", Autos_Router);

//nombre del archivo enrutador que estamos definiendo);
//nombre del archivo enrutador que estamos definiendo);
// app.use("/users", usersRt);
