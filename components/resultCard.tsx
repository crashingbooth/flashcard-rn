import { StyleSheet, Text, View } from 'react-native';
import { CardModel, LearningStatus } from '../models/cardModel';
import CardStarButton from './cardStarButton';

type ResultCardProps = {
    card: CardModel
}

export const ResultCard:React.FC<ResultCardProps> = ({card}) => {

    const statusDisplay = () => {
        if (card.learningStatus === LearningStatus.unknown) {
            return ""
        } else {
            return `status: ${card.learningStatus}`
        }
        
    }

    return (
        <View style={styles.mainContainer}>
            <CardStarButton allowsToggle={false}/>
            <View style={styles.contentWrapper}>
                <Text>Term: {card.term}</Text>
                <Text>Definition: {card.definition}</Text>
            </View>
            <Text>{statusDisplay()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        height: 80,
        width: '90%'
    },
    contentWrapper: {

    }
});