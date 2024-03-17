import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { faStar as borderStar } from '@fortawesome/free-regular-svg-icons/faStar'
import React, { useEffect, useState } from 'react'
import { TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native'
import { DeckContext, DeckContextType } from '../context/deckContext'

type CardStarButtonProps = {
    allowsToggle: boolean
    isStarred: boolean
}

const CardStarButton: React.FC<CardStarButtonProps> = ({ allowsToggle, isStarred }) => {
    const { didToggleIsStarred } = React.useContext(DeckContext) as DeckContextType
    
    const handlePress = () => {
        if (allowsToggle) {
            didToggleIsStarred()
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.mainContainer}>
                <FontAwesomeIcon size={24} icon={isStarred ? faStar : borderStar} />
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        padding: 2,
    }
});

export default CardStarButton