import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DeckContext, DeckContextType } from '../context/deckContext';
import { Direction } from '../models/Types';


interface CardNavigationButtonProp {
    direction: Direction,
}

export const CardNavigationButton: React.FC<CardNavigationButtonProp> = ({ direction }) => {
    const {changeCardIndex} = React.useContext(DeckContext) as DeckContextType
    const handlePress = () => {
        changeCardIndex(direction)
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.buttonText}>{direction === Direction.previous ? "<" : ">"}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    buttonText: {
        fontSize: 36,
        fontWeight: 'bold',
        margin: 10
    }
})

