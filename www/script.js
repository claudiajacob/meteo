let API_KEY = '2bd5dddb9287492f812f4e079c44f065'; //Clef de l'API
let ville = "Chambery"; //Ville de base
var infos = []; //Variable ou sera stocké les informations renvoyé par l'API
let CurrentDate = new Date();
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

function meteoPush(n) {
    var donnes = JSON.parse(n); // On transforme le texte recu par l'API en objet JSON
    donnes = donnes.data;      // On récupere uniquement les "data"
    donnes = donnes[0];         // 
    console.log(donnes);      //Debugage
    changementFond(donnes.temp);
    affichageVille(donnes.city_name);   //On change l'affichage de la ville
    changementVariables(donnes);        //On change les données secondaires
    afficherImageTemp(donnes);
}

function init() {
    ajaxGetRequest(meteoPush, 'https://api.weatherbit.io/v2.0/current?key=' + API_KEY + '&city=' + ville, true); //Appel initial de l'API    
}

function changementFond(temp) {
    var fond = document.getElementById('fond'); //On recupere l'element d'ID 'fond' et on changera son attribut
    //console.log(fond); //Debugage
    if (temp > 25) {    //Cas : Température superieur à 25°C
        fond.setAttribute("class", "chaud");
    }

    else if (temp <= 25 && temp >= 10) { // Cas : Température comprise entre 25°C et 10°C
        fond.setAttribute('class', 'modere');
    }

    else if (temp < 10) {   //Cas : Température inférieur à 10°C
        fond.setAttribute('class', 'froid');
    }
    afficherTemp(temp);
}

function affichageVille(ville) {
    document.getElementById('ville').innerText = ville;   //On change le contenu de l'element HTML d'ID 'ville' en y mettant la nouvelle ville
}

function affichageDate(date) {
    document.getElementById('date').innerText = date;     //On change le contenu de l'elemet HTML d'ID 'date' en y mettant la date des données
}

function changementVariables(donnes) {
    var vitesse_vent = donnes.wind_spd;
    vitesse_vent = vitesse_vent * 3.6; // On transforme les m/s en km/h
    vitesse_vent = Math.round(vitesse_vent); // Arrondi la vitesse du vent
    document.getElementById('vent-vitesse').innerText = vitesse_vent + " km/h"; //On change le contenu de l'elemet HTML d'ID 'vent-vitesse' et on y met la vitesse du vent
    document.getElementById('soleil-leve').innerText = donnes.sunrise;          //On change le contenu de l'elemet HTML d'ID 'soleil-leve' et on y met l'heure du lever du soleil
    document.getElementById('soleil-couche').innerText = donnes.sunset;         //On change le contenu de l'elemet HTML d'ID 'soleil-couche' et on y met l'heure du coucher du soleil
    document.getElementById('pluie').innerText = donnes.precip + " mm";         //On change le contenu de l'elemet HTML d'ID 'pluie' et on y met la hauteur de pluie tombée


}

function afficherTemp(temp) {
    document.getElementById('temperature').innerText = Math.round(temp) + "°";             //On change le contenu de l'elemet HTML d'ID 'temperature' et on y met la temperature en °C
}

function afficherImageTemp(infos){
    var ciel = infos.weather.code;
 var emile =document.getElementById('ciel');
 switch(ciel){
     case 200:
     //Tonere & soleil
     case 201:
     //Tonere & soleil
     case 202:
         //Tonere & soleil
         if (infos.pod == "d") {
             emile.setAttribute('src', 'img/partly_day_storm.png');
         }
         else {
             emile.setAttribute('src', 'img/night_storm.png');
         }
         break;
     case 230:
     //Tonere
     case 231:
     //Tonere
     case 232:
     //Tonere
     case 233:
         //Tonere
         if (infos.pod=="d"){
            emile.setAttribute('src','img/thnderstorm.png');
         }
         else{
             emile.setAttribute('src', 'img/night_storm.png');
         }
         break;
     case 300:
     //Pluie

     case 301:
     //Pluie
     case 302:
     //Pluie
     case 500:
     //Pluie
     case 501:
     //Pluie
     case 502:
     //Pluie
     case 511:
     //Pluie
     case 520:
     //Pluie
     case 521:
     //Pluie
     case 322:
         //Pluie
     case 900:
         //Pluie
         emile.setAttribute('src','img/rainy.png');
         break;
     case 600:
     //Neige
     case 602:
     //Neige
     case 610:
     //Neige
     case 611:
     //Neige
     case 612:
     //Neige
     case 613:
     //Neige
     case 621:
     //Neige
     case 622:
     //Neige
     case 623:
         //Neige
         emile.setAttribute('src','img/snowy.png');
         break;
     case 700:
     //Brouillard
     case 711:
     //Brouillard
     case 721:
     //Brouillard
     case 741:
     //Brouillard
     case 751:
         //Brouillard
         emile.setAttribute('src', 'img/slight_touch_happyday.png');
         break;
     case 800:
         //Soleil
         emile.setAttribute('src', 'img/sun.png');
         break;
     case 803:
         //Soleil avec nuages devant
         emile.setAttribute('src', 'img/partly_cloudy.png');
         break;
     case 803:
         //Nuages
     case 804:
         //Nuages
         emile.setAttribute('src', 'img/cloudy.png');
         break;
    default:
        //Cas normalement impossible
         emile.setAttribute('src', 'img/cloudy.png');
        break;
  
 }

    
}