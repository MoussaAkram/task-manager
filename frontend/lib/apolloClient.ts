import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpLink = createHttpLink({
    uri: '', 
});

const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('token'); 
    return {
        headers: {
            ...headers,
            Authorization: token ? `JWT ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
