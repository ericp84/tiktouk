const mongoose = require ('mongoose');

const options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,  
}

mongoose.connect('mongodb+srv://admin:azerty16@cluster0.306p7.mongodb.net/tiktouk?retryWrites=true&w=majority',
options, function(err) {
    if(err) {
        console.log('ERREUR DE CONNEXION A LA BASE DE DONNEES' (err))
    } else { console.log('CONNEXION A LA BASE DE DONNEES REUSSIE') }
})

module.exports = mongoose;