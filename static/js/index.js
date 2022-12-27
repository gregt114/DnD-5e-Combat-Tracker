
// Returns character object with given data
function make_character(name, AC, initiative, curHp, maxHp, conditions, notes) {
    return {
        "name": name,               // string
        "curHP": curHp,             // number
        "maxHP": maxHp,             // number
        "AC": AC,                   // number
        "initiative": initiative,   // number
        "conditions": conditions,   // {key1: bool, key2: bool, ...}
        "notes": notes              // string
    }
}

// Returns card HTML for a given Character object
function generate_card(character) {
    return `<div class="card">
        <input class="name-input" type="text" placeholder="Name" value="${character.name}">
        <label class="AC">AC: <input class="AC-input" type="number" value="${character.AC}"></label>
        <label class="initiative">Initiative: <input class="initiative-input" type="number" value="${character.initiative}"></label>
        <i class="fa-solid fa-trash-can"></i>
        <label class="curHP">
            HP: <input class="curHP-input" type="number" value="${character.curHP}"> / <input class="maxHP-input" type="number" value="${character.maxHP}">
        </label>
        <div class="heal-damage">
            <button>Heal / Damage</button> <input type="number">
        </div>
        <div class="conditions">
            <i class="fa-solid fa-eye-slash blinded"></i>
            <i class="fa fa-heart charmed"></i>
            <i class="fa-solid fa-skull dead"></i>
            <i class="fa-solid fa-ear-deaf deafened"></i>
            <i class="fa-solid fa-triangle-exclamation frightened"></i>
            <i class="fa-solid fa-crosshairs hunters-mark"></i>
            <i class="fa-solid fa-wand-sparkles hexed"></i>
            <i class="fa-solid fa-hand grappled"></i>
            <i class="fa-solid fa-ban incapacitated"></i>
            <i class="fa-solid fa-ghost invisible"></i>
            <i class="fa-solid fa-bolt paralyzed"></i>
            <i class="fa-regular fa-snowflake petrified"></i>
            <i class="fa-solid fa-flask poisoned"></i>
            <i class="fa-solid fa-lock restrained"></i>
            <i class="fa-solid fa-person-falling-burst stunned"></i>
            <i class="fa-solid fa-bed"></i>
        </div>
        <label class="notes">Notes: <input class="notes-input" type="text" value="${character.notes}"></label>
    </div>`
}

// Returns card HTML for an empty card
function generate_empty_card() {
    return generate_card(make_character("", 0, 0, 0, 0, {}, ""));
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

// Load data for the given side(left or right) from a JSON file
function load_side(side) {

    // Determine which side to get file from
    let file_input = (side === "left") ? document.getElementById("party-load") : document.getElementById("enemy-load");

    // Create file object and reader
    let file = file_input.files[0];
    let reader = new FileReader();

    // Add listener on reader, pass file to reader
    reader.addEventListener("load", function () {
        let characters = JSON.parse(this.result);
        // For each character, add card to the appropriate side
        characters.forEach(c => {
            $("#" + side).append(generate_card(c));
        });
    });

    // Fire event
    reader.readAsText(file);
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
$(document).ready(function () {
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

    $("#party-load").change(() => {
        load_side("left");
    });

    $("#enemy-load").change(() => {
        load_side("right");
    });


    // Creates event handlers dynamically using event delegation
    // Can't do it normal way since icons haven't been created yet
    // TODO: find better solution
    $(document).on("click", ".conditions i", function () {
        $(this).toggleClass("icon-selected");
    });

    // Need to do same thing as above but for trash icon
    $(document).on("click", ".fa-trash", function () {
        $(this).parent().remove();
    });
});
// -----------------------------------------------------
