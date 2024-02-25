
import { Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useState } from 'react';
import { CardModel, DeckModel, Side, sampleCards } from '../models/cardModel';
import { CardNavigationButton, Direction}from './cardNavigation';
import { fetchData } from '../resources/endpoints';
import { textStyles } from '../styles/textStyles';
import FlipCard from 'react-native-flip-card';
import { CardSide } from './cardSide';

const QuizPage = () => {
    const [cards, setCards] = useState<CardModel[]>(sampleCards)
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [deckTitle, setDecktitle] = useState<string>("")
    const [isFlipped, setIsFlipped] = useState(false); 
    const [animationEnabled, setAnimationEnabled] = useState(true);
  
    const toggleFlip = () => { 
        setIsFlipped(!isFlipped); 
    }; 

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
            if (isFlipped) {
                // setAnimationEnabled(false)
                toggleFlip()
            }
            setCurrentCardIndex(newIndex)
        }
    }

    return (
        <View style={styles.pageContainer}>
            <Text style={textStyles.headerText}>{deckTitle}</Text>
            <Text>{`${currentCardIndex + 1} / ${cards.length} `}</Text>
            <View style={styles.cardLevelContainer}>
                <CardNavigationButton direction={Direction.previous} changeCardIndex={changeCardIndex}/>
                <TouchableWithoutFeedback onPress={toggleFlip}>
                    <FlipCard flip={isFlipped} clickable={false} flipHorizontal={animationEnabled} flipVertical={false} onFlipEnd={() =>setAnimationEnabled(true)} >
                        <CardSide card={currentCard()} side={Side.term}/>
                        <CardSide card={currentCard()} side={Side.definition}/>
                    </FlipCard>
                </TouchableWithoutFeedback>
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