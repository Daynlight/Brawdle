//Import and Varibles
import Chempions from "./Assets/Chempions.json" assert {type: 'json'};
var ChempionsTable = document.getElementById("Chempions");
var WinDiv = document.getElementById("WinChempion");
var AttribDiv = document.getElementById("ChempionsAttrib");
var ChempionsCount = Object.keys(Chempions).length;
var Winned = false;
var WinnerChempion = Math.floor(Math.random() * ChempionsCount);
var AnimationTime = 300;
var Try = 0;

//Create Table Chempions
for(var id = 0; id < ChempionsCount; id++){
    ChempionsTable.innerHTML += 
    `<div id="Chempion${id}">
    <img src="Assets/Chempions/${Chempions[id].Icon}">
    </div>`;

    setTimeout(AddEventClick, 100, id);
}

function AddEventClick(id){
    document.querySelector(`#Chempion${id}`).addEventListener('click', CheckChempion);
    document.querySelector(`#Chempion${id}`).myParam = id;
}

//Check Chempion
async function CheckChempion(id){
    Try++;
    var ID = id.currentTarget.myParam;
    var CurrentChempion = document.getElementById(`Chempion${ID}`);

    if(CurrentChempion.className == "ChempionUsed" || Winned) return 0;

    CheckAttrib(ID);

    await delay(AnimationTime * 5);

    if(WinnerChempion == ID)
    {
        Winned = true;
        WinDiv.innerHTML = `Congrats, Yoy guessed at ${Try} time. That was ${Chempions[ID].Name} <3</br>
        <img src="Assets/Chempions/${Chempions[ID].Icon}">`;
        return 0;
    }
    else
    {
        CurrentChempion.className = "ChempionUsed";
        return 0;
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

async function CheckAttrib(ID){
    //Add Chempion
    var Row = AttribDiv.insertRow(1);
    Row.insertCell(0).innerHTML = `<img class="TableIcon" src="Assets/Chempions/${Chempions[ID].Icon}">`;
    var Gender = Row.insertCell(1)
    var Role = Row.insertCell(2);
    var Rarity = Row.insertCell(3);
    var Release = Row.insertCell(4);
    var Family = Row.insertCell(5);

    Gender.innerHTML = Chempions[ID].Gender
    Role.innerHTML = Chempions[ID].Role
    Rarity.innerHTML = Chempions[ID].Rarity
    Release.innerHTML = Chempions[ID].ReleaseYear
    Family.innerHTML = Chempions[ID].Family

    //Set Colors
    await delay(AnimationTime);
    if(Chempions[ID].Gender == Chempions[WinnerChempion].Gender) Gender.className = "Correct";
    else  Gender.className = "InCorrect";
    await delay(AnimationTime);
    if(Chempions[ID].Role == Chempions[WinnerChempion].Role) Role.className = "Correct";
    else  Role.className = "InCorrect";
    await delay(AnimationTime);
    if(Chempions[ID].Rarity == Chempions[WinnerChempion].Rarity) Rarity.className = "Correct";
    else  Rarity.className = "InCorrect";
    await delay(AnimationTime);
    if(Chempions[ID].ReleaseYear == Chempions[WinnerChempion].ReleaseYear) Release.className = "Correct";
    else  Release.className = "InCorrect";
    await delay(AnimationTime);
    if(Chempions[ID].Family == Chempions[WinnerChempion].Family) Family.className = "Correct";
    else  Family.className = "InCorrect";

}

function AtrribFillSize(){
    var WinChempionSize = document.getElementById("WinChempion").clientHeight;
    var ChempionsSize = document.getElementById("Chempions").clientHeight;
    var Height = window.innerHeight - (WinChempionSize + ChempionsSize) - 100;
    document.getElementById("Attrib").style.height = `${Height}px`;
}

setInterval(AtrribFillSize, 100);