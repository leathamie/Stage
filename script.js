//var nbActors = 0; //description.length;
//var actors = new Array();

var exp = {
    date: new Date().getTime(),
    idTurker: 0,
    videoPath: "",
    nbActors: 0,
    actors: new Array(),
    idPresent: new Array()


}

console.log("le script est chargé");

// have to be remove, it will be useless 
function getVideoByid(idVideo) {
    //Récupération des donnés Json
    $.getJSON('video.json', function (data) {
        $.each(data.videos, function (i) {
            if (i === idVideo) {
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
                video.src = this.path;
                // Récupération des noms et description des acteurs
                $.each(this.actors, function (j) {
                    var actor = chooseNameOrDescription(this.name, this.description);
                    exp.actors[exp.nbActors] = actor;
                    //incrémentation du nombre d'acteurs
                    exp.nbActors++;
                    // ajout au visuel
                    addFormActors(actor, exp.nbActors);

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

/*
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
*/

function addFormActors(actor, i) {
    var p = document.createElement("p");
    p.append(actor);
    p.id = "pCheckboxBloc" + i;
    var presentButton = createCheckBox("actor" + i, " present", "responseButton", i - 1);
    p.appendChild(presentButton);

    actorDiv.appendChild(p);
}


function createCheckBox(name, text, classname, value) {
    var label = document.createElement("label");
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.name = name;
    checkBox.class = classname;
    checkBox.value = value;

    label.appendChild(checkBox);
    label.appendChild(document.createTextNode(text));

    return label;
}



/// remove
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


function setChecked() {
    var recup = document.forms[0];
    var i;
    for (i = 0; i < recup.length; i++) {
        if (recup[i].checked) {
            console.log("value inside the recup[i].checked " + recup[i].value);
            exp.idPresent.push(recup[i].value);
        }
    }
}

// Function to concatenate key and values of dictionary into string
function dict_to_str(dict) {
    var str = '';
    for (var key in dict) {
        str = str.concat(dict[key], ';');
    }
    return str + "\n";

    
}

function saveData() {
    setChecked();
    var expStr = dict_to_str(exp);
    console.log("contenu de expStr : " + expStr);
    console.log("avant l'appel");

    $.post("save_results.php", {
        "results": dict_to_str(exp)
    });

}


$(document).ready(function () {
    console.log($('.responseButton'));
    console.log($('.responseButton').checked);
});


//do nothing have to be remove, just in case I need a template for a event
$(document).ready(function () {
    $(document).on("click", "#actorDiv", function () {
        //if( )
        //alert("hi");
    });
});

getAndSetActors(1);
