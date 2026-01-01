const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()
const PORT = 5000

// Middleware
app.use(express.json())
app.use(express.static(__dirname))

// Home route (fixes Cannot GET /)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

// Contact form route
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body

  const entry = `
Name: ${name}
Email: ${email}
Message: ${message}
Time: ${new Date().toLocaleString()}
--------------------
`

  const filePath = path.join(__dirname, "formData.txt")

  fs.appendFile(filePath, entry, err => {
    if (err) {
      console.error(err)
      return res.status(500).send("Error saving data")
    }
    res.send("Thank you! Your message has been saved.")
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
