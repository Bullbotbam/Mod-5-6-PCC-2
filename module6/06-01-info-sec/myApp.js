const express = require('express'); // do not edit
const app = express();              // do not edit


//**********************************************//
/// PCC Module 6 - Applied InfoSec Challenges  ///
// ============================================///
//**********************************************//

/// ** Challenges ** ///

// #1 ) Information Security with HelmetJS - Install and Require Helmet



// #2 ) Hide Potentially Dangerous Information Using helmet.hidePoweredBy()



// #3 ) Mitigate the Risk of Clickjacking with helmet.frameguard()



// #4 ) Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter()




// # 5 ) Avoid Inferring the Response MIME Type with helmet.noSniff()



// # 6 ) Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()



// # 7 ) Access Your Site via HTTPS Only with helmet.hsts()



// # 8 ) Disable DNS Prefetching with helmet.dnsPrefetchControl()



// # 9 ) Disable Client-Side Caching with helmet.noCache()


// # 10 ) Set a Content Security Policy with helmet.contentSecurityPolicy()



// #11 ) Configure Helmet Using the ‘parent’ helmet() Middleware




// For challenge 12 / 13 / 14 - Check the sharedrive for the Bcrypt boilerplate template in the Mod 6 Folder.

























module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
//updated 9/2022 - Instructor NB