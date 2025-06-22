'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Container,
} from '@chakra-ui/react';

import { CharacterTable } from '@/components/characters/CharactersList';
import { CharacterModal } from '@/components/characters/CharacterModal';
import { CharacterFilter } from '@/components/characters/CharacterFilter';
import { type Character, type CharactersResponse } from '@/types';
import { GET_CHARACTERS } from '@/lib/queries';
import { useSearchParams, useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 20;

/**
 * Page with the list of characters.
 */
export default function CharactersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const currentPage = parseInt(searchParams.get('page') || '1');
  const currentFilter = searchParams.get('filter') ?
    { name: searchParams.get('filter') } :
    null;

  const { loading, error, data } = useQuery<CharactersResponse>(GET_CHARACTERS, {
    variables: { page: currentPage, filter: currentFilter },
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      console.error('GraphQL Error:', error);
    },
  });

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    params.set('filter', currentFilter?.name || '');
    router.push(`/characters?${params.toString()}`);
  };

  const handleFilterValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    params.set('filter', value);
    router.push(`/characters?${params.toString()}`);
  };

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  const characters = data?.characters?.results || [];
  const totalCount = data?.characters?.info?.count || 0;

  return (
    <Container w="full" py={8} px={0}>
      <CharacterFilter
        loading={loading}
        onFilterChange={handleFilterValueChange}
        initialValue={currentFilter?.name || ''}
      />
      <CharacterTable
        characters={characters}
        loading={loading}
        error={error?.message}
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
        onCharacterClick={handleCharacterClick}
      />

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          open={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
}