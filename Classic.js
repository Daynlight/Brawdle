//Import and Varibles
import Champions from "./Assets/Champions.json" assert {type: 'json'};
var ChampionsTable = document.getElementById("Champions");
var WinDiv = document.getElementById("WinChempion");
var AttribDiv = document.getElementById("ChampionsAttrib");
var ChampionsCount = Object.keys(Champions).length;
var Winned = false;
var WinnerChempion = Math.floor(Math.random() * ChampionsCount);
var AnimationTime = 300;
var Try = 0;

//Create Table Champions
for(var id = 0; id < ChampionsCount; id++){
    ChampionsTable.innerHTML += 
    `<div id="Chempion${id}">
    <img src="Assets/Champions/${Champions[id].Icon}">
    </div>`;

    setTimeout(AddEventClick, 100, id);
}

function AddEventClick(id){
    document.querySelector(`#Chempion${id}`).addEventListener('click', CheckChempion);
    document.querySelector(`#Chempion${id}`).myParam = id;
}

//Check Chempion
async function CheckChempion(id){
    var ID = id.currentTarget.myParam;
    var CurrentChempion = document.getElementById(`Chempion${ID}`);

    if(CurrentChempion.className == "ChempionUsed" || Winned) return 0;
    Winned = true
    Try++;
    
    CheckAttrib(ID);

    await delay(AnimationTime * 5);

    if(WinnerChempion == ID)
    {
        Winned = true;
        WinDiv.innerHTML = `Congrats, You guessed at ${Try} time. That was ${Champions[ID].Name} <3</br>
        <img src="Assets/Champions/${Champions[ID].Icon}">`;
        return 0;
    }
    else
    {
        Winned = false;
        CurrentChempion.className = "ChempionUsed";
        return 0;
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

async function CheckAttrib(ID){
    //Add Chempion
    var Ref = AttribDiv.getElementsByTagName('tbody')[0];
    var Row = Ref.insertRow(0);
    Row.insertCell(0).innerHTML = `<img class="TableIcon" src="Assets/Champions/${Champions[ID].Icon}">`;
    var Gender = Row.insertCell(1)
    var Role = Row.insertCell(2);
    var Rarity = Row.insertCell(3);
    var Release = Row.insertCell(4);
    var Family = Row.insertCell(5);

    Gender.innerHTML = Champions[ID].Gender
    Role.innerHTML = Champions[ID].Role
    Rarity.innerHTML = Champions[ID].Rarity
    Release.innerHTML = Champions[ID].ReleaseYear
    Family.innerHTML = Champions[ID].Family

    //Set Colors
    await delay(AnimationTime);
    if(Champions[ID].Gender == Champions[WinnerChempion].Gender) Gender.className = "Correct";
    else  Gender.className = "InCorrect";
    await delay(AnimationTime);
    if(Champions[ID].Role == Champions[WinnerChempion].Role) Role.className = "Correct";
    else  Role.className = "InCorrect";
    await delay(AnimationTime);
    if(Champions[ID].Rarity == Champions[WinnerChempion].Rarity) Rarity.className = "Correct";
    else  Rarity.className = "InCorrect";
    await delay(AnimationTime);
    if(Champions[ID].ReleaseYear == Champions[WinnerChempion].ReleaseYear) Release.className = "Correct";
    else  Release.className = "InCorrect";
    await delay(AnimationTime);
    if(Champions[ID].Family == Champions[WinnerChempion].Family) Family.className = "Correct";
    else  Family.className = "InCorrect";

}

function AtrribFillSize(){
    var WinChampionsize = document.getElementById("WinChempion").clientHeight;
    var ChampionsSize = document.getElementById("Champions").clientHeight;
    var Height = window.innerHeight - (WinChampionsize + ChampionsSize) - 30;
    if(document.getElementById("Attrib").clientHeight >= Height)document.getElementById("Attrib").style.height = `${Height}px`;
}

setInterval(AtrribFillSize, 1);