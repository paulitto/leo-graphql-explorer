import { useState } from 'react';
import { HStack, IconButton, Input, InputGroup } from '@chakra-ui/react';
import { LuFilter, LuFilterX } from 'react-icons/lu';

type CharacterFilterProps = {
  loading: boolean;
  onFilterChange: (value: string) => void;
  initialValue?: string;
}

/**
 * Component for filtering by name
 * Could be reused for filtering other fields
 */
export const CharacterFilter = ({
  loading,
  onFilterChange,
  initialValue = ''
}: CharacterFilterProps) => {
  const [nameFilter, setNameFilter] = useState(initialValue);

  const handleBlur = () => {
    onFilterChange(nameFilter || '');
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onFilterChange(nameFilter || '');
    }
  };

  const handleReset = () => {
    setNameFilter('');
    onFilterChange('');
  };

  return (
    <HStack justify="space-between" w="full" py={1}>
      <InputGroup
        startElement={<LuFilter />}
        endElement={
          nameFilter && (
            <IconButton
              size={"sm"}
              variant="ghost"
              aria-label="Clear Filter"
              onClick={handleReset}
            >
              <LuFilterX />
            </IconButton>
          )
        }
      >
        <Input
          aria-label="Filter By Name"
          disabled={loading}
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
          placeholder="Filter By Name"
        />
      </InputGroup>
    </HStack>
  );
};