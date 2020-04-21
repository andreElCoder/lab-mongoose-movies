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

router.post('/celebrities', (req, res, next) => {

  const {name,occupation,catchPhrase} = req.body
  const newCelebrity = new Celebrity({name,occupation,catchPhrase})
  newCelebrity.save()
    .then(CelebritySavedOnDB => {
      console.log('Celebry added on DB:',CelebritySavedOnDB)
      Celebrity.find()
      .then(allTheCelebritiesFromDB => {
        console.log('Retrieved celebrities from DB:', allTheCelebritiesFromDB)
        res.render('celebrities/celebrities',{celebrities: allTheCelebritiesFromDB})
      })
      .catch(error => {
        console.log('Error while getting the celebrities from the DB: ', error)
      })
    })
    .catch(error => {
      console.log('Error while saving the celebry on the DB: ', error)
      res.render(`celebrities/new`)
    })
  
})

router.post('/celebrities/:id/delete',(req,res)=>{
  const id = req.params.id

  Celebrity.findByIdAndRemove(id)
  .then(()=>{
    Celebrity.find()
    .then(allTheCelebritiesFromDB => {
      console.log('Retrieved celebrities from DB:', allTheCelebritiesFromDB)
      res.render('celebrities/celebrities',{celebrities: allTheCelebritiesFromDB})
    })
})
  .catch(err =>{
    console.log("some problem removind the celebrity")
    res.render("celebrities/celebrities")
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
