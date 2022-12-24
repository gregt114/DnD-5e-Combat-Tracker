

function make_character(name, curHp, maxHp, AC, initiative, conditions, details) {
    return {
        "name": name,               // string
        "curHp": curHp,             // number
        "maxHp": maxHp,             // number
        "AC": AC,                   // number
        "initiative": initiative,   // number
        "conditions": conditions,   // {key1: bool, key2: bool, ...}
        "details": details          // string
    }
}

// Returns HTML for an empty card element
function generate_empty_card() {
    return `<div class="card">
        <input class="name" type="text" placeholder="Name">
        <label class="AC">AC: <input type="number"></label>
        <label class="initiative">Initiative: <input type="number"></label>
        <label class="curHP">
            HP: <input type="number"> / <input type="number">
        </label>
        <div class="heal-damage">
            <button>Heal / Damage</button> <input type="number">
        </div>
        <div class="conditions">Conditions:</div>
        <label class="details">Details: <input type="text"></label>
    </div>`
}


$("#party-add").click(() => {
    $("#left").append(generate_empty_card());
});

$("#enemy-add").click(() => {
    $("#right").append(generate_empty_card());
});


function gather_stats() {
    let arr = [];
    $(".card").each(function () {
        let card = $(this);
        let name = card.find(".name").val();

        arr.push(name);
    });
    return arr;

}

// FOR TESTING PURPOSES ONLY --- REMOVE LATER
$("#test").click(() => {
    console.log(gather_stats());
});