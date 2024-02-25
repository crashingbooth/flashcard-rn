import { log } from "tone/build/esm/core/util/Debug";
import { CardModel, DeckModel } from "../models/cardModel";

export const API_ENDPOINTS = {
    ROOT: 'https://flashcard.fly.dev/api/',
    GET_ALL_DECKS: () => `${API_ENDPOINTS.ROOT}deck`,
    GET_CARDS_FOR_DECK: (deckId: number) => `${API_ENDPOINTS.ROOT}card/deck/${deckId}`
    // 'https://flashcard.fly.dev/api/card/deck/1'
 }

  
  interface FetchError {
    message: string;
    status?: number; 
  }


 export const fetchData = async (): Promise<DeckModel | FetchError> => {
    const apiUrl = API_ENDPOINTS.GET_CARDS_FOR_DECK(1)
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        // Handle non-successful responses (e.g., 404, 500)
        const error: FetchError = {
            message: `HTTP error! Status: ${response.status}`,
            status: response.status,
          };
          throw error
      }
  
      const data: DeckModel = await response.json();      
      return data;
    } catch (error) {
      // Handle network errors or JSON parsing errors
      console.error('Error fetching data:', (error as any).message);
      throw error;
    }
  };