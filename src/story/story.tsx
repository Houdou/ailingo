import {Button, Center, Mark, Paper, Stack, Flex, Text, Container, Space} from "@mantine/core";
import Loading from "./loading.tsx";
import React, {Fragment, Suspense, useEffect, useState, useTransition} from "react";
import {useRecoilCallback, useRecoilValue} from "recoil";
import {storyOverrideState, storyState} from "./story.state.ts";
import { wordsState } from "../words/words.state.ts";
import {useNavigate} from "react-router-dom";
import { highlightMatches } from "./highlightMatches.ts";
import {Section} from "../layout/section.tsx";
import {getStory} from "./story.hook.ts";
import {userState} from "../user/user.state.ts";

function Story() {
  const story = useRecoilValue(storyState);
  const sentences = story.split('\n')
  const words = useRecoilValue(wordsState);

  const [loading, setLoading] = useState(false);

  const regenerateStory = useRecoilCallback(({snapshot, set}) => async () => {
    setLoading(true);
    const words = await snapshot.getPromise(wordsState);
    const user = await snapshot.getPromise(userState);

    const story = await getStory(words, user);

    set(storyOverrideState, story);
    setLoading(false);
  });

  const navigate = useNavigate();

  useEffect(() => {
    if(!story) {
      navigate("/");
    }
  }, []);

  if(loading) {
    return <Loading />
  }

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
                      ).map((c, idx) => c.type === 'highlight'
                        ? <Mark key={`${i}${idx}`}>{c.value}</Mark>
                        : <Fragment key={`${i}${idx}`}>{c.value}</Fragment>
                      )
                    }
                  </Text>)
                )
              }
            </Stack>
          </Paper>
        </Section>
      </Container>

      <Center h={"6rem"} pb={"1rem"}>
        <Button
          onClick={() => {
            navigate("/words/1")
          }}
          color={"#a1c7ec"}
          size={"xl"}
        >Start new round</Button>
        <Space w={"md"}/>
        <Button
          size={"xl"}
          variant="gradient"
          onClick={() => {
            regenerateStory();
          }}
        >换篇文章</Button>
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