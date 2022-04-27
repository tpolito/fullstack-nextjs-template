import { Button, Container, Divider, Stack, Text, Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();

  console.log(session);
  return (
    <Container>
      <Title order={1} color="red[4]" align="center">
        Rock Billion
      </Title>
      <Divider my="sm" />
      <Stack align="center">
        <Button
          sx={(theme) => ({
            backgroundColor: session
              ? theme.colors.red[5]
              : theme.colors.blue[5],
            minWidth: '250px',
            '&:hover': {
              backgroundColor: session
                ? theme.colors.red[4]
                : theme.colors.blue[4],
            },
          })}
          onClick={() => (session ? signOut() : signIn())}
        >
          {session ? 'Sign out' : 'Login'}
        </Button>
        {session && (
          <>
            <Text>Logged in as {session.user?.name}</Text>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default Home;
