# RealTimeMentorJS - website: https://realtimementorjs.onrender.com

RealTimeMentorJS is an online coding web application designed to facilitate remote coding mentorship sessions between mentors and students in real-time. The application allows mentors to share code blocks with their students and observe them as they make changes to the code.

## Features

### Lobby Page

The Lobby page serves as the landing page for users and presents a list of available code blocks for selection.

- **Title:** Choose code block
- **Code Blocks:** A list of at least 4 items representing different code blocks (e.g., "Async case", "Promises example", etc.)

Clicking on a code block item navigates the user to the Code Block page with details of the selected code block.

### Code Block Page

The Code Block page is where the mentor and student interact with the shared code block.

- **Mentor View:**
  - Read-only mode displaying the selected code block.
- **Student View:**
  - Ability to modify the code block in real-time.
  - Code changes are displayed instantaneously using Socket.io.
  - Syntax highlighting using Highlight.js (Supports JavaScript code only).

### General Guidelines

- Code blocks are manually created with fields 'title' and 'code' (representing JS code).
- Clear comments are provided throughout the code where necessary.
- The project involves client-server interaction and database management.

## Installation

To run the project locally, follow these steps:
1. donwload node.js - to run -> node app.js
2. download nodemon - nodemon app

## Information sources and websites I used
1. highlights:
https://highlightjs.org/#usage
https://www.youtube.com/watch?v=ZX1NCf7U3ec&ab_channel=dcode

2. socket.io:
https://socket.io/docs/v4/tutorial/introduction
https://www.youtube.com/watch?v=ZKEqqIO7n-k&t=409s&ab_channel=WebDevSimplified

3. Render.com
https://dashboard.render.com/web/srv-cn18cven7f5s73fevf5g/deploys/dep-cn18d7un7f5s73fevi40?r=2024-02-06%4019%3A20%3A04%7E2024-02-06%4019%3A23%3A39
https://youtu.be/yln_CffenYw?si=TpUrlMp3y4EjeP4v

