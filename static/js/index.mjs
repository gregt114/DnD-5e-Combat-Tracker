
import { Character } from "./character.js"

// function generate_empty_card() {
//     return `<div class="card">
//         <input class="name" type="text" placeholder="Name">
//         <label>HP:<input class="curHP" type="text" placeholder="HP"></label>
//         <input class="maxHP" type="text" placeholder="Max HP">
//         <input class="AC" type="text" placeholder="AC">
//         <input class="initiative" type="text" placeholder="Initiative">
//         <div class="conditions">conditions</div>
//         <input class="details" type="text" placeholder="Details">
//     </div>`
// }

function generate_empty_card() {
    return `<div class="card">
        <input class="name" type="text" placeholder="Name">
        <label class="curHP">
            HP: <input type="number"> / 
            <input type="number">
        </label>
        <label class="AC">AC: <input type="number"></label>
        <label class="initiative">Initiative: <input type="number"></label>
        <div class="conditions">conditions</div>
        <label class="details">Details: <input type="text"></label>
    </div>`
}


$("#party-add").click(() => {
    $("#left").append(generate_empty_card());
});

$("#enemy-add").click(() => {
    $("#right").append(generate_empty_card());
});
