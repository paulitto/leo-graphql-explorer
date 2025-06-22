/**
 * data stored about the user
 */
export type RegistrationData = {
  username: string;
  jobTitle: string;
  registeredDateTime: string;
}

/*
 * data required from user to register
*/
export type UserData = Omit<RegistrationData, 'registeredDateTime'>;

/**
 * The character data returned from the Rick and Morty API
 */
export type Character = {
  id: string;
  name: string;
  status: string;
  species: string;
  type?: string;
  gender?: string;
  image: string;
  origin?: {
    id: string;
    name: string;
    url: string;
  };
  location?: {
    id: string;
    name: string;
    url: string;
  };
  episode?: {
    id: string;
    name: string;
    air_date: string;
  }[];
  url?: string;
  created?: string;
}

/**
 * general info about the characters returned from the API
 */
export type CharactersInfo = {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
}

/**
 * graphql response format for the characters query
 */
export type CharactersResponse = {
  characters: {
    info: CharactersInfo;
    results: Character[];
  };
}
