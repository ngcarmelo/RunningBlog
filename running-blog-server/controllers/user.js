const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");

function signUp(req, res) {
  const user = new User();

  const { name, lastname, email, password, repeatPassword } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
  user.role = "admin";
  user.active = false;

  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Passwords are required." });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({ message: "Password are not equals." });
    } else {
      bcrypt.hash(password, null, null, function(err, hash) {
        if (err) {
          res.status(500).send({ message: "Error Encripting Password." });
        } else {
          user.password = hash;

          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: "User already exists." });
            } else {
              if (!userStored) {
                res.status(404).send({ message: "Error creating user." });
              } else {
                res.status(200).send({ user: userStored });
              }
            }
          });
        }
      });
    }
  }
}

function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Server Error." });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "User not found." });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Server Error." });
          } else if (!check) {
            res.status(404).send({ message: "Wrong Password." });
          } else {
            if (!userStored.active) {
              res.status(200).send({ code: 200, message: "User disabled." });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored)
              });
            }
          }
        });
      }
    }
  });
}

function getUsers(req, res) {
  User.find().then(users => {
    if (!users) {
      res.status(404).send({ message: "User not found." });
    } else {
      res.status(200).send({ users });
    }
  });
}

function getUsersActive(req, res) {
  const query = req.query;

  User.find({ active: query.active }).then(users => {
    if (!users) {
      res.status(404).send({ message: "User not found." });
    } else {
      res.status(200).send({ users });
    }
  });
}

function uploadAvatar(req, res) {
  const params = req.params;

  User.findById({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).send({ message: "Server Error." });
    } else {
      if (!userData) {
        res.status(404).send({ message: "User not found." });
      } else {
        let user = userData;

        if (req.files) {
          let filePath = req.files.avatar.path;
          let fileSplit = filePath.split("/");
          let fileName = fileSplit[2];

          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];

          if (fileExt !== "png" && fileExt !== "jpg") {
            res.status(400).send({
              message:
                "Image extension not valid. (Extensions Allowed: .png and .jpg)"
            });
          } else {
            user.avatar = fileName;
            User.findByIdAndUpdate(
              { _id: params.id },
              user,
              (err, userResult) => {
                if (err) {
                  res.status(500).send({ message: "Server Error." });
                } else {
                  if (!userResult) {
                    res.status(404).send({ message: "User not found." });
                  } else {
                    res.status(200).send({ avatarName: fileName });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
}

function getAvatar(req, res) {
  const avatarName = req.params.avatarName;
  const filePath = "./uploads/avatar/" + avatarName;

  fs.exists(filePath, exists => {
    if (!exists) {
      res.status(404).send({ message: "Avatar not exists." });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}

async function updateUser(req, res) {
  let userData = req.body;
  userData.email = req.body.email.toLowerCase();
  const params = req.params;

  if (userData.password) {
    await bcrypt.hash(userData.password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send({ message: "Error encrypting password." });
      } else {
        userData.password = hash;
      }
    });
  }

  User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
    if (err) {
      res.status(500).send({ message: "Server Error." });
    } else {
      if (!userUpdate) {
        res.status(404).send({ message: "User not found." });
      } else {
        res.status(200).send({ message: "Uer updated successfully." });
      }
    }
  });
}

function activateUser(req, res) {
  const { id } = req.params;
  const { active } = req.body;

  User.findByIdAndUpdate(id, { active }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Server Error." });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "Uer not found." });
      } else {
        if (active === true) {
          res.status(200).send({ message: "Used disabled successfully." });
        } else {
          res.status(200).send({ message: "User disabled successfully." });
        }
      }
    }
  });
}

function deleteUser(req, res) {
  const { id } = req.params;

  User.findByIdAndRemove(id, (err, userDeleted) => {
    if (err) {
      res.status(500).send({ message: "Server Error." });
    } else {
      if (!userDeleted) {
        res.status(404).send({ message: "User not found." });
      } else {
        res
          .status(200)
          .send({ message: "User has been deleted successfully." });
      }
    }
  });
}

function signUpAdmin(req, res) {
  const user = new User();

  const { name, lastname, email, role, password } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
  user.role = role;
  user.active = true;

  if (!password) {
    res.status(500).send({ message: "Password is required. " });
  } else {
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send({ message: "Error encripting password." });
      } else {
        user.password = hash;

        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({ message: "User already exists." });
          } else {
            if (!userStored) {
              res.status(500).send({ message: "Error creating User." });
            } else {
              // res.status(200).send({ user: userStored });
              res.status(200).send({ message: "User created successfully." });
            }
          }
        });
      }
    });
  }
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUsersActive,
  uploadAvatar,
  getAvatar,
  updateUser,
  activateUser,
  deleteUser,
  signUpAdmin
};
