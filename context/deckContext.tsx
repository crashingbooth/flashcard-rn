
import React, { useState } from 'react';
import { Direction } from '../models/Types';
import {CardModel, DeckModel, LearningStatus, sampleCards, setLearningStatus, toggleIsStarred} from '../models/cardModel' 

export type DeckContextType = {
    cards: CardModel[]
    currentCard: () => CardModel
    toggleFlip: () => void
    didToggleIsStarred: () => void
    didChangeCardLearningStatus: (learningStatus: LearningStatus) => void
    loadNewDeck: (deckModel: DeckModel) => void
    currentCardIndex: number
    deckTitle: string
    isFlipped: boolean
    changeCardIndex: (direction: Direction) => void
}

export const DeckContext = React.createContext<DeckContextType | null>(null);

export const DeckProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [cards, setCards] = useState<CardModel[]>(sampleCards)
    const [deckTitle, setDecktitle] = useState<string>("")
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false); // TODO: use Side enum

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const currentCard = (): CardModel => {
        return cards[currentCardIndex]
    }

    const didToggleIsStarred = () => {
        setCards(toggleIsStarred(currentCardIndex, cards))
    }

    const didChangeCardLearningStatus = (newStatus: LearningStatus) => {
        setCards(setLearningStatus(currentCardIndex, newStatus, cards))
    }

    const loadNewDeck = (deckModel: DeckModel) => {
        setDecktitle(deckModel.deckName)
        setCards(deckModel.cards)
    }

    const changeCardIndex = (direction: Direction) => {
        const newIndex = currentCardIndex + ((direction === Direction.next) ? 1 : -1)
        if (newIndex >= 0 && newIndex <= cards.length - 1) {
            setCurrentCardIndex(newIndex)
        }
    }

    return (
        <DeckContext.Provider value={{currentCard, cards, toggleFlip, didToggleIsStarred, didChangeCardLearningStatus, loadNewDeck, currentCardIndex, deckTitle, isFlipped, changeCardIndex}}>
            {children}
        </DeckContext.Provider>
    )
}

