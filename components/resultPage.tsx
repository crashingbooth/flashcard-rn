import React from 'react';
import {
    FlatList,

  } from 'react-native';
import { DeckContext, DeckContextType } from '../context/deckContext';
import { ResultCard } from './resultCard';

interface ResultPageProps {
}

const ResultPage: React.FunctionComponent<ResultPageProps> = (props) => {
    const {loadNewDeck, deckTitle,  toggleFlip, isFlipped, cards, currentCardIndex} = React.useContext(DeckContext) as DeckContextType

  return (
    <FlatList
    data={cards}
    renderItem={ ({item}) => <ResultCard card={item}/>}
    keyExtractor={item => `${item.id}`}
    />
  )
};

export default ResultPage;
