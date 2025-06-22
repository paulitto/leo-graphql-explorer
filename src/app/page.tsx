import { Box, Text, Heading, Link as ExernalLink, LinkBox, LinkOverlay } from '@chakra-ui/react';
import Link from 'next/link';

/**
 * Home page with some about info
 */
export default function Home() {

  return (
    <Box p={8}>
      <LinkBox as="article" maxW="lg" p="5" borderWidth="1px" rounded="md">
        <Heading size="lg" my="2">
          <LinkOverlay asChild>
            <Link href="/characters">Welcome to the Rick And Morty Characters Explorer</Link>
          </LinkOverlay>
        </Heading>
        <Text mb="3" color="fg.muted">
          This project uses <ExernalLink href="https://rickandmortyapi.com/documentation">Rick and Morty API</ExernalLink> as a data source
          to let you explore the details about the show.
        </Text>
        <Text mb="3" color="fg.muted">
          You can start by exploring all the characters in the Rick and Morty universe
          {' '}<Link href="/characters">here</Link>
        </Text>

      </LinkBox>
    </Box>
  );
}
