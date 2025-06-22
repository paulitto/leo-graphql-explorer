import { type Character } from '@/types';
import {
    Badge,
    Stack,
    Grid,
    DataList,
} from '@chakra-ui/react';
import Image from 'next/image'
import { Modal } from '@/components/ui/Modal';
import { PLACEHOLDER_IMAGE_URL, PLACEHOLDER_IMAGE_BASE64 } from '@/consts';

type CharacterModalProps = {
    character: Character;
    open: boolean;
    onClose: () => void;
}

/**
 * Modal component for displaying character details.
 */
export const CharacterModal = ({
    character,
    open,
    onClose,
}: CharacterModalProps) => {
    const lowerCaseStatus = character.status.toLowerCase();
    const statusColorMap: Record<string, string> = {
        alive: 'green',
        dead: 'red',
        unknown: 'gray',
    };
    const episodeNames = character.episode?.reduce((acc: string[], episode) => {
        acc.push(episode.name);
        return acc;
    }, []);
    const characterData = [
        { label: 'Status', value: character.status },
        { label: 'Species', value: character.species },
        { label: 'Gender', value: character.gender },
        { label: 'Origin', value: character.origin?.name || 'Unknown' },
        { label: 'Location', value: character.location?.name || 'Unknown' },
        { label: 'Type', value: character.type || 'Unknown' },
        { label: 'Episodes', value: episodeNames?.join(',') || 'None' },
    ];

    return (
        <Modal
            title={character.name}
            open={open}
            onClose={onClose}
            maxWidth="2xl"
        >
            <Grid templateColumns={{ base: "1fr", md: "300px 1fr" }} gap={6}>
                <Stack gap={4} alignItems="center">
                    <Image
                        src={character.image || PLACEHOLDER_IMAGE_URL}
                        alt={character.name}
                        placeholder={PLACEHOLDER_IMAGE_BASE64}
                        width={300}
                        height={300}
                        style={{
                            borderRadius: ".3rem",
                        }}
                        objectFit="cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = PLACEHOLDER_IMAGE_URL;
                        }}
                    />
                    <Badge
                        colorPalette={statusColorMap[lowerCaseStatus] || "gray"}
                        size="lg"
                        px={4}
                        py={2}
                        justifyContent="center"
                    >
                        {character.status}
                    </Badge>
                </Stack>

                <Stack align="start" gap={4}>
                    <DataList.Root orientation="horizontal">
                        {characterData.map((item) => (
                            <DataList.Item key={item.label}>
                                <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                                <DataList.ItemValue maxH={20} overflowY='auto'>{item.value}</DataList.ItemValue>
                            </DataList.Item>
                        ))}
                    </DataList.Root>
                </Stack>
            </Grid>
        </Modal>
    );
};
