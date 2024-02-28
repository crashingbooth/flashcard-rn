import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { faStar as borderStar } from '@fortawesome/free-regular-svg-icons/faStar'
import React, { useState } from 'react'
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native'

interface CardStarButtonProps {
    isStarred?: boolean
    didToggleIsStarred: () => void
}

const CardStarButton: React.FC<CardStarButtonProps> = ({ isStarred, didToggleIsStarred }) => {
    const [displayStar, setDisplayStar] = useState(isStarred)

    const handlePress = () => {
        console.log(`tapped`);
        didToggleIsStarred()
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