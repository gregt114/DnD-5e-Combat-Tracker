
export class Character {
    constructor(name, AC, initiative, curHP, maxHP, conditions, notes, id) {
        this.name = name;               // string
        this.AC = AC;                   // number
        this.initiative = initiative;   // number
        this.curHP = curHP;             // number
        this.maxHP = maxHP;             // number
        this.conditions = conditions;   // {key1: bool, key2: bool, ...}
        this.notes = notes;             // string
    }

    // Returns card HTML for a given Character object
    generate_card_html() {
        // Makes highlighting the correct conditions cleaner below
        let activate = (condition) => this.conditions[condition] ? "icon-selected" : "";
        // Adds dark overlay on dead characters
        let dampen = "dead" in this.conditions ? (this.conditions.dead ? "dampen" : "") : "";

        return `<div class="w3-card ${dampen}">
            <div class="w3-container card-header">
                <input class="name-input w3-half" type="text" placeholder="Name" value="${this.name}">
                <div class="w3-container w3-half stats">
                    <label class="AC">AC: <input class="AC-input" type="text" value="${this.AC}"></label>
                    <label class="initiative w3-right">Initiative: <input class="initiative-input" type="text" value="${this.initiative}"></label>
                    <br>
                    <label class="HP">
                        HP: <input class="curHP-input" type="text" value="${this.curHP}"> / <input class="maxHP-input" type="text" value="${this.maxHP}">
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
                <button class="w3-button w3-center set-turn">Set Turn</button>
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
            <textarea class="notes-input w3-left" placeholder="Enter notes here...">${this.notes}</textarea>
            </div>
        
        </div>`
    }

    // Returns JSON representation of character
    to_JSON() {
        return {
            "name": this.name,
            "AC": this.AC,
            "initiative": this.initiative,
            "curHP": this.curHP,
            "maxHP": this.maxHP,
            "conditions": this.conditions,
            "notes": this.notes,
        }
    }

    // Load character data from JSON object
    from_JSON(json) {
        this.name = json.name
        this.AC = json.AC;
        this.initiative = json.initiative;
        this.curHP = json.curHP;
        this.maxHP = json.maxHP;
        this.conditions = json.conditions;
        this.notes = json.notes;
    }

}

