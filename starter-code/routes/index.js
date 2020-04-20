const express = require('express');
const router  = express.Router();
const Celebrity = require("../models/celebrity")
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('celebrities/index');
});

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(allTheCelebritiesFromDB => {
      console.log('Retrieved celebrities from DB:', allTheCelebritiesFromDB)
      res.render('celebrities/celebrities',{celebrities: allTheCelebritiesFromDB})
    })
    .catch(error => {
      console.log('Error while getting the celebrities from the DB: ', error)
    })
  
})

router.get('/celebrities/new', (req, res, next) => {
  
    res.render(`celebrities/new`)
  
})

router.get('/celebrities/:id', (req, res, next) => {
  const specificCelebrity = req.params.id
  console.log(specificCelebrity)
  Celebrity.findOne({_id :specificCelebrity})
    .then(CelebrityFromDB => {
      console.log('Retrieved Celebrity from DB:', CelebrityFromDB)
      res.render(`celebrities/show`,{celebrity: CelebrityFromDB})
    })
    .catch(error => {
      console.log('Error while getting the Celebrity from the DB: ', error)
    })
  
})




module.exports = router;
