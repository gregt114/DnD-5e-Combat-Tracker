
// Returns character object with given data
function make_character(name, AC, initiative, curHp, maxHp, conditions, notes) {
    return {
        "name": name,               // string
        "curHp": curHp,             // number
        "maxHp": maxHp,             // number
        "AC": AC,                   // number
        "initiative": initiative,   // number
        "conditions": conditions,   // {key1: bool, key2: bool, ...}
        "notes": notes              // string
    }
}

// Returns HTML for an empty card element
function generate_empty_card() {
    return `<div class="card">
        <input class="name-input" type="text" placeholder="Name">
        <label class="AC">AC: <input class="AC-input" type="number"></label>
        <label class="initiative">Initiative: <input class="initiative-input" type="number"></label>
        <label class="curHP">
            HP: <input class="curHP-input" type="number"> / <input class="maxHP-input" type="number">
        </label>
        <div class="heal-damage">
            <button>Heal / Damage</button> <input type="number">
        </div>
        <div class="conditions">Conditions:</div>
        <label class="notes">Notes: <input class="notes-input" type="text"></label>
    </div>`
}


// Save data for the given side(left or right) to a JSON file
function save_side(side) {

    let filename = (side === "left") ? "party.json" : "enemy.json";

    // Get data in JSON format
    let characters = get_characters(side);
    let data = JSON.stringify(characters);

    // Create download link
    let dataString = "data:text/json;charset=utf-8," + encodeURIComponent(data);
    let a = document.createElement("a");
    a.setAttribute("href", dataString);
    a.setAttribute("download", filename);

    // Download file and remove download link
    a.click();
    a.remove();
}


// Returns list of Character objects on the given side(left or right)
// TODO: add conditions
function get_characters(side) {
    let cards = $("#" + side).find(".card");
    let characters = [];

    cards.each(function () {
        let card = $(this);
        let name = card.find(".name-input").val();
        let AC = Number(card.find(".AC-input").val());
        let initiative = Number(card.find(".initiative-input").val());
        let curHP = Number(card.find(".curHP-input").val());
        let maxHP = Number(card.find(".maxHP-input").val());
        let notes = card.find(".notes-input").val();

        let c = make_character(name, AC, initiative, curHP, maxHP, {}, notes);
        characters.push(c);
    });
    return characters;

}



// ------------------ Event Handlers ------------------
$("#party-save").click(() => {
    save_side("left");
});

$("#enemy-save").click(() => {
    save_side("right");
});

$("#party-add").click(() => {
    $("#left").append(generate_empty_card());
});

$("#enemy-add").click(() => {
    $("#right").append(generate_empty_card());
});
// -----------------------------------------------------


// FOR TESTING PURPOSES ONLY --- REMOVE LATER
$("#test").click(() => {
    get_characters("left").forEach(c => {
        let string = "<p>" + JSON.stringify(c) + "</p>";
        $("body").append(string);
    });
});