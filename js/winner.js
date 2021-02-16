document.addEventListener('DOMContentLoaded', retriveWinner);
var winnerText = document.querySelector('.winner-text');
var winnerImg = document.querySelector('.winner__img');

function retriveWinner() {
    let winner = JSON.parse(localStorage.getItem('Winner'));
    winnerText.innerHTML = `The winner is ${winner.name}`;
    winnerImg.innerHTML = `<img src="${winner.img}">`;
    winnerText.appendChild(winnerImg)
}