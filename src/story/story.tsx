import {Button, Center, Mark, Paper, Stack, Flex, Text, Container} from "@mantine/core";
import Loading from "./loading.tsx";
import React, {Suspense, useEffect} from "react";
import {useRecoilValue} from "recoil";
import {storyState} from "./story.state.ts";
import { wordsState } from "../words/words.state.ts";
import {useNavigate} from "react-router-dom";
import { highlightMatches } from "./highlightMatches.ts";
import {Section} from "../layout/section.tsx";

function Story() {
  const story = useRecoilValue(storyState);
  const sentences = story.split('\n')
  const words = useRecoilValue(wordsState);

  const navigate = useNavigate();
  useEffect(() => {
    if(story === "") {
      navigate("/words/0");
    }
  }, []);

  return (
    <Flex direction={"column"} justify={"space-between"} align={"center"} h={"90vh"} gap={"1rem"} p={"1rem 0"}>
      <Container maw={"max(40rem, 60%)"} p={0}>
        <Section title={"Review words"}>
          <Paper shadow={"md"} withBorder p={"md"}>
            <Stack>
              {
                sentences.map(
                  (s, i) => (<Text key={`story line ${i}`}>
                    {
                      highlightMatches(
                        s,
                        words.map(w => w.word.english)
                      ).map(c => c.type === 'highlight'
                        ? <Mark>{c.value}</Mark>
                        :<>{c.value}</>
                      )
                    }
                  </Text>)
                )
              }
            </Stack>
          </Paper>
        </Section>
      </Container>

      <Center h={"6rem"}>
        <Button
          onClick={() => {
            navigate("/words/1")
          }}
          variant="gradient"
          size={"xl"}
        >Start new round</Button>
      </Center>
    </Flex>
  );
}

function LoadingStory() {
  return (
    <Suspense fallback={<Loading />}>
      <Story />
    </Suspense>
  )
}

export {
    LoadingStory as Story
}