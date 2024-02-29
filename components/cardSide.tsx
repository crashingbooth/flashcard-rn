import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { textStyles } from '../styles/textStyles';
import CardButton from './cardButton';
import { CardModel, LearningStatus, Side } from '../models/cardModel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { faStar as borderStar } from '@fortawesome/free-regular-svg-icons/faStar'
import React from 'react';
import CardStarButton from './cardStarButton';

interface CardSideProps {
    side: Side
    card: CardModel
    didToggleIsStarred: () => void
    didChangeCardLearningStatus: (newStatus: LearningStatus) => void
}

export const CardSide: React.FC<CardSideProps> = ({ side, card, didToggleIsStarred, didChangeCardLearningStatus }) => {


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
                <CardStarButton isStarred={card.isStarred} didToggleIsStarred={didToggleIsStarred}/>
            </View>
            <Text style={styles.vocabText}>{side == Side.term ? card.term : card.definition}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <CardButton cardLearningStatus={card.learningStatus} learningStatusText={LearningStatus.know} didChangeCardLearningStatus={didChangeCardLearningStatus} />
            <CardButton cardLearningStatus={card.learningStatus} learningStatusText={LearningStatus.stillSlearning} didChangeCardLearningStatus={didChangeCardLearningStatus} />
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