
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
    // Makes highlighting the correct conditions cleaner below
    let activate = (condition) => character["conditions"][condition] ? "icon-selected" : "";

    return `<div class="w3-card">
        <div class="w3-container card-header">
            <input class="name-input w3-half" type="text" placeholder="Name" value="${character.name}">
            <div class="w3-container w3-half stats">
                <label class="AC">AC: <input class="AC-input" type="text" value="${character.AC}"></label>
                <label class="initiative w3-right">Initiative: <input class="initiative-input" type="text" value="${character.initiative}"></label>
                <br>
                <label class="HP">
                    HP: <input class="curHP-input" type="text" value="${character.curHP}"> / <input class="maxHP-input" type="text" value="${character.maxHP}">
                </label>
                <div class="heal-damage w3-center">
                    <button class="w3-button heal">Heal</button>
                    <input class="heal-damage-input" type="text">
                    <button class="w3-button damage">Damage</button>
                </div>
            </div>
        </div>

        <div class="w3-container card-footer">
            <button class="w3-button w3-left show-conditions">Conditions</button>
            <button class="w3-button w3-center show-notes">Notes</button>
            <button class="w3-button w3-right delete">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        <div>

        <div class="w3-container w3-center w3-hide conditions">
            <i class="fa-solid fa-eye-slash blinded w3-tooltip ${activate('blinded')}"><span class="w3-text w3-tag">Blinded</span></i>
            <i class="fa-solid fa-ear-deaf deafened w3-tooltip ${activate('deafened')}"><span class="w3-text w3-tag">Deafened</span></i>
            <i class="fa-solid fa-hand grappled w3-tooltip ${activate('grappled')}"><span class="w3-text w3-tag">Grappled</span></i>
            <i class="fa-solid fa-lock restrained w3-tooltip ${activate('restrained')}"><span class="w3-text w3-tag">Restrained</span></i>
            <i class="fa fa-heart charmed w3-tooltip ${activate('charmed')}"><span class="w3-text w3-tag">Charmed</span></i>
            <i class="fa-solid fa-triangle-exclamation frightened w3-tooltip ${activate('frightened')}"><span class="w3-text w3-tag">Frightened</span></i>
            <i class="fa-solid fa-crosshairs hunters-mark w3-tooltip ${activate('hunters-mark')}"><span class="w3-text w3-tag">Hunter's Mark</span></i>
            <i class="fa-solid fa-wand-sparkles hexed w3-tooltip ${activate('hexed')}"><span class="w3-text w3-tag">Hex</span></i>
            <i class="fa-solid fa-ghost invisible w3-tooltip ${activate('invisible')}"><span class="w3-text w3-tag">Invisible</span></i>
            <i class="fa-solid fa-flask poisoned w3-tooltip ${activate('poisoned')}"><span class="w3-text w3-tag">Poisoned</span></i>
            <i class="fa-solid fa-bolt paralyzed w3-tooltip ${activate('paralyzed')}"><span class="w3-text w3-tag">Paralyzed</span></i>
            <i class="fa-regular fa-snowflake petrified w3-tooltip ${activate('petrified')}"><span class="w3-text w3-tag">Petrified</span></i>
            <i class="fa-solid fa-person-falling-burst stunned w3-tooltip ${activate('stunned')}"><span class="w3-text w3-tag">Stunned</span></i>
            <i class="fa-solid fa-ban incapacitated w3-tooltip ${activate('incapacitated')}"><span class="w3-text w3-tag">Incapacitated</span></i>
            <i class="fa-solid fa-bed unconscious w3-tooltip ${activate('unconscious')}"><span class="w3-text w3-tag">Unconscious</span></i>
            <i class="fa-solid fa-skull dead w3-tooltip ${activate('dead')}"><span class="w3-text w3-tag">Dead</span></i>
        </div>

        <div class="w3-container w3-hide notes">
           <textarea class="notes-input w3-left" placeholder="Enter notes here...">${character.notes}</textarea>
        </div>
    
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

// Parses card to determine which conditions it has
// card: JQuery object representing the card
function get_conditions(card) {
    let conditions = {};
    $(".conditions i").each(function () {

        // Get list of class names and if icon is activated
        let class_names = $(this).attr("class").split(" ");
        let activated = class_names.includes("icon-selected");

        // Filter out FontAwesome classes to get condition name
        let condition_name = class_names.filter(name => {
            return !(name === "fa") && !name.includes("fa-");
        })[0]; // there should only be 1 non-FontAwesome class

        conditions[condition_name] = activated;
    });

    return conditions;
}


// Returns list of Character objects on the given side(left or right)
function get_characters(side) {
    let cards = $("#" + side).find(".w3-card");
    let characters = [];

    cards.each(function () {
        let card = $(this);
        let name = card.find(".name-input").val();
        let AC = Number(card.find(".AC-input").val());
        let initiative = Number(card.find(".initiative-input").val());
        let curHP = Number(card.find(".curHP-input").val());
        let maxHP = Number(card.find(".maxHP-input").val());
        let conditions = get_conditions(card);
        let notes = card.find(".notes-input").val();

        let c = make_character(name, AC, initiative, curHP, maxHP, conditions, notes);
        characters.push(c);
    });
    return characters;

}

// Button is jquery reference to button that was clicked
// operation is either heal or damage
function heal_damage(button, operation) {
    // Get value to change HP by
    let val = $(button).parent().find(".heal-damage-input").val();
    if (val === "") { return; } // no value, do nothing
    val = Number(val); // string -> number

    // Find current HP input and its value
    let hp_input = $(button).parent().parent().find(".curHP-input");
    let curHP = Number(hp_input.val());

    if (operation === "heal") {
        let maxHP = Number(button.parent().parent().find(".maxHP-input").val());
        hp_input.val(Math.min(curHP + val, maxHP));
    }
    else if (operation === "damage") {
        hp_input.val(curHP - val);
    }
    else {
        console.log("ERROR: unknown heal-damage operation");
    }
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
        $("#left div.card-area").append(generate_empty_card());
    });

    $("#enemy-add").click(() => {
        $("#right div.card-area").append(generate_empty_card());
    });

    $("#party-load").change(() => { // TODO - fix load to use new div elements - create add function
        load_side("left");
    });

    $("#enemy-load").change(() => {
        load_side("right");
    });


    // Creates event handlers dynamically using event delegation
    // Can't do it normal way since icons haven't been created yet
    $(document).on("click", ".conditions i", function () {
        $(this).toggleClass("icon-selected");
    });

    $(document).on("click", ".delete", function () {
        $(this).parent().parent().remove();
    });

    $(document).on("click", ".heal", function () {
        heal_damage($(this), "heal");
    });

    $(document).on("click", ".damage", function () {
        heal_damage($(this), "damage");
    });

    $(document).on("click", "button.show-notes", function () {
        let notes = $(this).parent().find(".notes");
        notes.toggleClass("w3-hide");
        notes.toggleClass("w3-show");
    });

    $(document).on("click", "button.show-conditions", function () {
        let notes = $(this).parent().find(".conditions");
        notes.toggleClass("w3-hide");
        notes.toggleClass("w3-show");
    });
});
// -----------------------------------------------------
