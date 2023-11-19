import cors from "cors";
import express from "express";
import { router as Autos_Router } from "./src/autos/Autos_Router";

// import { router as usersRt } from "./src/users/usersRt.js";
const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(cors("*"));
app.disable("x-powered-by");

app.use(express.json());
app.listen(PORT, (err) => {
  console.log(
    err
      ? `Ocurrió un error: ${err}`
      : `Servidor corre en http://localhost:${PORT}`
  );
});

app.use("/autos", Autos_Router);
//nombre del archivo enrutador que estamos definiendo);
//nombre del archivo enrutador que estamos definiendo);
// app.use("/users", usersRt);
