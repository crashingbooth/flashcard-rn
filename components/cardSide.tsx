import { StyleSheet, Text, View } from 'react-native';
import { textStyles } from '../styles/textStyles';
import CardButton from './cardButton';
import { CardModel, LearningStatus, Side } from '../models/cardModel';
import React from 'react';
import CardStarButton from './cardStarButton';
import { Direction } from './cardNavigation';
import { DeckContext, DeckContextType } from '../context/deckContext';

interface CardSideProps {
    side: Side
    changeCardIndex: (direction: Direction) => void
}

export const CardSide: React.FC<CardSideProps> = ({ side, changeCardIndex }) => {
    const {currentCard} = React.useContext(DeckContext) as DeckContextType

    const dynamicStyles = {
        mainContainer: {
            backgroundColor: side == Side.term ? '#C0C4E9' : '#DAF6CC'
        }
    }
    
    return (
        <View style={[styles.mainContainer, dynamicStyles.mainContainer]}>
        <View style={styles.upperCardContainer}>
            <View style={styles.topLineContainer}>
                <Text style={textStyles.subHeaderText}>{side == Side.term ? 'Term' : 'Definition'}</Text>
                <CardStarButton />
            </View>
            <Text style={styles.vocabText}>{side == Side.term ? currentCard().term : currentCard().definition}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <CardButton  learningStatusText={LearningStatus.know} changeCardIndex={changeCardIndex} />
            <CardButton  learningStatusText={LearningStatus.stillLearning} changeCardIndex={changeCardIndex} />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'stretch',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 10,
        margin: 20,
        padding: 10,
        height: 250,
        width: 350
    },

    upperCardContainer: {
        justifyContent: 'space-between',
    },

    topLineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    vocabText: {
        fontSize: 24,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});