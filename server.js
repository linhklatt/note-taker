const express = require("express");
const fs = require("fs");
const path = require("path");
const api = require("./routes/index.js");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", api);

app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Delete note
app.delete("/api/notes/:id", (req, res) => {
  const notesArray = JSON.parse(fs.readFileSync("./db/db.json"));
  const deleteNote = notesArray.filter(
    (removeNote) => removeNote.id !== req.params.id
  );
  fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
  res.json(deleteNote);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
