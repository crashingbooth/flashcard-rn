import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import QuizPage from './components/quizPage';
import { DeckContext, DeckProvider } from './context/deckContext';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <DeckProvider>
        <QuizPage/>
      </DeckProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
});
