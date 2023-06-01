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


<head>
    <!-- load jQuery and DataTables scripts -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">
    <script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>var define = null;</script>
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
</head>

<head>
  <title>User Input Form</title>
</head>
<body>
  <h1>User Input Form</h1>

  <form id="userForm">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required><br>

    <label for="dob">Hours:</label>
    <input type="number" id="dob" name="dob" required><br>

    <label for="age">Task:</label>
    <input type="text" id="age" name="age" required><br>

    <input type="submit" value="Submit">
  </form>

  <script>
    // Handle form submission
    document.getElementById('userForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form from submitting

      // Retrieve form values
      var name = document.getElementById('name').value;
      var dob = document.getElementById('dob').value;
      var age = document.getElementById('age').value;

      // Perform any desired actions with the form data
      console.log('Name:', name);
      console.log('Hours:', dob);
      console.log('Task:', age);

      // Using Fetch API to send the data to a server
      
      fetch('https://samayass.github.io/mario1/submit', {
        method: 'POST',
        body: JSON.stringify({ name, dob, age }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          // Handle the server's response
          console.log('Server Response:', data);
        })
        .catch(error => {
          // Handle any errors
          console.error('Error:', error);
        });
    });
  </script>

<table id="flaskTable" class="table" style="width:100%">
    <thead id="flaskHead">
        <tr>
            <th>Name</th>
            <th>Hours</th>
            <th>Task</th>
        </tr>
    </thead>
    <tbody id="flaskBody"></tbody>
</table>

<script>
  $(document).ready(function() {
    fetch('https://samayass.github.io/mario1/submit', { mode: 'cors' })
    .then(response => {
      if (!response.ok) {
        throw new Error('API response failed');
      }
      return response.json();
    })
    .then(data => {
      for (const row of data) {
        $('#flaskBody').append('<tr><td>' + 
            row.name + '</td><td>' + 
            row.hours + '</td><td>' + 
            row.task + '</td></tr>');
      }
      // BUG warning - Jupyter does not show Datatable controls, works on deployed GitHub pages
      $("#flaskTable").DataTable();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
</script>