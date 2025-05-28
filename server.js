const express = require('express')
const app = express();
const fs = require('fs');
const path = require('path');

let staticfolder = path.join(__dirname,'client');
console.log(staticfolder)
app.set(express.static(path.join(__dirname, 'client')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(staticfolder, 'index.html'))
})
app.post('/upload', (req, res) => {
    const number = Math.floor(Math.random() * (100 - 1) * (1))
    let dir = path.join(__dirname, 'uploads', `${number}${Date.now()}${number}.jpg`)
    const image = req.body.image;

    if (image) {
        const bufferImage = Buffer.from(image, 'base64');
        fs.writeFile(dir, bufferImage, (err) => {
            if (err) {
                return res.status(500).json({ error: "Error saving image" });
            }
            else {
                res.json({ message: "Uploaded Successfully" });
            }
        })
    }

})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
