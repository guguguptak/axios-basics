export class AnimalResponse {
    constructor(
        readonly image: string,
        readonly fact: string,
    ) {
    }
}

export class Animal {
    constructor(
        readonly response: AnimalResponse,
        readonly name: string,
        public isCurrent: boolean,
    ) {
    }
}