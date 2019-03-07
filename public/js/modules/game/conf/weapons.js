module.exports = {
	ROCK: 'rock',
	PAPER: 'paper',
	SCISSORS: 'scissors',
	FLAG: 'flag',
    
	RandomWeapon: () => {
		const num = Math.floor(Math.random() * 3);
		switch (num) {
		case 0:
			return 'rock';
		case 1:
			return 'paper';
		case 2:
			return 'scissors';
		default:
			break;
		}
	}
};