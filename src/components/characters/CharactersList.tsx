import { type Character } from '@/types';
import {
    Table,
    Badge,
    Text,
    VStack,
    HStack,
    Box,
    Spinner,
    Alert,
    useBreakpointValue,
    Pagination,
    IconButton,
    ButtonGroup,
} from '@chakra-ui/react';
import Image from 'next/image'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { PLACEHOLDER_IMAGE_URL } from '@/consts';

type CharacterTableProps = {
    characters: Character[];
    loading?: boolean;
    error?: string;
    currentPage: number;
    // totalPages: number;
    totalCount: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onCharacterClick: (character: Character) => void;
}

/**
 * Component to display a list of characters in a table format.
 * falls back to a list of cards on mobile
 */
export const CharacterTable = ({
    characters,
    loading = false,
    error,
    currentPage,
    totalCount,
    pageSize,
    onPageChange,
    onCharacterClick,
}: CharacterTableProps) => {
    // detects mobile based on default Chakra UI breakpoints https://www.chakra-ui.com/docs/theming/breakpoints
    const isMobile = useBreakpointValue({ base: true, md: false });

    // prioritize loading images based on viewport
    const prioritizedImagesCount = useBreakpointValue({
        base: 5, // mobile
        md: 8,     // tablet
        lg: 1,    // desktop
    }) || 6;

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'alive':
                return 'green';
            case 'dead':
                return 'red';
            case 'unknown':
                return 'gray';
            default:
                return 'gray';
        }
    };

    if (loading) {
        return (
            <VStack gap={4} py={8}>
                <Spinner size="xl" />
                <Text>Loading characters...</Text>
            </VStack>
        );
    }

    if (error) {
        return (
            <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>Error!</Alert.Title>
                <Alert.Description>{error}</Alert.Description>
            </Alert.Root>
        );
    }

    if (isMobile) {
        // fall back to a list of cards on mobile
        return (
            <VStack gap={6} w="full">
                {characters.map((character, index) => (
                    <Box
                        key={character.id}
                        w="full"
                        p={4}
                        borderWidth={1}
                        borderRadius="lg"
                        cursor="pointer"
                        _hover={{ bg: 'gray.50', transform: 'translateY(-2px)' }}
                        transition="all 0.2s"
                        onClick={() => onCharacterClick(character)}
                    >
                        <HStack gap={4}>
                            <Image
                                src={character.image || PLACEHOLDER_IMAGE_URL}
                                alt={character.name}
                                width={80}
                                height={80}
                                style={{
                                    borderRadius: '.3rem',
                                }}
                                priority={index < prioritizedImagesCount ? true : undefined}
                                objectFit="cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = PLACEHOLDER_IMAGE_URL;
                                }}
                            />
                            <VStack align="start" flex={1} gap={2}>
                                <Text fontWeight="bold" fontSize="lg">
                                    {character.name}
                                </Text>
                                <Badge px={1} colorPalette={getStatusColor(character.status)}>
                                    {character.status}
                                </Badge>
                                <Text fontSize="sm" color="gray.600">
                                    {character.species}
                                </Text>
                                <Text fontSize="xs" color="gray.500" lineClamp={1}>
                                    Origin: {character.origin?.name || 'Unknown'}
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                ))}

                <Pagination.Root
                    count={totalCount}
                    pageSize={pageSize}
                    page={currentPage}
                    onPageChange={(e) => onPageChange(e.page)}
                >
                    <HStack gap={2} justify="center" wrap="wrap">
                        <Pagination.PrevTrigger />
                        <Pagination.Items
                            render={(page) => (
                                <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                                    {page.value}
                                </IconButton>
                            )}
                        />
                        <Pagination.NextTrigger />
                    </HStack>
                </Pagination.Root>
            </VStack>
        );
    }

    // for Desktop using table
    return (
        <VStack gap={6} w="full">
            <Table.Root size="md" variant="outline" m={4}>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Image</Table.ColumnHeader>
                        <Table.ColumnHeader>Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Status</Table.ColumnHeader>
                        <Table.ColumnHeader>Species</Table.ColumnHeader>
                        <Table.ColumnHeader>Origin</Table.ColumnHeader>
                        <Table.ColumnHeader>Location</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {characters.map((character, index) => (
                        <Table.Row
                            key={character.id}
                            cursor="pointer"
                            _hover={{ bg: 'var(--item-highlight)' }}
                            transition="background-color .5s"
                            onClick={() => onCharacterClick(character)}
                        >
                            <Table.Cell>
                                <Image
                                    src={character.image || PLACEHOLDER_IMAGE_URL}
                                    alt={character.name}
                                    width={60}
                                    height={60}
                                    style={{
                                        borderRadius: '.3rem',
                                    }}
                                    priority={index < prioritizedImagesCount ? true : undefined}
                                    objectFit="cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = PLACEHOLDER_IMAGE_URL;
                                    }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Text fontWeight="semibold">{character.name}</Text>
                            </Table.Cell>
                            <Table.Cell>
                                <Badge px={1} colorPalette={getStatusColor(character.status)}>
                                    {character.status}
                                </Badge>
                            </Table.Cell>
                            <Table.Cell>{character.species}</Table.Cell>
                            <Table.Cell>{character.origin?.name || 'Unknown'}</Table.Cell>
                            <Table.Cell>{character.location?.name || 'Unknown'}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            <Pagination.Root
                count={totalCount}
                pageSize={pageSize}
                page={currentPage}
                onPageChange={(e) => onPageChange(e.page)}
            >
                <ButtonGroup variant="ghost" size="sm">
                    <Pagination.PrevTrigger asChild>
                        <IconButton>
                            <LuChevronLeft />
                        </IconButton>
                    </Pagination.PrevTrigger>
                    <Pagination.Items
                        render={(page) => (
                            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                                {page.value}
                            </IconButton>
                        )}
                    />
                    <Pagination.NextTrigger asChild>
                        <IconButton>
                            <LuChevronRight />
                        </IconButton>
                    </Pagination.NextTrigger>
                    {/* </HStack> */}
                </ButtonGroup>
            </Pagination.Root>
        </VStack>
    );
};

CharacterTable.displayName = 'CharacterTable';