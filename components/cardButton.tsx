import { Button, StyleSheet, Text, View } from 'react-native';

interface CardButtonProps {
    text: string;
  }

const CardButton: React.FC<CardButtonProps> = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.buttonText}>{text}</Text>
        </View>
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