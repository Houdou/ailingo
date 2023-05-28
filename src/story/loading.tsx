import {Paper, Skeleton, Stack} from "@mantine/core";

function Loading() {
  const lineHeight = 12;

  return (
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
  )
}

export default Loading