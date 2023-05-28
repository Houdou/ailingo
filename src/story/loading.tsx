import {Container, Flex, Paper, Skeleton, Stack} from "@mantine/core";
import {Section} from "../layout/section.tsx";

function Loading() {
  const lineHeight = 12;

  return (
    <Flex direction={"column"} justify={"space-between"} align={"center"} w={"100%"} h={"90vh"} gap={"1rem"} p={"1rem"}>
      <Container maw={"max(40rem, 60%)"}>
        <Section title={"Review words"}>
          <Paper shadow={"md"} withBorder p={"md"} w={"100%"}>
            <Stack spacing={16} w={"100%"}>
              <Skeleton height={lineHeight} ml={"24px"} width={"calc(100% - 24px)"} radius="xl" />
              {
                Array(12).fill(null).map(
                  (_,i) => (
                    <Skeleton key={i} height={lineHeight} radius="xl" />
                  )
                )
              }
            </Stack>
          </Paper>
        </Section>
      </Container>
    </Flex>
  )
}

export default Loading