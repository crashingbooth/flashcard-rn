import { Button, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { LearningStatus } from '../models/cardModel';

interface CardButtonProps {
    learningStatusText: LearningStatus
    cardLearningStatus: LearningStatus
    didChangeCardLearningStatus: (newStatus: LearningStatus) => void
}

const CardButton: React.FC<CardButtonProps> = ({ learningStatusText, didChangeCardLearningStatus, cardLearningStatus }) => {
    const handleTap = () => {
        didChangeCardLearningStatus(learningStatusText)
    }

    return (
        <TouchableWithoutFeedback onPress={handleTap}>
            <View style={styles.container}>
                <Text style={styles.buttonText}>{`${learningStatusText} ${cardLearningStatus === learningStatusText ? `***` : ``}`}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 20,
        width: '40%'
    },

    buttonText: {
        fontSize: 12,
        fontWeight: 'bold'
    }
})

export default CardButton;