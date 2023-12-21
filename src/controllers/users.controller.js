'use strict';

const usersService = require('../services/users.service');

const get = (req, res) => {
  res.statusCode = 200;
  res.send(usersService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = usersService.getById(Number(id));

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.statusCode = 200;
  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = usersService.getById(Number(id));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = usersService.update({
    id, name,
  });

  res.statusCode = 200;
  res.send(updatedUser);
};

const deleteById = (req, res) => {
  const { id } = req.params;

  if (!usersService.getById(Number(id))) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteById(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getById,
  create,
  update,
  deleteById,
};