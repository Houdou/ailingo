import {Paper, Stack, Text} from "@mantine/core";
import Loading from "./loading.tsx";
import React, {Suspense, useEffect} from "react";
import {useRecoilValue} from "recoil";
import {storyState} from "./story.state.ts";
import { wordsState } from "../words/words.state.ts";
import {useNavigate} from "react-router-dom";

function Story() {
  const story = useRecoilValue(storyState);
  const words = useRecoilValue(wordsState);
  const navigate = useNavigate();

  useEffect(() => {
    if(story === "") {
      navigate("/words/0");
    }
  }, []);

  return (
    <Paper shadow={"md"} withBorder p={"md"} maw={"600px"}>
      <Stack>
        <Text> {story} </Text>
        <Stack>
          {
            words.map(word => {
              return (
                <Text key={word.word.english}>{JSON.stringify(word.word)}</Text>
              )
            })
          }
        </Stack>
      </Stack>
    </Paper>
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