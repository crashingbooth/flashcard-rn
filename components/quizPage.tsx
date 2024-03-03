
import { Button, StyleSheet, Text, Animated, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useRef, useState } from 'react';
import { CardModel, DeckModel, LearningStatus, Side, sampleCards, setLearningStatus, toggleIsStarred } from '../models/cardModel';
import { CardNavigationButton, Direction } from './cardNavigation';
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
    const slideAnim = useRef(new Animated.Value(-1000)).current;

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

    useEffect(() => {
        startAnimation()
      }, [slideAnim]);

      
    const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
        );
    }

    const changeCardIndex = (direction: Direction) => {
        const newIndex = currentCardIndex + ((direction === Direction.next) ? 1 : -1)
        if (newIndex >= 0 && newIndex <= cards.length - 1) {
            startAnimation()
            if (isFlipped) {
                setAnimationEnabled(false)
                toggleFlip()
            }
            setCurrentCardIndex(newIndex)
        }
    }

    const startAnimation = () => {
        slideAnim.setValue(-1000); // Reset the animated value
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      };
    
    return (
        <View style={styles.pageContainer}>
            <Text style={textStyles.headerText}>{deckTitle}</Text>
            <Text>{`${currentCardIndex + 1} / ${cards.length} `}</Text>
            <View style={styles.cardLevelContainer}>
                <CardNavigationButton direction={Direction.previous} changeCardIndex={changeCardIndex} />
                <Animated.View style={[ {transform: [{translateY: slideAnim }]}]}>
                    <TouchableWithoutFeedback onPress={toggleFlip}>
                        <FlipCard flip={isFlipped}
                            clickable={false}
                            flipHorizontal={animationEnabled}
                            flipVertical={false}
                            onFlipEnd={() => setAnimationEnabled(true)} 
                            >
                            <CardSide card={currentCard()} side={Side.term} didToggleIsStarred={didToggleIsStarred} didChangeCardLearningStatus={didChangeCardLearningStatus} changeCardIndex={changeCardIndex}/>
                            <CardSide card={currentCard()} side={Side.definition} didToggleIsStarred={didToggleIsStarred} didChangeCardLearningStatus={didChangeCardLearningStatus} changeCardIndex={changeCardIndex}/>
                        </FlipCard>
                    </TouchableWithoutFeedback>
                </Animated.View>
                <CardNavigationButton direction={Direction.next} changeCardIndex={changeCardIndex} />
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
        height: 250 + 40,
    }
})


export default QuizPage