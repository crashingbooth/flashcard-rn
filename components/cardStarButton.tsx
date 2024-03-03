import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { faStar as borderStar } from '@fortawesome/free-regular-svg-icons/faStar'
import React, { useState } from 'react'
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native'
import { DeckContext, DeckContextType } from '../context/deckContext'

const CardStarButton = () => {
    const { didToggleIsStarred, currentCard } = React.useContext(DeckContext) as DeckContextType
    
    const handlePress = () => {
        didToggleIsStarred()
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.mainContainer}>
                <FontAwesomeIcon size={24} icon={currentCard().isStarred ? faStar : borderStar} />
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