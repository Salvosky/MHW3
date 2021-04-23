const apikey="fd2cb6c336df135336f58bf02e9b0a92a8ebde3e";

function callVacanze(){
    const ricerca=document.querySelector("#ricercaNormale");
    ricerca.removeEventListener("click", callVacanze);
    const year=2021;
    fetch("https://calendarific.com/api/v2/holidays"+"?api_key="+apikey+
    "&country=IT&year="+year)
    .then(onResponse)
    .then(onJson);
}

function callVacanzeConData(){
    const ricerca=document.querySelector("#ricercaNormale");
    ricerca.addEventListener("click", callVacanze);
    const year=document.querySelector("div.researches input").value;
    if(year && year>=1970 && year<=2049){
        fetch("https://calendarific.com/api/v2/holidays"+"?api_key="+apikey+
            "&country=IT&year="+year)
            .then(onResponse)
            .then(onJson);
    }
}

function onResponse(response){
    //console.log(response);
    if(response.ok){
        return response.json();
    }
}

function onJson(json){
    //console.log(json);
    const results=document.querySelector("#vacanze div.results");
    results.parentNode.classList.remove("hidden");
    results.innerHTML="";
    const holidays=json.response.holidays;
    const h2=document.createElement("h2");
    h2.textContent+="Risultati: ";
    results.appendChild(h2);
    for(const holiday of holidays){
        if(holiday.type[0]==="National holiday"){
            const h1=document.createElement("h1");
            h1.textContent+=holiday.name+" "+holiday.date.iso;
            results.appendChild(h1);
        }
    }
}

const ricerca=document.querySelector("#ricercaNormale");
ricerca.addEventListener("click", callVacanze);
const ricerca2=document.querySelector("#ricercaConData");
ricerca2.addEventListener("click", callVacanzeConData);