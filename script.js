var nbActors = 0; //description.length;
var actors = new Array();

console.log("le script est chargé");
// have to be remove, it will be useless 
function getVideoByid(idVideo) {
    //Récupération des donnés Json
    $.getJSON('video.json', function (data) {
        $.each(data.videos, function (i) {
            if (i === idVideo) {
                console.log("on est dedans! ");
                p = this.path;
                console.log("le path que l'on vient de récupérer avec classe : " + p);
                // Récupération des noms et description des acteurs
                $.each(this.actors, function (j) {
                    description[j] = this.description;
                    names[j] = this.name;
                });
                console.log("contenu de [0] de description : " + description[0]);
                console.log("contenu de [1] de description : " + description[1]);
            }
        });
        nbActors = names.length;
        return true;
    });

}

function getAndSetActors(idVideo) {
    $.getJSON('video.json', function (data) {
        $.each(data.videos, function (i) {
            if (i === idVideo) {
                console.log("on est dedans! ");
                video.src = this.path;
                // Récupération des noms et description des acteurs
                $.each(this.actors, function (j) {
                    var actor = chooseNameOrDescription(this.name, this.description);
                    actors[nbActors] = actor;
                    //incrémentation du nombre d'acteurs
                    nbActors++;
                    // ajout au visuel
                    addFormActors(actor, nbActors);

                });
            }
        });
        //nbActors = names.length;
    });
}


function chooseNameOrDescription(name, description) {
    if (description !== "") {
        return description;
    } else {
        return name;
    }
}

function addFormActors(actor, i) {
    var p = document.createElement("p");
    p.append(actor);
    p.id = "pRadioBloc" + i;

    var presentButton = makeRadioButton("actor" + i, 1, "present", "responseButton");
    p.appendChild(presentButton);

    var absentButton = makeRadioButton("actor" + i, 0, "absent", "responseButton");
    p.appendChild(absentButton);
    actorDiv.appendChild(p);
    document.getElementsByName("actor"+i)[0].required = true;
}



function makeRadioButton(name, value, text, classname) {
    var label = document.createElement("label");
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = name;
    radio.value = value;
    radio.class = classname;

    label.appendChild(radio);
    label.appendChild(document.createTextNode(text));
    //label.appendChild(document.createElement("br"));

    return label;
}


//do nothing have to be remove, just in case I need a template for a event
$(document).ready(function () {
    $(document).on("click", "#submitTask1", function () {
        //if( )
        //alert("hi");
    });
});


getAndSetActors(1);
