const mongoose = require("mongoose")
const Celebrity = require("../models/celebrity")

const DB_Name = "celibrity-project"

mongoose.connect(`mongodb://localhost/${DB_Name}`,{
useCreateIndex: true,
useNewUrlParser: true,
useUnifiedTopology: true
})

const celebrities = [
    {
        name:"Cristiano Ronaldo",
        occupation:"Footballer",
        catchPhrase:"SIIIIIIIII!!!"

    },
    {
        name:"Marcelo Rebelo de Sousa",
        occupation:"President",
        catchPhrase:"Portugal acima de tudo"

    },
    {
        name:"John Mayer",
        occupation:"Musician",
        catchPhrase:"Hopefully people can see my music is tethered to my brain"
    }    
]

Celebrity.create(celebrities)
.then(() =>{
    console.log(`Created ${celebrities.length} celebrities`)
    mongoose.connection.close()
    }
    )
.catch(err=>{
    console.log("Found an error creating the data on my Model")
})
