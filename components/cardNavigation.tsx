import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export enum Direction {
    next,
    previous
}

interface CardNavigationButtonProp {
    direction: Direction,
    changeCardIndex: (direction: Direction) => void
}

export const CardNavigationButton: React.FC<CardNavigationButtonProp> = ({direction, changeCardIndex}) => {
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

