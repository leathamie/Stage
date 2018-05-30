var nbActors = 0; //description.length;

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
                    // ajout au visuel
                    addFormActors(actor);
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

function addFormActors(actor) {
    var p = document.createElement("p");
    p.append(actor);

    var presentButton = makeRadioButton("actor" + 1, 1, "present", "responseButton");
    p.appendChild(presentButton);

    var absentButton = makeRadioButton("actor" + 2, 0, "absent", "responseButton");
    p.appendChild(absentButton);
    actorDiv.appendChild(p);
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


getAndSetActors(1);

