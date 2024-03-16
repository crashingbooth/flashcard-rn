// import { Stack } from "expo-router";
// import { log } from "tone/build/esm/core/util/Debug";
// import { DeckProvider } from "../context/deckContext";

// export const RootLayout = () => {
//     console.log(`LOADED RootLayout`);
    
//     return (
//         <>
//             {/* <DeckProvider> */}
//                 <Stack  screenOptions={{
//             headerStyle:{backgroundColor:"orange"},
//             headerTintColor:"white",
//             headerTitleStyle:{fontWeight:"bold"}
//         }}
                
//                 >
//                     {/* <Stack.Screen name="index" />
//                     <Stack.Screen name="resultPage" /> */}
//                     <Stack.Screen name="test" />
//                     <Stack.Screen name="test2" />
//                 </Stack>
//             {/* </DeckProvider> */}
//         </>
//     )
// }

import  { Stack } from "expo-router"
import { DeckProvider } from "../context/deckContext";

export default function Layout() {
    return (
        <DeckProvider>
            <Stack 
            screenOptions={{
                headerStyle:{backgroundColor:"orange"},
                headerTintColor:"white",
                headerTitleStyle:{fontWeight:"bold"}
            }}
            > 
                <Stack.Screen name="quizPage" options={{headerShown:false}}/>
                <Stack.Screen name="resultPage"/>
            </Stack>
        </DeckProvider>
    )
}