import { StyleSheet, Text, View } from 'react-native';
import { CardModel, LearningStatus } from '../models/cardModel';
import CardStarButton from './cardStarButton';

type ResultCardProps = {
    card: CardModel
    index: number
}

export const ResultCard:React.FC<ResultCardProps> = ({card, index}) => {

    const statusDisplay = () => {
        if (card.learningStatus === LearningStatus.unknown) {
            return ""
        } else {
            return `status: ${card.learningStatus}`
        }
        
    }

    return (
        <View style={styles.mainContainer}>
            <CardStarButton allowsToggle={false} isStarred={card.isStarred}/>
            <View style={styles.contentWrapper}>
                <Text>Term: {card.term}</Text>
                <Text>Definition: {card.definition}</Text>
            </View>
            <Text style={styles.statusWrapper}
             >{statusDisplay()}</Text>
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
        width: '30%'
    },

    statusWrapper: {
        width: '10%'
    }

});