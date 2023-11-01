import app from "./app";
import { dbConnetc } from "./db";

dbConnetc();

app.listen(3000);
console.log("server on port", 3000);
