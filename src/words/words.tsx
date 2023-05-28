import { Word } from "./word";
import {Button, Center, Container, Flex} from "@mantine/core";
import { useWords } from "./words.hook.ts";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Section} from "../layout/section.tsx";

function Words() {
    const { word: word_param } = useParams();
    const [index, setIndex] = useState(0);
    const {loading, error, words, fetchFakeWords } = useWords();
    const navigate = useNavigate();

    useEffect(() => {
      fetchFakeWords();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>error</div>;
    }

    if(index === -1) {
      // Start
    }

    const word = words[index];

    if (!word) {
      return <div>error</div>;
    }

    function GoNext() {
      if(index < words.length - 1) {
        setIndex(index + 1);
      } else {
        navigate("/story");
        setIndex(0);
      }
    }

    return (
        <Flex direction={"column"} justify={"space-between"} align={"center"} w={"100%"} h={"90vh"} gap={"1rem"} p={"1rem 0"}>
          <Container maw={"max(40rem, 60%)"} p={0}>
            <Section title={"Learn new words"}>
              <Center>
                <Word key={word.word.english} word={word}/>
              </Center>
            </Section>
          </Container>
            <Center h={"6rem"}>
              <Button
                onClick={() => {
                  GoNext();
                }}
                variant="gradient"
                size={"xl"}

              >{
                index === words.length - 1 ? "Review" : "Next word"
              }</Button>
            </Center>
        </Flex>
    );
}

export {
  Words
}