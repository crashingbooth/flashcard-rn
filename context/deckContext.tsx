
import React, { useState } from 'react';
import {CardModel, DeckModel, LearningStatus, sampleCards, setLearningStatus, toggleIsStarred} from '../models/cardModel' 

export type DeckContextType = {
    cards: CardModel[]
    currentCard: () => CardModel
    toggleFlip: () => void
    didToggleIsStarred: () => void
    didChangeCardLearningStatus: (learningStatus: LearningStatus) => void
    loadNewDeck: (deckModel: DeckModel) => void
    currentCardIndex: number
    setCurrentCardIndex: (index: number) => void
    deckTitle: string
    isFlipped: boolean
}

export const DeckContext = React.createContext<DeckContextType | null>(null);

export const DeckProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [cards, setCards] = useState<CardModel[]>(sampleCards)
    const [deckTitle, setDecktitle] = useState<string>("")
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false);

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
        console.log(deckModel.cards);
        
        setCards(deckModel.cards)
    }

    return (
        <DeckContext.Provider value={{currentCard, cards, toggleFlip, didToggleIsStarred, didChangeCardLearningStatus, loadNewDeck, setCurrentCardIndex, currentCardIndex, deckTitle, isFlipped}}>
            {children}
        </DeckContext.Provider>
    )
}

