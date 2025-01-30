const BabyController = require('../controllers/babysControllers.js');
const UseConnection = require('../middlewares/UseConnection.js');
const validations = require('../middlewares/GeneralValidations.js');
const token = require('../middlewares/authenticate.js');
const checkTypeUser = require('../middlewares/checkTypeUser.js');
const limitAccess = require('../middlewares/limitAccess.js');
const express = require("express");
const api = express.Router();
// Te explico la estructura 
//          ruta                    milddlewares               |-función/metodo que se va aplicar a la ruta -|
//                      conexion a la base      validacion 
api.post('/registerBaby/:_id', [UseConnection.getPool, validations.registro_update_bebe, token.authenticateToken, checkTypeUser, limitAccess(1)],(...args) => BabyController.registerBaby(...args));
api.put('/updateBaby/:_id', [UseConnection.getPool, validations.registro_update_bebe, token.authenticateToken, checkTypeUser, limitAccess(1)], (...args) => BabyController.updateBaby(...args));
api.get('/showBaby/:_id', [UseConnection.getPool, token.authenticateToken, checkTypeUser, limitAccess(1)], (...args)=> BabyController.showBaby(...args));
api.get('/showBabyForCaregiver/:_id/:id_bebe', [UseConnection.getPool, token.authenticateToken, checkTypeUser, limitAccess(2)], (req, res) => BabyController.showBabyForCaregiver(req, res));
module.exports = api;