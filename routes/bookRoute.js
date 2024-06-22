import express from "express";
import { Book } from "../models/bookModels.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.py) {
      return response.status(400).send({
        message: "Send all requiered fileds : title, author, py",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      py: request.body.py,
    };

    const BookMERN = await Book.create(newBook);

    return response.status(201).send(BookMERN);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//for alllllll
router.get("/", async (request, response) => {
  try {
    const bookies = await Book.find({});

    return response.status(200).json({
      count: bookies.length,
      data: bookies,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//for only one with id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const bookies = await Book.findById(id);

    return response.status(200).json({
      count: bookies.length,
      data: bookies,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route

router.put("/:id", async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.py) {
      return response.status(400).send({
        message: "Send all requierde firsl : title ,aauthr, py",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response
        .status(404)
        .json({ message: "Bookyyyyyyy Not Found ..." });
    }

    return response.status(200).send({ message: "Book updated succesfullll" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//delete

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found..." });
    }
    return response.status(200).send({ message: "Book Deleted succefulyyyyy" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
