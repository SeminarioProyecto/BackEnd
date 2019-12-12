const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UsuarioSchema = new Schema({
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    image: {
      type: String
    }
});

// UsuarioSchema.pre("save", function(next) {
//   const user = this;

//   // Si ya se hasheo el password
//   if (!user.isModified("password")) {
//     return next();
//   }

//   // Generar el salt
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) return next(err);

//       user.password = hash;

//       next();
//     });
//   });
// });

// UsuarioSchema.post("save", function (error, doc, next) {
//   if (error.name === "MongoError" && error.code === 1000) {
//     next(
//       "El correo electronico ya esta registrado en una cuenta"
//     );
//   } else {
//     next(error);
//   }
// });

// UsuarioSchema.methods.compararPassword = function (candidatePassword) {
//   return bcrypt.compareSync(candidatePassword, this.password);
// };

// UsuarioSchema.methods.comparePassword = async function (candidatePassword) {
//   const user = this;

//   return new Promise((resolve, reject) => {
//     bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
//       if (err) {
//         return reject(err);
//       }

//       if (!isMatch) {
//         return reject(false);
//       }

//       resolve(true);
//     });
//   }).catch();
// };

module.exports = mongoose.model("Usuario", UsuarioSchema);
