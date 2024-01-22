/*
Here is where you'll set up your server as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the palindrome checker.
You do not have to use handlebars for this since everything will be done client side. Your server is JUST to serve the static html file and all processing will be done using client side JavaScript
*/
import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
// import exphbs from 'express-handlebars';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = express.static(__dirname + '/public');

// const handlebarsInstance = exphbs.create({
//   defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
//   helpers: {
//     asJSON: (obj, spacing) => {
//       if (typeof spacing === 'number')
//         return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

//       return new Handlebars.SafeString(JSON.stringify(obj));
//     }
//   }
// });

app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.engine('handlebars', handlebarsInstance.engine);
// app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});


