import express from "express";
import Note from "../models/noteModel.js";

const router = express.Router();

// Obtener todas las notas
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error al obtener las notas", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Obtener una nota por id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error al obtener nota por id", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Crear una nueva nota
router.post("/", async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    // Validación básica
    if (!title || !description) {
      return res.status(400).json({ error: "El título y la descripción son obligatorios" });
    }

    const note = new Note({
      title,
      description,
      priority: priority || "low",
    });

    const savedNote = await note.save();
    if (savedNote) {
      res
        .status(201)
        .json({ message: "Nota creada correctamente", note: savedNote });
    }
  } catch (error) {
    console.error("Error al crear la nota", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;