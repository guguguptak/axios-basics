export class PetResponse {
    constructor(
        readonly image: string,
        readonly fact: string,
    ) {
    }
}

export class Pet {
    constructor(
        readonly response: PetResponse,
        readonly name: string,
        public isCurrent: boolean,
    ) {
    }
}