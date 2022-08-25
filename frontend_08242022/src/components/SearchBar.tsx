import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';

export function SearchBar(props: TextInputProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      radius="xl"
      size="xl"
      width={200}
      
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
          {theme.dir === 'ltr' ? (
            <IconArrowRight size={180} stroke={1.5} />
          ) : (
            <IconArrowLeft size={180} stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search..."
      rightSectionWidth={60}

      {...props}
    />
  );
}