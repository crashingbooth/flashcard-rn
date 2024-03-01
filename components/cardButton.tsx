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

    const isSelected = (): boolean => {
        return learningStatusText !== cardLearningStatus
    }

    const getSelectedBackgroundStyle = () => {
        return {
            backgroundColor: learningStatusText === cardLearningStatus ? 'black' : 'rgba(0, 0, 0, 0)',
        }
    }

    const getSelectedTextStyle = () => {
        return {
            color: learningStatusText !== cardLearningStatus ? 'black' : '#C0C4E9',
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handleTap}>
            <View style={[styles.container, getSelectedBackgroundStyle()]}>
                <Text style={[styles.buttonText, getSelectedTextStyle()]}>{`${learningStatusText}`}</Text>
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
        fontWeight: 'bold',
        color: 'red'
    },

    buttonSelected: {
        backgroundColor: 'black'
    },

    buttonDefault: {
        backgroundColor: 'clear'
    }


})

export default CardButton;