/////// Init Program ////////////////////////////////////////////////////////
//Import Data
import ChampionsList from "./Assets/Champions.json" assert {type: 'json'};
//Div Refs
var ChampionsListDiv = document.getElementById("Champions");
var WinnerDiv = document.getElementById("WinChempion");
var AttribDiv = document.getElementById("ChampionsAttrib");
//Global Varibles
var GameIsFinishedOrChecking = false;
var AnimationDuration = 300;
var TryCount = 0;
//Get Winner
var WinnerChempionID = Math.floor(Math.random() * Object.keys(Champions).length);

///////// Render ChempionList and Add OnClick Event //////////////////////////
for(var ID = 0; ID < Object.keys(ChampionsList).length; ID++){
    ChampionsListDiv.innerHTML += 
    `<div id="Chempion${ID}">
    <img src="Assets/Champions/${ChampionsList[ID].Icon}">
    </div>`;

    setTimeout(AddEventClick, 100, ID);
}
function AddEventClick(ID){
    document.querySelector(`#Chempion${ID}`).addEventListener('click', CheckIfChempionIsWinnerChempion);
    document.querySelector(`#Chempion${ID}`).myParam = ID;
}

///////// Check Chempion /////////////////////////////////////////////////////
async function CheckIfChempionIsWinnerChempion(ElementPointer){
    var ID = ElementPointer.currentTarget.myParam;
    var CurrentChempion = document.getElementById(`Chempion${ID}`);

    if(CurrentChempion.className == "ChempionUsed" || GameIsFinishedOrChecking) return 0;
    GameIsFinishedOrChecking = true
    TryCount++;
    
    CompareAttribs(ID);
    await delay(AnimationDuration * 5);

    if(WinnerChempionID == ID)
    {
        WinnerDiv.innerHTML = `Congrats, You guessed at ${TryCount} time. That was ${ChampionsList[ID].Name} <3</br>
        <img src="Assets/Champions/${ChampionsList[ID].Icon}">`;
        return 0;
    }
    else
    {
        GameIsFinishedOrChecking = false;
        CurrentChempion.className = "ChempionUsed";
        return 0;
    }
}
async function CompareAttribs(ID){
    //Add Chempion to Attrib List
    var Row = AttribDiv.getElementsByTagName('tbody')[0].insertRow(0);

    //Fill Chempions Info Data
    var Icon = Row.insertCell(0);
    var Gender = Row.insertCell(1)
    var Role = Row.insertCell(2);
    var Rarity = Row.insertCell(3);
    var Release = Row.insertCell(4);
    var Family = Row.insertCell(5);
    Icon.innerHTML = `<img class="TableIcon" src="Assets/Champions/${ChampionsList[ID].Icon}">`;
    Gender.innerHTML = ChampionsList[ID].Gender
    Role.innerHTML = ChampionsList[ID].Role
    Rarity.innerHTML = ChampionsList[ID].Rarity
    Release.innerHTML = ChampionsList[ID].ReleaseYear
    Family.innerHTML = ChampionsList[ID].Family

    //Set Colors and Clasess for Compared Values
    await delay(AnimationDuration);
    if(ChampionsList[ID].Gender == ChampionsList[WinnerChempionID].Gender) Gender.className = "Correct";
    else  Gender.className = "InCorrect";
    await delay(AnimationDuration);
    if(ChampionsList[ID].Role == ChampionsList[WinnerChempionID].Role) Role.className = "Correct";
    else  Role.className = "InCorrect";
    await delay(AnimationDuration);
    if(ChampionsList[ID].Rarity == ChampionsList[WinnerChempionID].Rarity) Rarity.className = "Correct";
    else  Rarity.className = "InCorrect";
    await delay(AnimationDuration);
    if(ChampionsList[ID].ReleaseYear == ChampionsList[WinnerChempionID].ReleaseYear) Release.className = "Correct";
    else  Release.className = "InCorrect";
    await delay(AnimationDuration);
    if(ChampionsList[ID].Family == ChampionsList[WinnerChempionID].Family) Family.className = "Correct";
    else  Family.className = "InCorrect";
}

//No Game Functions
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
function AtrribSetSize(){
    var WinChampionsize = document.getElementById("WinChempion").clientHeight;
    var ChampionsSize = document.getElementById("Champions").clientHeight;
    var Height = window.innerHeight - (WinChampionsize + ChampionsSize) - 30;
    if(document.getElementById("Attrib").clientHeight >= Height)document.getElementById("Attrib").style.height = `${Height}px`;
}

setInterval(AtrribSetSize, 100);