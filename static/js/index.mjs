
import { Character } from "./character.js"

function generate_card() {
    let text = `
    <div class="w3-card-4">
        <header class="w3-container w3-blue">
            <h1>Header ------------------</h1>
        </header>
        <div class="w3-container">
            <p>content</p>
        </div>
        <footer class="w3-container w3-blue">
            <h5>footer</h5>
        </footer>
    </div>`
    return text;
}

let left = document.getElementsByClassName('left')[0];
let test = document.getElementById('test');
let btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    test.innerHTML = generate_card();
    left.appendChild(test);
});

