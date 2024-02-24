import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardButton from './cardButton';
import { useState } from 'react';

interface cardProps {
    term: string,
    definition: string,
}

const Card: React.FC<cardProps> = ({ term, definition }) => {

    const [showTerm, setShowTerm] = useState(true)

    const handleTap = () => {
        setShowTerm(!showTerm)
    }

    const dynamicStyles = {
        mainContainer: {
            backgroundColor: showTerm ? '#C0C4E9' : '#DAF6CC'
        }
    }

    return (
        <TouchableOpacity onPress={handleTap}>
            <View style={[styles.mainContainer, dynamicStyles.mainContainer]}>
                <View style={styles.upperCardContainer}>
                    <View style={styles.topLineContainer}>
                        <Text style={styles.topLineText}>{showTerm ? 'Term' : 'Definition'}</Text>
                        <Text style={styles.topLineText}>*</Text>
                    </View>
                    <Text style={styles.vocabText}>{showTerm ? term : definition}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <CardButton text={'LEARNING'} />
                    <CardButton text={'KNOW'} />
                </View>
            </View>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'stretch',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 10,
        margin: 20,
        padding: 10,
        height: 250
    },

    upperCardContainer: {
        justifyContent: 'space-between',
    },

    topLineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    topLineText: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    vocabText: {
        fontSize: 24,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});


export default Card;