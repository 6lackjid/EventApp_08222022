import { Pagination } from '@mantine/core';

export const Page = () => {
  return (
    <Pagination
      total={10}
      position="center"
      styles={(theme) => ({
        item: {
          '&[data-active]': {
            backgroundImage: theme.fn.gradient({ from: 'red', to: 'yellow' }),
          },
        },
      })}
    />
  );
}