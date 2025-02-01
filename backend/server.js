const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Path to the waitlist.json file
const waitlistFilePath = path.join(__dirname, 'waitlist.json');  // This ensures we are referencing the correct file

// Route to handle the form submission
app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  // Create an object to hold the waitlist data
  const waitlistData = { name, email };

  // Read the current waitlist data from the JSON file
  fs.readFile(waitlistFilePath, 'utf8', (err, data) => {
    if (err) {
      // If an error occurs while reading, send a 500 error
      return res.status(500).send('Error reading waitlist data');
    }

    // Parse the existing waitlist data or create an empty array if the file is empty
    const parsedData = data ? JSON.parse(data) : [];
    
    // Add the new entry to the waitlist
    parsedData.push(waitlistData);

    // Write the updated waitlist data back to the JSON file
    fs.writeFile(waitlistFilePath, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        // If there's an error writing the data, send a 500 error
        return res.status(500).send('Error saving waitlist data');
      }
      // Send a success message
      res.send('Successfully added to the waitlist!');
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
