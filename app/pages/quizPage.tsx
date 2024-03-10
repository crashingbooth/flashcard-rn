
import { Button, StyleSheet, Text, Animated, TouchableWithoutFeedback, View, TouchableOpacity, Pressable } from 'react-native';
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useRef, useState, useContext } from 'react';
import {  Side } from '../../models/cardModel';
import { CardNavigationButton } from '../../components/cardNavigation';
import { fetchData } from '../../resources/endpoints';
import { textStyles } from '../../styles/textStyles';
import FlipCard from 'react-native-flip-card';
import { CardSide } from '../../components/cardSide';
import { DeckContext, DeckContextType } from '../../context/deckContext';
import { Direction } from '../../models/Types';
import { ResultCard } from '../../components/resultCard';
import { Link } from 'expo-router';

const QuizPage = () => {
    const {loadNewDeck, deckTitle,  toggleFlip, isFlipped, cards, currentCardIndex} = React.useContext(DeckContext) as DeckContextType

    const [animationEnabled, setAnimationEnabled] = useState(true);
    const slideAnim = useRef(new Animated.Value(-1000)).current;

    const fetchDataAndHandleData = async () => {
        try {
            const result = await fetchData();
            if ('message' in result) {
                console.error('Error:', result.message);
            } else {
                loadNewDeck(result)
            }
        } catch (error) {
            console.log((error as any).message)
        }
    };


    useEffect(() => {
        lockOrientation();
        fetchDataAndHandleData()
        startAnimation()
    }, [])

    useEffect(() => {
        loadNewCard()
    },[currentCardIndex])

      
    const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
        );
    }

    const loadNewCard = () => {
        startAnimation()
        if (isFlipped) {
            setAnimationEnabled(false)
            toggleFlip()
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
            <View style={styles.headerLevelContainer}>
                <Text></Text>
                <Text style={textStyles.headerText}>{deckTitle}</Text>
                <Link href={'pages/resultPage'}>{`=>`}</Link>
            </View>
            <Text>{`${currentCardIndex + 1} / ${cards.length} `}</Text>
            <View style={styles.cardLevelContainer}>
                <CardNavigationButton direction={Direction.previous} />
                <Animated.View style={[ {transform: [{translateY: slideAnim }]}]}>
                    <TouchableWithoutFeedback onPress={toggleFlip}>
                        <FlipCard flip={isFlipped}
                            clickable={false}
                            flipHorizontal={animationEnabled}
                            flipVertical={false}
                            onFlipEnd={() => setAnimationEnabled(true)} 
                            >
                            <CardSide side={Side.term} />
                            <CardSide side={Side.definition} />
                        </FlipCard>
                    </TouchableWithoutFeedback>
                </Animated.View>
                <CardNavigationButton direction={Direction.next} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        padding: 10,
        alignItems: 'center'
    },

    headerLevelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'pink',
        width: '100%'

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