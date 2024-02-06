const express = require('express');
const { result } = require('lodash');
const morgan = require('morgan');
const fs = require('fs');
const { Server } = require('socket.io');
const { createServer } = require('http');
// express app
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

let activeSockets = []; // Array to store active socket IDs

// server-side
io.on('connection', (socket) => {
  socket.on('changeText', (event) => {
    socket.broadcast.emit('updateText', event);
  });

  activeSockets.push(socket.id); // Add the new socket ID to the array

  if (activeSockets.length === 1) {
    // First socket
    socket.emit('disableButton');
  }
  socket.on('disconnect', () => {
    const index = activeSockets.indexOf(socket.id);
    if (index !== -1) {
      activeSockets.splice(index, 1); // Remove the disconnected socket ID from the array
    }
  });
});

// Function to read tasks from the JSON file
const readTasks = () => {
  try {
    const tasksData = fs.readFileSync('./data/tasks.json', 'utf8');
    return JSON.parse(tasksData);
  } catch (error) {
    console.error('Error reading tasks from file:', error);
    return []; // Return an empty array if there's an error
  }
};

// Function to write tasks to the JSON file
const writeTasks = (tasks) => {
  try {
    fs.writeFileSync('./data/tasks.json', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error writing tasks to file:', error);
  }
};

// Read tasks from the file initially
let tasks = readTasks();

// listen for requests
httpServer.listen(3000);

// middelware and static files
app.use(express.static('public')); // public file and css work
app.use(express.urlencoded({ extended: true })); // take all the url the pass to object
app.use(morgan('dev'));

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// Home Page
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', tasks });
});

// About Page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Task Page
app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (task) {
    res.render('details', { title: 'Task', task });
  } else {
    res.status(404).render('404', { title: '404' });
  }
});

// POST route with file system update
app.post('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedStudentCode = req.body.studentCode;

  // Get the correct answer for the task
  const correctAnswer = tasks[id - 1].correctAnswer;

  // Update task in the array
  tasks[id - 1].studentCode = updatedStudentCode;

  // Compare student code with the correct answer
  if (updatedStudentCode === correctAnswer) {
    tasks[id - 1].TF = ':)'; // Set TF to ':)' if the answer is correct
  } else {
    tasks[id - 1].TF = ''; // Set TF to ':(' if the answer is incorrect
  }

  // Write updated tasks to the file
  writeTasks(tasks);

  res.redirect(`/${id}`);
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
