var img1 = "./img/headerW.png"
var img2 = "./img/headerD.png"
var allLektions;
var temp;

loadDashboard();

// Function to Switch between Dark and White Mode
function changeMode() {
    // Swap Main Colors
    let temp = getComputedStyle(document.documentElement).getPropertyValue('--color1');
    document.documentElement.style.setProperty('--color1', getComputedStyle(document.documentElement).getPropertyValue('--color2'));
    document.documentElement.style.setProperty('--color2', temp);

    // Swap Shadows
    temp = getComputedStyle(document.documentElement).getPropertyValue('--lightShadow');
    document.documentElement.style.setProperty('--lightShadow', getComputedStyle(document.documentElement).getPropertyValue('--darkShadow'));
    document.documentElement.style.setProperty('--darkShadow', temp);

    // Swap Box Colors 1
    temp = getComputedStyle(document.documentElement).getPropertyValue('--darkBox1');
    document.documentElement.style.setProperty('--darkBox1', getComputedStyle(document.documentElement).getPropertyValue('--lightBox1'));
    document.documentElement.style.setProperty('--lightBox1', temp);

    // Swap Box Colors 2
    temp = getComputedStyle(document.documentElement).getPropertyValue('--darkBox2');
    document.documentElement.style.setProperty('--darkBox2', getComputedStyle(document.documentElement).getPropertyValue('--lightBox2'));
    document.documentElement.style.setProperty('--lightBox2', temp)

    temp = img1;
    img1 = img2;
    img2 = temp;

    document.getElementById('header').innerHTML = `<div><img src="${img1}"></div>`;
}

// load Dashboard
function loadDashboard() {
    let nav = `<a onclick="loadDashboard()" id="header"><div><img src="${img1}"></div></a>
                <a onclick="loadDashboard()"><div><i id="active" class="fa-solid fa-house"></i></div></a>
                <a onclick="addLektion()"><div><i class="fa-solid fa-plus"></i></div></a>
                <a onclick="searchLektion()"><div><i class="fa-solid fa-magnifying-glass"></i></div></a>
                <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;

    temp = "";
    temp += `<div id="previewField">`

    for(let i = 0; i < allLektions.list.length; i++){
        temp += `<div class="preview" onclick="loadLektion(${i})"><h1>${allLektions.list[i].name}</h1><p>${allLektions.list[i].content.length} Begriffe</p></div>`
    }
    temp += `<div class="preview" id="previewAdd" onclick="addLektion()"><i class="fa-solid fa-plus"></i></div>`
    temp += `</div>`

    document.getElementById('content').innerHTML = temp;
}

// Load Add Lektion
function addLektion() {
    nav = `<a onclick="loadDashboard()" id="header"><div><img src="${img1}"></div></a>
                <a onclick="loadDashboard()"><div><i class="fa-solid fa-house"></i></div></a>
                <a onclick="addLektion()"><div><i id="active" class="fa-solid fa-plus"></i></div></a>
                <a onclick="searchLektion()"><div><i class="fa-solid fa-magnifying-glass"></i></div></a>
                <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;

    temp = `<div id="addLektion"><h1>Neue Lektion erstellen</h1>`
    temp += `<form><br><input class="input" id="lektionName" type="text" placeholder="Gib einen Titel ein wie 'Englisch - Kapitel 1: Welcome Back'"></form>`
    temp += `<div id='autoGenerate' onclick="loadAutoGenerate()">Auto Generate Table</div>`

    temp += "<table><tr><th>Begriff</th><th>Defintion</th></tr>"
    temp += `<tr><td class="begriff"><input class="begriffV" onclick="this.select()"></td><td class="definition"><input class="definitionV" onclick="this.select()"></td></tr>`
    temp += `<tr><td colspan="2" id="lastRow" onclick="addRow()"><i class="fa-solid fa-plus"></td></tr>`
    temp += "</table>";
    temp += "<div id='confirm' onclick='saveLektion()'>Save</div>"

    document.getElementById('content').innerHTML = temp;
}

// Load Search Lektion
function searchLektion() {
    let nav = `<a onclick="loadDashboard()" id="header"><div><img src="${img1}"></div></a>
                <a onclick="loadDashboard()"><div><i class="fa-solid fa-house"></i></div></a>
                <a onclick="addLektion()"><div><i class="fa-solid fa-plus"></i></div></a>
                <a onclick="searchLektion()"><div><i id="active" class="fa-solid fa-magnifying-glass"></i></div></a>
                <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;

    temp = ""

    document.getElementById('content').innerHTML = temp;
}

// Load Lektion Menu
function loadLektion(count) {
    let nav = `<a onclick="loadDashboard()" id="header"><div><img src="${img1}"></div></a>
                  <a onclick="loadDashboard()"><div><i class="fa-solid fa-house"></i></div></a>
                  <a onclick="addLektion()"><div><i class="fa-solid fa-plus"></i></div></a>
                  <a onclick="searchLektion()"><div><i class="fa-solid fa-magnifying-glass"></i></div></a>
                  <a onclick="changeMode()"><div id="switch"><i class="fa-solid fa-toggle-on"></i></div></a>`
    document.getElementById('nav').innerHTML = nav;

    let lektionName = allLektions.list[count].name;
    let lektionContent = allLektions.list[count].content;
    
    temp = ""
    temp += `<div id='lektionOverview'><h2>${lektionName}</h2><div><p onclick='loadKarteikarten()'>Karteikarten</p><p onclick='loadLernen()'>Lernen</p><p onclick='loadAntworten(${count})'>Antworten</p></div>`
    temp += "<table id='tableLektion'><tr><th>Begriff</th><th id='englisch' onclick='autoEnglisch()'>Definition</th></tr>"
    for (let i = 0; i < lektionContent.length; i++) {
        temp += `<tr><td class="begriff">${lektionContent[i][0]}</td><td class="definition">${lektionContent[i][1]}</td></tr>`
    }
    temp += "</table></div>"
    content = allLektions.list[count].content
    currentCard = content[collumn][row]
    document.getElementById('content').innerHTML = temp;
}