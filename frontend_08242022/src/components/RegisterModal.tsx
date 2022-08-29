import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import { RegisterProps } from '../types/RegisterFormProps';
import { RegisterContent } from './RegisterContent';

const RegisterModal:React.FC<RegisterProps> = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="新規会員登録"
      >
        <RegisterContent />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  );
}

export default RegisterModal;