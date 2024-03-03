import { Button, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { LearningStatus } from '../models/cardModel';
import { Direction } from './cardNavigation';

interface CardButtonProps {
    learningStatusText: LearningStatus
    cardLearningStatus: LearningStatus
    didChangeCardLearningStatus: (newStatus: LearningStatus) => void
    changeCardIndex: (direction: Direction) => void
}

const CardButton: React.FC<CardButtonProps> = ({ learningStatusText, didChangeCardLearningStatus, cardLearningStatus, changeCardIndex}) => {


    const handleTap = () => {
        didChangeCardLearningStatus(learningStatusText)
        setTimeout(() => {changeCardIndex(Direction.next)}, 200)
     
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