const cards = document.querySelectorAll('.card_flexCard');
let current = 0;

function activateCard(index) {
    cards.forEach(card => card.classList.remove('active'));
    cards[index].classList.add('active');
}

setInterval(() => {
    current = (current + 1) % cards.length;
    activateCard(current);
}, 7000);

cards.forEach((card, i) => {
    card.addEventListener('click', () => {
        current = i;
        activateCard(current);
    });
});