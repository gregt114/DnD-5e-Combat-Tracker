import { LinkedList } from "./linked_list.mjs";
import { Character } from "./character.mjs"

// Global variables
let CUR_ID = 0;
let CHARACTERS = new LinkedList();
// ---------------

// Returns random integer in range [min, max]
function rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Returns empty character
function empty_character() {
    let c = new Character("", 0, 0, 0, 0, {}, "", CUR_ID);
    CUR_ID += 1;
    return c;
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
        let id = Number(card.id);

        let c = new Character(name, AC, initiative, curHP, maxHP, conditions, notes, id);
        characters.push(c);
    });
    return characters;
}

// Returns list of all character objects, sorted by initiative
function get_all_characters() {
    let characters = get_characters("left").concat(get_characters("right"));
    characters.sort((a, b) => b.initiative - a.initiative);
    return characters;
}

// Add card for character on given side (left or right)
function add_card(side, character) {
    // Add html to document
    let html = character.generate_card_html();
    let div = $(`#${side} div.card-area`); // select div element to add card to
    div.append(html);

    // Add reference to card to character object
    character.card = $("#" + character.id);

    // Add character to global list
    CHARACTERS.add(character);
}

// Save data for the given side(left or right) to a JSON file
function save_side(side) {

    let filename = (side === "left") ? "party.json" : "enemy.json";

    // Get data in JSON format
    let characters = get_characters(side).map(c => c.to_JSON());
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
        let data = JSON.parse(this.result);
        // For each character, add card to the appropriate side
        data.forEach(obj => {
            let character = new Character();
            character.from_JSON(obj);
            add_card(side, character);
        });
    });

    // Fire event
    reader.readAsText(file);
}

// Parses card to determine which conditions it has
// card: JQuery object representing the card
function get_conditions(card) {
    let conditions = {};
    card.find(".conditions i").each(function () {

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

// Sorts side(left or right) by initiative
function sort(side) {

    // Get characters on this side and sort them by decreasing initiative
    let characters = get_characters(side);
    characters.sort((a, b) => b.initiative - a.initiative);

    // Remove all cards on the side and put them back in right order
    let card_area = $("#" + side + " .card-area");
    card_area.empty();
    characters.forEach(c => {
        add_card(side, c);
    })
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
        add_card("left", empty_character());
    });

    $("#enemy-add").click(() => {
        add_card("right", empty_character());
    });

    $("#party-load").change(() => {
        load_side("left");
    });

    $("#enemy-load").change(() => {
        load_side("right");
    });

    $("#party-sort").click(function () {
        sort("left");
    });

    $("#enemy-sort").click(function () {
        sort("right");
    });

    // Auto-roll button for enemy initiatives
    $("#enemy-roll").click(() => {
        $("#right .w3-card").each(function () {
            let card = $(this);
            card.find(".initiative-input").val(rand_int(1, 20));
        });
    });


    // Creates event handlers dynamically using event delegation
    // Can't do it normal way since icons haven't been created yet
    $(document).on("click", ".conditions i", function () {
        $(this).toggleClass("icon-selected");
        // Add dark overlay when dead attribute is selected
        if ($(this).attr("class").includes("dead")) {
            $(this).closest(".w3-card").toggleClass("dampen");
        }
    });

    $(document).on("click", ".delete", function () {
        let card = $(this).parent().parent();
        CHARACTERS.remove(x => x.id === Number(card.id));
        card.remove();
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

    // FOR DEBUGGING
    $("#next-turn").click(() => {
        let cs = get_characters("left");
        console.log(cs);
        console.log(cs.map(x => x.to_JSON()));
    });
});
// -----------------------------------------------------
