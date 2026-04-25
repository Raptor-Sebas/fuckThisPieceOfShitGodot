class Player {
    #fName;
    #lName;
    #age;
    #weapon;
    #hp;

    constructor(fName, lName, age) {
        this.#fName = fName;
        this.#lName = lName;
        this.#age = age;
        this.#weapon = null;
        this.#hp = 100;
    }

    get fullName() {
        return `${this.#fName} ${this.#lName}`;
    }

    get weapon() {
        return this.#weapon;
    }

    setWeapon(weapon) {
        this.#weapon = weapon;
    }

    get hp() {
        return this.#hp;
    }

    takeDamage(dmg) {
        this.#hp -= dmg;
    }
}

class Weapon {
    constructor(name, damage) {
        this.name = name;
        this.damage = damage;
        this.level = 1;
    }

    getDamage() {
        return this.damage;
    }

    upgrade() {
        this.level++;
        this.damage += 3; // upgrade boost
    }

    toString() {
        return `${this.name} (Lvl ${this.level}, DMG ${this.damage})`;
    }
}

// ----------------------------
// WEAPONS
// ----------------------------
const weapons = [
    new Weapon("Sword", 10),
    new Weapon("Lance", 12),
    new Weapon("Bow", 8),
    new Weapon("Shield", 2)
];

const enemy = {
    name: "Goblin",
    hp: 60,
    damage: 8
};

let player = null;

// ----------------------------
// UI
// ----------------------------
const output = document.getElementById("output");
const startBtn = document.getElementById("startFightBtn");

// ----------------------------
// CREATE PLAYER
// ----------------------------
document.getElementById("createPlayerBtn").addEventListener("click", () => {
    const fName = document.getElementById("fName").value;
    const lName = document.getElementById("lName").value;
    const age = document.getElementById("age").value;

    player = new Player(fName, lName, age);

    output.innerText = `Welcome ${player.fullName}! Choose your weapon.`;

    renderWeapons();
});

// ----------------------------
// WEAPON SELECTION
// ----------------------------
function renderWeapons() {
    const container = document.getElementById("weaponContainer");
    container.innerHTML = "";

    weapons.forEach((weapon) => {
        const btn = document.createElement("button");
        btn.innerText = weapon.toString();

        btn.addEventListener("click", () => {
            player.setWeapon(weapon);

            output.innerText =
                `${player.fullName} equipped ${weapon.name}!`;

            startBtn.disabled = false;
        });

        container.appendChild(btn);
    });
}

// ----------------------------
// BATTLE
// ----------------------------
startBtn.addEventListener("click", () => {
    startBattle();
});

function startBattle() {
    let enemyHp = enemy.hp;
    let playerHp = player.hp;

    output.innerText = "Battle started!\n\n";

    while (enemyHp > 0 && playerHp > 0) {
        enemyHp -= player.weapon.getDamage();
        output.innerText += `You hit ${enemy.name} for ${player.weapon.getDamage()} dmg. Enemy HP: ${enemyHp}\n`;

        if (enemyHp <= 0) break;

        playerHp -= enemy.damage;
        output.innerText += `${enemy.name} hits you for ${enemy.damage}. Your HP: ${playerHp}\n`;
    }

    if (playerHp > 0) {
        output.innerText += "\n🎉 You won!\n";

        // 🔥 upgrade option
        setTimeout(() => {
            offerUpgrade();
        }, 500);
    } else {
        output.innerText += "\n💀 You lost...";
    }
}

// ----------------------------
// UPGRADE SYSTEM
// ----------------------------
function offerUpgrade() {
    const choice = confirm("Upgrade your weapon? (+3 DMG)");

    if (choice) {
        player.weapon.upgrade();

        output.innerText += `\n⚔ Weapon upgraded! Now: ${player.weapon.toString()}`;
    } else {
        output.innerText += `\nYou kept your weapon as is.`;
    }
}