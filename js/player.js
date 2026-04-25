class Player {
    constructor(fName, lName, age) {
        this.fName = fName;
        this.lName = lName;
        this.age = age;

        this.maxHP = 100;
        this.hp = 100;

        this.weapon = null;

        this.level = 1;
        this.xp = 0;
        this.gold = 0;
    }

    fullName() {
        return `${this.fName} ${this.lName}`;
    }

    resetHP() {
        this.hp = this.maxHP;
    }

    gainXP(amount) {
        this.xp += amount;

        if (this.xp >= 100) {
            this.level++;
            this.xp = 0;
            this.maxHP += 20;
            this.hp = this.maxHP;
            log(`⬆ Level Up! Now Level ${this.level}`);
        }
    }

    gainGold(amount) {
        this.gold += amount;
    }
}

class Weapon {
    constructor(name, damage, cost) {
        this.name = name;
        this.damage = damage;
        this.cost = cost;
        this.level = 1;
        this.button = null;
    }

    getDamage() {
        return Math.random() < 0.2 ? this.damage * 2 : this.damage;
    }

    upgrade() {
        this.level++;
        this.damage += 3;
        this.updateUI();
    }

    updateUI() {
        if (this.button) {
            this.button.innerText =
                `${this.name} L${this.level} DMG ${this.damage}`;
        }
    }
}

// ---------------- DATA ----------------
const weapons = [
    new Weapon("Sword", 10, 10),
    new Weapon("Lance", 12, 15),
    new Weapon("Bow", 8, 8),
    new Weapon("Shield", 2, 5)
];

let player;
let enemy;

// ---------------- UI ----------------
const output = document.getElementById("output");
const startBtn = document.getElementById("startFightBtn");

// ---------------- ENEMY ----------------
function createEnemy() {
    return {
        name: "Goblin",
        hp: 60 + Math.random() * 40,
        damage: 5 + Math.random() * 5,
        reward: 20
    };
}

// ---------------- PLAYER ----------------
document.getElementById("createPlayerBtn").onclick = () => {
    player = new Player(
        fName.value,
        lName.value,
        age.value
    );

    renderWeapons();
    renderShop();

    log("Player Created!");
};

// ---------------- WEAPONS ----------------
function renderWeapons() {
    const container = document.getElementById("weaponContainer");
    container.innerHTML = "";

    weapons.forEach(w => {
        const btn = document.createElement("button");

        btn.innerText = `${w.name} DMG ${w.damage}`;
        w.button = btn;

        btn.onclick = () => {
            player.weapon = w;
            startBtn.disabled = false;
            log(`Equipped ${w.name}`);
        };

        container.appendChild(btn);
    });
}

// ---------------- SHOP ----------------
function renderShop() {
    const shop = document.getElementById("shop");
    shop.innerHTML = "";

    weapons.forEach(w => {
        const btn = document.createElement("button");
        btn.innerText = `Upgrade ${w.name} (${w.cost}g)`;

        btn.onclick = () => {
            if (player.gold >= w.cost) {
                player.gold -= w.cost;
                w.upgrade();
                log(`${w.name} upgraded!`);
            } else {
                log("Not enough gold!");
            }
        };

        shop.appendChild(btn);
    });
}

// ---------------- BATTLE ----------------
startBtn.onclick = () => {
    if (!player.weapon) return;

    enemy = createEnemy();
    player.resetHP();

    updateBars();

    log(`Enemy ${enemy.name} appears!`);

    while (enemy.hp > 0 && player.hp > 0) {

        let dmg = player.weapon.getDamage();
        enemy.hp -= dmg;

        log(`You hit ${dmg}`);

        if (enemy.hp <= 0) break;

        player.hp -= enemy.damage;
        log(`Enemy hits ${enemy.damage}`);

        updateBars();
    }

    if (player.hp > 0) {
        log("Victory!");
        player.gainXP(50);
        player.gainGold(enemy.reward);
    } else {
        log("You died...");
    }

    updateBars();
};

// ---------------- UI ----------------
function updateBars() {
    document.getElementById("playerHP").innerText =
        `${player.hp} / ${player.maxHP}`;

    document.getElementById("enemyHP").innerText =
        enemy ? enemy.hp.toFixed(0) : "-";
}

function log(text) {
    output.innerText += text + "\n";
}

// ---------------- SAVE / LOAD ----------------
function saveGame() {
    localStorage.setItem("rpgSave", JSON.stringify(player));
    log("Game saved!");
}

function loadGame() {
    let data = JSON.parse(localStorage.getItem("rpgSave"));
    if (!data) return;

    player = Object.assign(new Player(), data);
    log("Game loaded!");
}