import { Stack } from "expo-router";
import { DeckProvider } from "../context/deckContext";

export const RootLayout = () => {
    return (
        <>
            <DeckProvider>
                <Stack initialRouteName="index">
                    <Stack.Screen name="index" />
                    <Stack.Screen name="resultPage" />
                </Stack>
            </DeckProvider>
        </>
    )
}