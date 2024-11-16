 // Define Pokémon with multiple moves and types
 const pokemon1 = {
    name: 'Charmander',
    type: 'Fire',
    hp: 100,
    moves: [
        { name: 'Scratch', power: 10, type: 'Normal' },
        { name: 'Fire Blast', power: 30, type: 'Fire' }
    ]
};

const pokemon2 = {
    name: 'Squirtle',
    type: 'Water',
    hp: 100,
    moves: [
        { name: 'Tackle', power: 10, type: 'Normal' },
        { name: 'Water Gun', power: 20, type: 'Water' }
    ]
};

// DOM elements
const hp1Element = document.getElementById('hp1');
const hp2Element = document.getElementById('hp2');
const logElement = document.getElementById('log');
const attack1Buttons = document.querySelectorAll('#move1_1, #move1_2');
const attack2Buttons = document.querySelectorAll('#move2_1, #move2_2');
const resetBtn = document.getElementById('resetBtn');

// Define type advantages (simplified)
const typeAdvantages = {
    'Fire': 'Water',
    'Water': 'Fire',
    'Normal': 'Normal'
};

// Log battle events
function log(message) {
    const logMessage = document.createElement('p');
    logMessage.textContent = message;
    logElement.appendChild(logMessage);
}

// Function to calculate damage with type advantage
function calculateDamage(move, defender) {
    let damage = Math.floor(Math.random() * move.power) + 1;

    // Type advantage: if the move type is strong against the defender type, increase damage
    if (move.type === 'Fire' && defender.type === 'Water') {
        damage = Math.floor(damage * 0.5); // Fire is weak against Water
    } else if (move.type === 'Water' && defender.type === 'Fire') {
        damage = Math.floor(damage * 1.5); // Water is strong against Fire
    }

    return damage;
}

// Handle attack with a move
function attack(attacker, defender, moveIndex) {
    const move = attacker.moves[moveIndex];
    const damage = calculateDamage(move, defender);
    defender.hp -= damage;
    log(`${attacker.name} used ${move.name}! It dealt ${damage} damage to ${defender.name}.`);

    // Update HP on the screen
    if (defender === pokemon1) {
        hp1Element.textContent = `HP: ${pokemon1.hp}`;
    } else {
        hp2Element.textContent = `HP: ${pokemon2.hp}`;
    }

    // Check for winner
    if (pokemon1.hp <= 0) {
        log(`${pokemon2.name} wins!`);
        disableButtons();
    } else if (pokemon2.hp <= 0) {
        log(`${pokemon1.name} wins!`);
        disableButtons();
    }
}

// Disable attack buttons after battle ends
function disableButtons() {
    attack1Buttons.forEach(button => button.disabled = true);
    attack2Buttons.forEach(button => button.disabled = true);
}

// AI move (random move selection for player 2)
function aiMove() {
    const randomMoveIndex = Math.floor(Math.random() * pokemon2.moves.length);
    attack(pokemon2, pokemon1, randomMoveIndex);
}

// Player move selection
function playerMove(moveIndex) {
    attack(pokemon1, pokemon2, moveIndex);
    // After Player 1 attacks, it's the AI's turn
    if (pokemon2.hp > 0) {
        setTimeout(aiMove, 1000); // Delay AI move by 1 second
    }
}

// Event listeners for move buttons
document.getElementById('move1_1').addEventListener('click', () => {
    playerMove(0); // Player 1 uses Scratch
});

document.getElementById('move1_2').addEventListener('click', () => {
    playerMove(1); // Player 1 uses Fire Blast
});

document.getElementById('move2_1').addEventListener('click', () => {
    attack(pokemon2, pokemon1, 0); // Squirtle uses Tackle
});

document.getElementById('move2_2').addEventListener('click', () => {
    attack(pokemon2, pokemon1, 1); // Squirtle uses Water Gun
});

// Reset the battle
resetBtn.addEventListener('click', () => {
    pokemon1.hp = 100;
    pokemon2.hp = 100;
    hp1Element.textContent = `HP: ${pokemon1.hp}`;
    hp2Element.textContent = `HP: ${pokemon2.hp}`;
    logElement.innerHTML = '';
    attack1Buttons.forEach(button => button.disabled = false);
    attack2Buttons.forEach(button => button.disabled = false);
});