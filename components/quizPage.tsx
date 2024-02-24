
import { Button, StyleSheet, Text, View } from 'react-native';
import Card from './card';
import { useEffect } from 'react';

const QuizPage = () => {

    return (
        <View>
            <Text>Deck Title</Text>
            <Text>card#/total cards#</Text>
            <View style={styles.cardLevelContainer}>
                <Text>{"<"}</Text>
                <Card term='un droit' definition='a place' />
                <Text>{">"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardLevelContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})


export default QuizPage