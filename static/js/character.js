
export class Character {
    constructor(name, curHp, maxHp, AC, initiative, conditions, details) {
        this.name = name;
        this.curHp = curHp;
        this.maxHp = maxHp;
        this.AC = AC;
        this.initiative = initiative;
        this.conditions = conditions;
        this.details = details;
    }

    toString() {
        return this.name;
    }
}
