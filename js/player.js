class Player {
    #fName;
    #lName;
    #age;
    #weapon;

    constructor(fName, lName, age) {
        this.#fName = fName;
        this.#lName = lName;
        this.#age = age;
        this.#weapon = null;
    }

    get fName() {
        return this.#fName;
    }

    get lName() {
        return this.#lName;
    }

    get age() {
        return this.#age;
    }

    get weapon() {
        return this.#weapon;
    }

    setWeapon(weapon) {
        this.#weapon = weapon;
    }
}

class Weapon {
    constructor(name, damage) {
        this.name = name;
        this.damage = damage;
    }
}

const sword = new Weapon("Sword", 10);
const lance = new Weapon("Lance", 12);
const bow = new Weapon("Bow", 8);
const shield = new Weapon("Shield", 2);

const weapons = [sword, lance, bow, shield];

const player = new Player("Sebastian", "Smith", 20);

console.log("Choose your weapon:\n");

weapons.forEach((weapon, index) => {
    console.log(`${index + 1}. ${weapon.name} (damage: ${weapon.damage})`);
});

const choice = 2; // pretend user picked option 2 (Lance)

if (choice >= 1 && choice <= weapons.length) {
    player.setWeapon(weapons[choice - 1]);
    console.log(`\nYou selected: ${player.weapon.name}`);
} else {
    console.log("Invalid choice.");
}