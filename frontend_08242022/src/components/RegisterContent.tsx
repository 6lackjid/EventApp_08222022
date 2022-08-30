import { TextInput, Checkbox, Button, Group, Box, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export const RegisterContent =() =>  {
  const form = useForm({
    initialValues: {
        username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="ユーザー名"
          placeholder="user"
          {...form.getInputProps('username')}
        />

<TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder=""
          {...form.getInputProps('password')}
        />
        <PasswordInput
          withAsterisk
          label="Password(確認用)"
          placeholder=""
          {...form.getInputProps('passwordConfirm')}
        />

        

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}