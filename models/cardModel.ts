

export interface CardModel {
    term: string
    definition: string
    id: number
    deck_id: number
}

export enum Side {
    term,
    definition
}

export const sampleCards: CardModel[] = [
    {term: 'le paquet',
    definition: 'package',
    id: 0,
    deck_id: 0},
    {term: "s'allonger",
    definition: 'to lie down',
    id: 1,
    deck_id: 0},
    {term: "faire un retour",
    definition: 'to give feedback',
    id: 2,
    deck_id: 0},

]
