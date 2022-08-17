import { Router } from "express";
import prospectsController from "../controllers/ProspectsController";
import { check, oneOf, validationResult } from "express-validator";

const prospectsRoutes = Router();
const auth = require("../middleware/Auth").auth;

prospectsRoutes.get("/", auth, prospectsController.findAllProspects);
prospectsRoutes.get("/:id", auth, prospectsController.findProspectsById);
prospectsRoutes.post(
  "/create",
  auth,
  oneOf([
    check("nomeEmpresa", "Campo Empresa ausente").exists(),
    check("nomeContato", "Campo Contato ausente").exists(),
    check("telefone1", "Campo Tel1 ausente").exists(),
    check("telefone2", "Campo Tel2 ausente").exists(),
    check("email1", "Campo email1 ausente").exists(),
    check("id_seguimento", "Campo Seguimento ausente").exists(),
  ]),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  prospectsController.createProspects
);
prospectsRoutes.put(
  "/update/:id",
  (_, res, next) => {
    auth;
    next();
  },
  oneOf([
    check("name", "Campo name ausente").exists(),
    check("contact", "Campo contact ausente").exists(),
    check("phone1", "Campo phone1 ausente").exists(),
    check("phone2", "Campo phone2 ausente").exists(),
    check("email", "Campo email ausente").exists(),
    check("classification", "Campo classification ausente").exists(),
  ]),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  prospectsController.updateProspects
);
prospectsRoutes.delete("/:id", auth, prospectsController.deleteProspect);

export default prospectsRoutes;
