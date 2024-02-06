const socket = io();

// client-side
socket.on('connect', () => {
  console.log(socket.id);
});

// Front to Back
const changeAnswer = (ev) => {
  socket.emit('changeText', ev.target.value);
};

socket.on('updateText', (event) => updateInput(event));

// Mentor web
socket.on('disableButton', () => {
  const button = document.querySelector('.submit-button');
  const textArea = document.getElementById('studentCode');
  const title = document.getElementById('title');
  const solutionCode = document.getElementById('solution');
  const studentCodeJS = document.getElementById('studentCodeJS');
  solutionCode.style.display = 'block';
  title.textContent = 'Mentor Solution:';
  button.disabled = true;
  button.innerText = 'Mentor';
  textArea.disabled = true;
  studentCodeJS.style.display = 'none';
});

// take textArea from the back to the front
const updateInput = (event) => {
  const textArea = document.getElementById('studentCode');
  const studentCodeJS = document.getElementById('studentCodeJS');
  studentCodeJS.textContent = event;
  textArea.innerText = event;
  hljs.highlightBlock(studentCodeJS); // Reapply highlighting styles
};
