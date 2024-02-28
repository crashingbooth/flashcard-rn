import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { faStar as borderStar } from '@fortawesome/free-regular-svg-icons/faStar'
import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'

interface CardStarButtonProps {
    isStarred?: boolean
}

const CardStarButton: React.FC<CardStarButtonProps> = ({isStarred}) => {
    const [displayStar, setDisplayStar] = useState(isStarred)

    const handlePress = () => {
        setDisplayStar(!displayStar)
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <FontAwesomeIcon size={24} icon={displayStar ?faStar : borderStar}/>
        </TouchableWithoutFeedback>
    )
}

export default CardStarButton