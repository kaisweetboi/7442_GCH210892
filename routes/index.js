var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
   //1) render homepage (login page)
   res.render('index', { name: "Toy Management System" })
   //2) redirect to Book List page
   //res.redirect('/book')
})

router.post('/login', (req, res) => {
   //get login data from login form
   let username = req.body.username
   let password = req.body.password
   //check login & redirect based on account
   if (username == "admin" && password == "admin") {
      //res.send("Admin page")
      //redirect to admin page
      res.redirect('/book/admin')
   } else if (username == "customer" && password == "customer") {
      //res.send("Customer page")
      //redirect to customer page
      res.redirect('/book/customer')
   } else {
      //login failed => redirect to login page
      res.redirect('/')
   }
})

module.exports = router;
