let API_KEY ='2bd5dddb9287492f812f4e079c44f065'; //Clef de l'API
let ville = "Chambery"; //Ville de base
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
     var donnes =JSON.parse(n); // On transforme le texte recu par l'API en objet JSON
     donnes = donnes.data;      // On récupere uniquement les "data"
     donnes= donnes[0];         // 
    //console.log(donnes);      //Debugage
    changementFond(donnes.temp);
    affichageVille(donnes.city_name);   //On change l'affichage de la ville
    changementVariables(donnes);        //On change les données secondaires
    
}

function init() { 
    ajaxGetRequest(meteoPush, 'https://api.weatherbit.io/v2.0/current?key='+API_KEY+'&city='+ville,true); //Appel initial de l'API    
}

function changementFond(temp){
    var fond = document.getElementById('fond'); //On recupere l'element d'ID 'fond' et on changera son attribut
    //console.log(fond); //Debugage
    if(temp>25){    //Cas : Température superieur à 25°C
        fond.setAttribute("class","chaud");
    }

    else if(temp<=25 && temp>=10){ // Cas : Température comprise entre 25°C et 10°C
        fond.setAttribute('class', 'modere');
    }
    
    else if(temp<10){   //Cas : Température inférieur à 10°C
       fond.setAttribute('class', 'froid');
    }
    afficherTemp(temp);
}

function affichageVille(ville){
    document.getElementById('ville').innerText=ville;   //On change le contenu de l'element HTML d'ID 'ville' en y mettant la nouvelle ville
}

function affichageDate(date){
    document.getElementById('date').innerText=date;     //On change le contenu de l'elemet HTML d'ID 'date' en y mettant la date des données
}

function changementVariables(donnes){
    var vitesse_vent = donnes.wind_spd;
    vitesse_vent = vitesse_vent * 3.6; // On transforme les m/s en km/h
    vitesse_vent = Math.round(vitesse_vent); // Arrondi la vitesse du vent
    document.getElementById('vent-vitesse').innerText = vitesse_vent + " km/h"; //On change le contenu de l'elemet HTML d'ID 'vent-vitesse' et on y met la vitesse du vent
    document.getElementById('soleil-leve').innerText = donnes.sunrise;          //On change le contenu de l'elemet HTML d'ID 'soleil-leve' et on y met l'heure du lever du soleil
    document.getElementById('soleil-couche').innerText = donnes.sunset;         //On change le contenu de l'elemet HTML d'ID 'soleil-couche' et on y met l'heure du coucher du soleil
    document.getElementById('pluie').innerText = donnes.precip + " mm";         //On change le contenu de l'elemet HTML d'ID 'pluie' et on y met la hauteur de pluie tombée


}

function afficherTemp(temp){
    document.getElementById('temperature').innerText = temp + " °C";             //On change le contenu de l'elemet HTML d'ID 'temperature' et on y met la temperature en °C
}