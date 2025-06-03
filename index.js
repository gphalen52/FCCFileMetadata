var express = require('express');
var cors = require('cors');
var multer = require('multer'); // <-- Add this
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Set up multer
const upload = multer({ dest: 'uploads/' }); // Files will be stored temporarily here

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// POST route to handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});