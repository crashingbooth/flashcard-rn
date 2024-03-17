import React from 'react';
import {
    FlatList,

  } from 'react-native';
import { DeckContext, DeckContextType, DeckProvider } from '../context/deckContext';
import { ResultCard } from '../components/resultCard';

interface ResultPageProps {
}

const ResultPage: React.FunctionComponent<ResultPageProps> = (props) => {
    const { cards } = React.useContext(DeckContext) as DeckContextType

  return (
    <DeckProvider>
      <FlatList
      data={cards}
      renderItem={ ({item, index}) => <ResultCard card={item} index={index}/>}
      keyExtractor={item => `${item.id}`}
      />
    </DeckProvider>
  )
};

export default ResultPage;
