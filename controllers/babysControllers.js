const MongoConnection = require("../middlewares/connection.js");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb").ObjectId;

module.exports = (() => {
  class Babys {
    async registerBaby(req, res) {
      try {
        let { _id } = req.params;
        let {
          nombre,
          apellido,
          fecha_nacimiento,
          genero,
          grupo_sanguineo,
          alergias,
          condiciones_medicas,
          vacunas,
          lactancia,
          crecimiento,
          clave_bebe,
        } = req.body;

        //let { email, password } = req.body; es lo mismo que las lineas anteriores
        //nombre = "Juan";
        let users = await req.db
          .collection("alumno")
          .aggregate([
            {
              $match: {
                _id: new mongoose.Types.ObjectId(_id),
                // _id: new ObjectId(_id)
              },
            },
          ])
          .toArray();
        let user = users[0];
        if (user.bebes.length > 1)
          return res.status(401).send({
            successful: false,
            error: true,
            message: "Ya existe un Bebe en el usuario",
          });
        //console.log("users");
        //console.log(users);
        //user.bebe
        //console.log("vacunas");
        //console.log(vacunas);
        let data_bebe = {
          id_bebe: _id,
          nombre: nombre,
          apellido: apellido,
          fecha_nacimiento: fecha_nacimiento,
          genero: genero,
          grupo_sanguineo: grupo_sanguineo,
          alergias: alergias,
          condiciones_medicas: condiciones_medicas,
          clave_bebe: clave_bebe,
          vacunas: vacunas || [],
          lactancia: lactancia || [],
          crecimiento: crecimiento || [],
        };
        user.bebes.push(data_bebe);
        let update_childs = await req.db.collection("alumno").updateOne(
          { _id: new mongoose.Types.ObjectId(_id) },
          {
            $set: user,
          }
        );
        //console.log(update_childs);
        //console.log("entrando a la funcion registro de bebes");
        return res.status(200).send({
          successful: true,
          message: update_childs,
        });
      } catch (error) {
        //console.error(error.message);
        return res.status(401).send({
          successful: false,
          error: true,
          message: "Algo salio mal con el registro del bebe",
        });
      } finally {
        //Terminamos la sesión con la BD
        await MongoConnection.releasePool(req.db);
      }
    }

    async updateBaby(req, res) {
      try {
        let { _id } = req.params;
        let {
          nombre,
          apellido,
          fecha_nacimiento,
          genero,
          grupo_sanguineo,
          alergias,
          condiciones_medicas,
          clave_bebe,
        } = req.body;

        //let { email, password } = req.body; es lo mismo que las lineas anteriores
        //nombre = "Juan";
        let users = await req.db
          .collection("alumno")
          .aggregate([
            {
              $match: {
                _id: new mongoose.Types.ObjectId(_id),
                // _id: new ObjectId(_id)
              },
            },
          ])
          .toArray();

        let user = users[0];

        let bebes = user.bebes[0];

        let vacunas = bebes.vacunas;
        let lactancia = bebes.lactancia;
        let crecimiento = bebes.crecimiento;

        //console.log(bebes);
        nombre ? (bebes.nombre = nombre) : null;
        apellido ? (bebes.apellido = apellido) : null;
        fecha_nacimiento
          ? (bebes.fecha_nacimiento = new Date(fecha_nacimiento))
          : (bebes.fecha_nacimiento = new Date());
        genero ? (bebes.genero = genero) : null;
        //console.log("AQUI ESTAN TUS VARIABLES");
        //console.log(genero);
        //console.log(bebes.genero);
        grupo_sanguineo ? (bebes.grupo_sanguineo = grupo_sanguineo) : null;
        alergias ? (bebes.alergias = alergias) : null;
        condiciones_medicas
          ? (bebes.condiciones_medicas = condiciones_medicas)
          : null;
        clave_bebe ? (bebes.clave_bebe = clave_bebe) : null;
        vacunas ? (bebes.vacunas = vacunas) : [];
        lactancia ? (bebes.lactancia = lactancia) : [];
        crecimiento ? (bebes.crecimiento = crecimiento) : [];
        //console.log(bebes);
        user.bebes = [bebes];

        //console.log("users de update bebe, MIRAAAA");
        //console.log(user);

        //console.log(
        //  "Este es el struct antes de que se suba a la base de datos"
        //);
        //console.log(user.bebes[0]);

        let update_childs = await req.db.collection("alumno").updateOne(
          { _id: new mongoose.Types.ObjectId(_id) },
          {
            $set: user,
          }
        );

        //console.log(update_childs);
        //console.log("entrando a la funcion update de los bebes");

        return res.status(200).send({
          successful: true,
          message: update_childs,
        });
      } catch (error) {
        console.log(error);
        //console.error(error.message);
        return res.status(401).send({
          successful: false,
          error: true,
          message: "Algo salio mal con el registro del bebe",
        });
      } finally {
        //Terminamos la sesión con la BD
        await MongoConnection.releasePool(req.db);
      }
    }

    async showBaby(req, res) {
      try {
        let { _id } = req.params;
        let conexion = await req.db
          .collection("alumno")
          .aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(_id) } },
            {
              $project: {
                _id: 0,
                nombre: 0,
                apellido: 0,
                fecha_nacimiento: 0,
                numero_telefono: 0,
                correo_electronico: 0,
                contrasena: 0,
                tipo_usuario: 0,
              },
            },
          ])
          .toArray();
        //Sí la conexion esta vacio o es match es menor a 1 manda error
        if (!conexion || conexion.length < 1)
          return res.status(400).send({
            succes: false,
            error: true,
            message: "Hay un error en el _id",
          });

        //console.log("Entrando a la funcion get del chamaco");
        //console.log(conexion);
        return res.status(200).send({
          successful: true,
          message: conexion,
        });
      } catch (error) {
        console.error(error.message);
        return res.status(401).send({
          successful: false,
          error: true,
          message: "Ah ocurrido un error al actualizar los datos",
        });
      } finally {
        //Terminamos la sesión con la BD
        await MongoConnection.releasePool(req.db);
      }
    }

    async showBabyForCaregiver(req, res) {
      try {
        let { id_bebe } = req.params;
        let conexion = await req.db
          .collection("alumno")
          .aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id_bebe) } },
            {
              $project: {
                _id: 0,
                nombre: 0,
                apellido: 0,
                fecha_nacimiento: 0,
                numero_telefono: 0,
                correo_electronico: 0,
                contrasena: 0,
                tipo_usuario: 0,
              },
            },
          ])
          .toArray();
        //Sí la conexion esta vacio o es match es menor a 1 manda error
        if (!conexion || conexion.length < 1)
          return res.status(400).send({
            succes: false,
            error: true,
            message: "Hay un error en el _id",
          });

        console.log("Entrando a la funcion get del chamaco");
        console.log(conexion);
        return res.status(200).send({
          successful: true,
          message: conexion,
        });
      } catch (error) {
        console.error(error.message);
        return res.status(401).send({
          successful: false,
          error: true,
          message: "Ah ocurrido un error al actualizar los datos",
        });
      } finally {
        //Terminamos la sesión con la BD
        await MongoConnection.releasePool(req.db);
      }
    }
  }
  return new Babys();
})();
