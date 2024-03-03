

export enum LearningStatus {
    know = "KNOW",
    stillLearning = "LEARNING",
    unknown = "UNKNOWN"
}

export interface CardModel {
    term: string
    definition: string
    id: number
    deck_id: number
    isStarred?: boolean 
    learningStatus: LearningStatus
}

export interface DeckModel {
    deckName: string,
    cards: CardModel[]
}

export enum Side {
    term,
    definition
}

export const sampleCards: CardModel[] = [
    {term: 'le paquet',
    definition: 'package',
    id: 0,
    deck_id: 0,
    learningStatus: LearningStatus.unknown},
    {term: "s'allonger",
    definition: 'to lie down',
    id: 1,
    deck_id: 0,
    learningStatus: LearningStatus.unknown},
    {term: "faire un retour",
    definition: 'to give feedback',
    id: 2,
    deck_id: 0,
    learningStatus: LearningStatus.unknown},

]

export const toggleIsStarred = (index: number, cards: CardModel[]):CardModel[]  => {
    let resultCards = [...cards]
    const isStarredAtIndex: boolean = cards[index].isStarred ?? false
    resultCards[index].isStarred = !isStarredAtIndex
    return resultCards
}

export const setLearningStatus = (index: number, newStatus: LearningStatus, cards: CardModel[]) => {
    let resultCards = [...cards]
    resultCards[index].learningStatus = newStatus
    return resultCards
}
