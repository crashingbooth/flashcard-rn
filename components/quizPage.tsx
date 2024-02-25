
import { Button, StyleSheet, Text, View } from 'react-native';
import Card from './card';
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from 'react';
import { CardModel, DeckModel, Side, sampleCards } from '../models/cardModel';
import { CardNavigationButton, Direction}from './cardNavigation';
import { fetchData } from '../resources/endpoints';
import { textStyles } from '../styles/textStyles';

const QuizPage = () => {
    const [cards, setCards] = useState<CardModel[]>(sampleCards)
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [side, setSide] = useState<Side>(Side.term)
    const [deckTitle, setDecktitle] = useState<string>("")

    const currentCard = (): CardModel => {
        return cards[currentCardIndex]
    }

    const fetchDataAndHandleData = async () => {
        try {
          const result = await fetchData();
          if ('message' in result) {
            console.error('Error:', result.message);
          } else {
            setCards(result.cards)
            setDecktitle(result.deckName)
          }
        } catch (error) {
            console.log((error as any).message)
        }
      };


    useEffect(() => {
        lockOrientation();
        fetchDataAndHandleData()
        
    }, [])
    const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
        );
    }

    const changeCardIndex = (direction: Direction) => {
        const newIndex = currentCardIndex + ((direction === Direction.next) ? 1 : -1)
        if (newIndex >= 0 && newIndex <= cards.length - 1) {
            setCurrentCardIndex(newIndex)
            setSide(Side.term)
        }
    }

    const changeSide = () => {
        setSide(side + 1 % 2)
    }

    return (
        <View style={styles.pageContainer}>
            <Text style={textStyles.headerText}>{deckTitle}</Text>
            <Text>{`${currentCardIndex + 1} / ${cards.length} `}</Text>
            <View style={styles.cardLevelContainer}>
                <CardNavigationButton direction={Direction.previous} changeCardIndex={changeCardIndex}/>
                <Card term={currentCard().term} definition={currentCard().definition} currentSide={side} changeSide={changeSide} />
                <CardNavigationButton direction={Direction.next} changeCardIndex={changeCardIndex}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        padding: 10,
        alignItems: 'center'
    },

    cardLevelContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
    }
})


export default QuizPage