let API_KEY ="2bd5dddb9287492f812f4e079c44f065";
let Ville = "Chambery"; //Ville de base
var infos = []; //Variable ou sera stocké les informations renvoyé par l'API

function ajaxGetRequest(callback, url, async) {
    var xhr = new XMLHttpRequest(); // Création de l'objet
    // Définition de la fonction à exécuter à chaque changement d'état
    xhr.onreadystatechange = function () {
        if (callback && xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            // Si le serveur a fini son travail (XMLHttpRequest.DONE = 4)
            // et que le code d'état indique que tout s'est bien passé
            // => On appelle la fonction callback en lui passant la réponse
            callback(xhr.responseText);
        }
    };
    xhr.open("GET", url, async); // Initialisation de l'objet
    xhr.send(); // Envoi de la requête

}

function meteoPush(n){
 
}
//fonction

function init() { 
    ajaxGetRequest(meteoPush, 'https://api.weatherbit.io/v2.0/current?key=${API_KEY}&city=${Ville}',true); //Appel initial de l'API 
    changementFond(5);
}

function changementFond(temp){
    var fond = document.getElementById('fond');
    console.log(fond);
    if(temp>25){    //Cas : Température superieur à 25°C
        fond.setAttribute("class","chaud");
    }

    else if(temp<=25 && temp>=10){ // Cas : Température comprise entre 25°C et 10°C
        fond.setAttribute('class', 'modere');
    }
    
    else if(temp<10){   //Cas : Température inférieur à 10°C
       fond.setAttribute('class', 'froid');
    }
}