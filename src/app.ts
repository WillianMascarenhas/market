import express, { Application } from "express";
import { productByName, ProductExist, requestExist} from "./middleware";
import {
  addNewProduct,
  deleteProduct,
  getProductById,
  listAllProduct,
  patchProduct,
} from "./logic";

const app: Application = express();
app.use(express.json());

app.get("/products", productByName, listAllProduct);
app.get("/products/:id", ProductExist, getProductById);
app.post("/products", requestExist, addNewProduct);
app.delete("/products/:id", ProductExist, deleteProduct);
app.patch("/products/:id",ProductExist, patchProduct);

app.listen(3000, () => {
  console.log("Server is running, on port 3000");
});
