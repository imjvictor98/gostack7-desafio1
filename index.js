const express = require("express");
const app = express();

app.use(express.json());

const projects = [];
var qtdReq = 0;

app.use((req, res, next) => {
  qtdReq++;

  console.log(`Requisiçoes feitas: ${qtdReq}`);

  next();
});

function verificaId(req, res, next) {
  const { id } = req.params;

  if (!projects[id]) {
    res.status(400).json({ error: "O id pesquisado não existe!" });
  }
  return next();
}
app.get("/projects", (req, res) => {
  res.json(projects);
});

app.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id: id,
    title: title,
    tasks: []
  };

  projects.push(project);
});

app.post("/projects/:id/tasks", verificaId, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  projects[id].tasks.push(tasks);
});

app.put("/projects/:id", verificaId, (req, res) => {
  const idParametro = req.params.id;
  const idArray = req.body.id;
  const name = req.body.name;

  projects[idParametro].id = idArray;
  projects[idParametro].name = name;
});

app.delete("/projects/:id", verificaId, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  res.status(200).json({ message: "Deletado" });
});

app.listen(3000, () => {
  console.log("Servidor está rodando em localhost:3000");
});
