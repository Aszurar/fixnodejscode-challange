const express = require("express");

const { v4: uuid,validate } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

// function validateId(req, res, next) {
//   const { id } = req.params;7

//   if (!validate(id)) {
//     return res.status(400).json({ error: 'Invalid repository ID' });    
//   }
//   return next();
// }

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

// app.use(validateId);
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const  { title, url, techs }  = request.body;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const repository = { ...repositories[repositoryIndex], title, url, techs };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes;

  repositories[repositoryIndex].likes = likes;

  return response.status(200).json(repositories[repositoryIndex]);
});

module.exports = app;