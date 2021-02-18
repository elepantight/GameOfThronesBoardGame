var charContainer = document.getElementById('char-container');

//List of 10 predefined characters
var characters = [
    {
        "id" : 148,
        "name" : 'Arya Stark',
        'img': '/images/arya_logo.svg'
    },
    {
        "id" : 210,
        "name" : 'Brandon Stark',
        'img': '/images/Bran_logo.svg'
    },
    {
        "id" : 13,
        "name" : 'Cersei Lannister',
        'img': '/images/Cersei_logo.svg'
    },
    {
        "id" : 20,
        "name" : 'Children of The Forest',
        'img': '/images/ChildrenOTF.svg'
    },
    {
        "id" : 27,
        "name" : 'Daenerys Targaryan',
        'img': '/images/Daenerys_logo.svg'
    },
    {
        "id" : 583,
        "name" : 'Jon Snow',
        'img': '/images/jon_snow_logo.svg'
    },
    {
        "id" : 38,
        "name" : 'Lady Melisandre',
        'img': '/images/melisandre_logo.svg'
    },
    {
        "id" : 39,
        "name" : 'Night King',
        'img': '/images/NightKing_logo.svg'
    },
    {
        "id" : 40,
        "name" : 'Ramsay Bolton',
        'img': '/images/Ramsey_logo.svg'
    },
    {
        "id" : 235,
        "name" : 'Cerenna Lannister',
        'img': '/images/khal_logo.svg'
    }
];
// Initialization of empty array where the selected objects will be pushed.
var selectedChar = [];
var localChar = [];

renderSelection();

//Rendering the view from the predefined list, with image, name and data id. Clicking on the image is calling the fetchAPI. 
function renderSelection() {
    characters.forEach(char => {
        let ele = document.createElement('div');
        ele.setAttribute('class', 'char');
        let charImg = document.createElement('img');
        charImg.setAttribute('src', char.img);
        ele.innerHTML = `<b>${char.name}</b><br />Select Character`;
        ele.addEventListener('click', function() {
            fetchAPI(char.id);
            getLocalChar(char);
            this.style.backgroundColor = 'black';
        });
        charContainer.appendChild(ele);
        ele.appendChild(charImg);
    });
}


// Fetch the charachter information by id from predefined list, then feeds and calls the function selectedChar.
function fetchAPI(id) {
        fetch(`https://anapioficeandfire.com/api/characters/${id}`)
        .then(response => response.json())
        .then(result => selectChar(result)); 
    };


//Retriving result from function fetchAPI and makes sure there is minimum and maximum two characters selected. Then redirects the user to the game page.
function selectChar(result) {
    console.log(result);
    selectedChar.push(result);
    if (selectedChar.length < 2) {
        return;
    }
    window.location.href = "game.html";
    localStorage.setItem('char', JSON.stringify(selectedChar));
}

function getLocalChar(char) {
    localChar.push(char);
    if (localChar.length < 2) {
        return;
    }
    localStorage.setItem('localChar', JSON.stringify(localChar));
}