'use client';

import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';

interface ApolloClientProviderProps {
    children: React.ReactNode;
}

export function ApolloClientProvider({ children }: ApolloClientProviderProps) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}