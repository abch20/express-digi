import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// add new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).json(newTea);
});
// list all teas
app.get("/list-teas", (req, res) => {
  res.json(teaData);
});

// get tea by id
app.get("/list-teas/:id", (req, res) => {
  const teaId = parseInt(req.params.id);
  const tea = teaData.find((t) => t.id === teaId);
  if (tea) {
    res.json(tea);
  } else {
    res.status(404).json({ message: "Tea not found" });
  }
});

//update tea by id
app.put("/list-teas/edit/:id", (req, res) => {
  const teaId = parseInt(req.params.id);
  const { name, price } = req.body;
  const teaIndex = teaData.findIndex((t) => t.id === teaId);
  if (teaIndex !== -1) {
    teaData[teaIndex] = { id: teaId, name, price };
    res.json(teaData[teaIndex]);
  } else {
    res.status(404).json({ message: "Tea not found" });
  }
});

//delete tea by id
app.delete("/list-teas/delete/:id", (req, res) => {
  const teaId = parseInt(req.params.id);
  const teaIndex = teaData.findIndex((t) => t.id === teaId);
  if (teaIndex !== -1) {
    const deletedTea = teaData.splice(teaIndex, 1);
    res.json(deletedTea[0]);
  } else {
    res.status(404).json({ message: "Tea not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
