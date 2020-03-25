const Menu = require("../models/menu");

function addMenu(req, res) {
  const { title, url, order, active } = req.body;
  const menu = new Menu();
  menu.title = title;
  menu.url = url;
  menu.order = order;
  menu.active = active;

  menu.save((err, createdMenu) => {
    if (err) {
      res.status(500).send({ message: "Server Error." });
    } else {
      if (!createdMenu) {
        res.status(404).send({ message: "Error creating menu." });
      } else {
        res.status(200).send({ message: "Menu created correctly." });
      }
    }
  });
}

function getMenus(req, res) {
  Menu.find()
    .sort({ order: "asc" })
    .exec((err, menusStored) => {
      if (err) {
        res.status(500).send({ message: "Server Error." });
      } else {
        if (!menusStored) {
          res.status(404).send({
            message: "Menu not found."
          });
        } else {
          res.status(200).send({ menu: menusStored });
        }
      }
    });
}

function updateMenu(req, res) {
  let menuData = req.body;
  const params = req.params;

  Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdate) => {
    if (err) {
      res.status(500).send({ message: "Server Error." });
    } else {
      if (!menuUpdate) {
        res.status(404).send({ message: "Menu not found." });
      } else {
        res.status(200).send({ message: "Menu updated correctly." });
      }
    }
  });
}

function activateMenu(req, res) {
  const { id } = req.params;
  const { active } = req.body;

  Menu.findByIdAndUpdate(id, { active }, (err, menuStored) => {
    if (err) {
      res.status(500).send({ message: "Server Error." });
    } else {
      if (!menuStored) {
        res.status(404).send({ message: "Menu  not found." });
      } else {
        if (active === true) {
          res.status(200).send({ message: "Menu activated correctly." });
        } else {
          res.status(200).send({ message: "Menu disabled correctly." });
        }
      }
    }
  });
}

function deleteMenu(req, res) {
  const { id } = req.params;

  Menu.findByIdAndRemove(id, (err, menuDeleted) => {
    if (err) {
      res.status(500).send({ message: "Server Error." });
    } else {
      if (!menuDeleted) {
        res.status(404).send({ message: "Menu not found." });
      } else {
        res.status(200).send({ message: "Menu has been deleted correctly." });
      }
    }
  });
}

module.exports = {
  addMenu,
  getMenus,
  updateMenu,
  activateMenu,
  deleteMenu
};
