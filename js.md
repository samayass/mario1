---
title: Mario Game with Background and Coins
comments: true
layout: default
description: Animating Mario games with starts of interacting objects
permalink: /js
image: /levels/images/mario_animation.png
image2: /images/coin.png
categories: []
tags: [javascript]
---

{% include home.html %}

<br>

<!DOCTYPE html>
<html>
<head>
  <title>User Input Form</title>
</head>
<body>
  <h1>User Input Form</h1>

  <form id="userForm">

    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required><br>

    <label for="hours">Hours:</label>
    <input type="number" id="hours" name="hours" required><br>

    <label for="task">Task:</label>
    <input type="text" id="task" name="task" required><br>

    <input type="submit" value="Submit">
  </form>

  <h2>Submitted Data</h2>

  <table id="dataTable" border="1">
    <tr>
      <th>Name</th>
      <th>Hours</th>
      <th>Task</th>
    </tr>
  </table>

  <script>
    // Handle form submission
    document.getElementById('userForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form from submitting

      // Retrieve form values
      var name = document.getElementById('name').value;
      var hours = document.getElementById('hours').value;
      var task = document.getElementById('task').value;

      // Create a JavaScript object with the form data
      var formData = {
        name: name,
        hours: hours,
        task: task
      };

      // Convert the JavaScript object to a JSON string
      var jsonData = JSON.stringify(formData);

      // Perform any desired actions with the JSON data
      console.log('JSON Data:', jsonData);

      // Parse the JSON data back into a JavaScript object
      var parsedData = JSON.parse(jsonData);

      // Add the parsed data to the table
      var table = document.getElementById('dataTable');
      var row = table.insertRow();

      var nameCell = row.insertCell();
      nameCell.innerHTML = parsedData.name;

      var hoursCell = row.insertCell();
      hoursCell.innerHTML = parsedData.hours;

      var taskCell = row.insertCell();
      taskCell.innerHTML = parsedData.task;

      // Clear the form after submission
      document.getElementById('userForm').reset();
    });
  </script>
</body>
</html>
