import {Mark, Paper, Stack, Text} from "@mantine/core";
import Loading from "./loading.tsx";
import React, {Suspense, useEffect} from "react";
import {useRecoilValue} from "recoil";
import {storyState} from "./story.state.ts";
import { wordsState } from "../words/words.state.ts";
import {useNavigate} from "react-router-dom";
import { highlightMatches } from "./highlightMatches.ts";

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
    <Paper shadow={"md"} withBorder p={"md"} maw={"600px"}>
      <Stack>
      {
        sentences.map(
          s => (<Text>
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