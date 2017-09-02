const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));    //built in express middleware to tell express to serve contents from the provided folder

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('Hello Express!');
  res.render('home',{
    pageTitle: 'Home Page',
    name: 'Punit',
    likes: [
      'Coding',
      'Bodybuilding',
      'Biking'
    ]
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects',(req, res) => {
  res.render('projects', {
    pageTitle: 'My Projects'
  });
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
