export default {
    ROCK: 'ROCK',
    PAPER: 'PAPER',
    SCISSORS: "SCISSORS",

    RandomWeapon: () => {
        const num = Math.floor(Math.random() * 3);
        switch (num) {
            case 1:
                return this.ROCK;
                break;
            case 2:
                return this.PAPER;
                break;
            case 3:
                return this.SCISSORS;
                break;
            default:
                break;
        }
    }
}