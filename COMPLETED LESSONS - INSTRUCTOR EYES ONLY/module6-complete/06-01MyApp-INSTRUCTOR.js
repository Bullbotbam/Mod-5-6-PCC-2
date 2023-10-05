
const express = require('express'); // do not edit
const app = express();              // do not edit


//**********************************************//
/// PCC Module 6 - Applied InfoSec Challenges  ///
// ============================================///
//**********************************************//

/// ** Challenges ** ///

// #1 ) Information Security with HelmetJS - Install and Require Helmet

const helmet = require('helmet');


// #2 ) Hide Potentially Dangerous Information Using helmet.hidePoweredBy()

app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' })) // when demoing - pull up headers on inspect before and after to demo changes 


// #3 ) Mitigate the Risk of Clickjacking with helmet.frameguard()

app.use(helmet.frameguard( { action: 'deny' } ))

// #4 ) Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter()

//instructor note: this method is actually outdated and has very signifigant vulernabilities -
// this sets the x-xss-protection filter to 1 - in this version of helmet.js - which is now known to be wrong. 
// we want x-xss-protection filter set to 0 - this was known from like around 2019 onward...
// what that means: a xss auditor found that he was able to abuse the filtermode of 1 w/ a very well known technique to disable scripts,
// effectively tricking chrome into believing that the non malicious script was executing xss, allowing him to bypass it and execute 
//his own malicious script. the exact opposite of what it is supposed to do. 

// for more info - look into : helmetjs xssfilter cross-site exfiltrate exploit

app.use(helmet.xssFilter()); // outdated but thats the challenge.

// # 5 ) Avoid Inferring the Response MIME Type with helmet.noSniff()

// instructor note: MIME types basically tell the browser what type of resources/files we are transfering around the webapp / users browser.
// a hacker could upload a malicious JS file and give a false MIME type - like .jpeg - or none at all - and the browser will
//  accept it and execute it on the user machine - which is.. BAD. So we can try mitigating this by blocking the browser from 
// executing ANY files that dont have a specified MIME type that is known. 

//check inspect -> headers to verify this worked - you should see noSniff type.

app.use(helmet.noSniff());

// # 6 ) Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()

// instructor note: while we may think no-one is using IE anymore - alot of old machines are probably still running it as the default.
// bascially this prevents IE users from potentially opening/downloading malicious code ON TOP of our site - which would allow
// a hacker to potentially steal session/cookie data - this will force the user on IE to download the file, with no OPEN option,
// so potentially malicious code is no longer opened ontop of the browser - seperating our user data from the malicious script.

app.use(helmet.ieNoOpen())

// # 7 ) Access Your Site via HTTPS Only with helmet.hsts()

// note: this protects against a'ssl protocol downgrade attack', better known as a 'man in the middle attack'. 
// look into that if you want - but essnetially its what it sounds like - where a third party can intercept and relay data 
// between the user and the webapp - so all traffic flows through them - obvi that would allow them to sniff and modify packets
// helmet.hsts tells the app hey - use https only - if anyone requests anything through http only, just dont even do it at all.

//90 days in milliseconds
let nintyDays = 90 * 24 * 60 * 60 * 1000

app.use(helmet.hsts( { maxAge: nintyDays, force: true } ))


// # 8 ) Disable DNS Prefetching with helmet.dnsPrefetchControl()
// Note: this literally just turns off DNS prefetching - pretty simple and straightforward based on what PCC covers
// IN a live app - the header of : x-dns-prefetch will be turned off and able to be seen as off in dev tools.

app.use(helmet.dnsPrefetchControl())

// # 9 ) Disable Client-Side Caching with helmet.noCache()
// Cache is good for performace - but if we fix a major security flaw - we can disable caching so all users get the most updated version
// of our site to ensure all flaws are fixed for all users

app.use(helmet.noCache());

// # 10 ) Set a Content Security Policy with helmet.contentSecurityPolicy()

// this ensures site resources for our site are only delivered/loaded from where we specify

//note the quotes - single quotes are part of self keyword

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "trusted-cdn.com"]
  }
}))

// #11 ) Configure Helmet Using the ‘parent’ helmet() Middleware

// simply using this one method- it enables all the security policies we just did in the last 10 challenges - excluding noCache.
// what pcc is showing we can customize that helmet() parent middleware - by disabling or enabling specific middlewares.
//this is literally all youd have to do in a real app to have some type of security

app.use(helmet());

//or custom

app.use(helmet({
  noSniff: false, // disable
  hidePoweredBy: { /// enable and configure if req - like above
    setTo: "PHP 6.69.9"
  },
  frameguard: {
    action: 'deny' /// or just config if req. like above.
  },
  noCache: true // or just enable
}))


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




