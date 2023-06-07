const Task = require("../model/Task");

const createTask = async (req, res, next) => {
  const { title, description, due_date, status } = req.body;
  const task = new Task({
    title,
    description,
    due_date,
    status,
  });
  try {
    if (title === "") res.status(400).json({ message: "Title required" });
    if (description === "")
      res.status(400).json({ message: "description required" });
    if (due_date === "") res.status(400).json({ message: "Date required" });
    await task.save();
    res.status(201).json({ message: "The task has been created successfully" });
  } catch (err) {
    console.error(err);
  }
};



exports.createTask = createTask;
