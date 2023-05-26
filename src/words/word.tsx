import {
  Flex,
  Group,
  Paper,
  Skeleton,
  Title,
  Text,
  Container,
  Grid,
  Divider,
  Blockquote,
  Stack,
  SimpleGrid, ScrollArea, Image, AspectRatio
} from "@mantine/core"
import type {Synonym, Word} from "../types";
import React, {CSSProperties} from "react";

const Synonym = ({
    synonym
}: {synonym : Synonym}) => {
    return (
      <Flex gap={"xs"} align={"center"} direction={"column"}>
          {/*<Skeleton width={180} height={180}/>*/}
          <AspectRatio ratio={1} w={180} h={180} mah={180}>
            <Container style={{
              background: `url(${synonym.example.img_url})`,
              backgroundPosition: "-180px -180px",
              backgroundSize: "360px 360px"
            }} />
          </AspectRatio>
          <Text fz={"lg"} fw={700}>{synonym.synonym}</Text>
          <Group spacing={"xs"}>
              <Text>{synonym.ipa}</Text>
              <Text>{synonym.partOfSpeech}. {synonym.chinese}</Text>
          </Group>
          <Stack spacing={0} align={"center"}>
            <Text fz={"xs"} fs={"italic"}>{synonym.example.sentence}</Text>
            <Text fz={"xs"} fs={"italic"}>{synonym.example.translation}</Text>
          </Stack>
      </Flex>
    )
}

const Word = ({
  word
}: { word: Word }) => {

    const {
        word: w,
        example,
        synonyms,
    } = word;

    return (
      <Paper shadow={"md"} withBorder p={"md"} h={"90%"} maw={"600px"}>
          <ScrollArea h={"100%"} >
            <Flex gap={"sm"} align={"center"} direction={"column"} justify={"space-between"}>
              <Title order={1}>{w.english}</Title>
              <Group>
                <Text size={"lg"}>{w.ipa}</Text>
                <Group>
                  <Text size={"lg"}>{w.partOfSpeech}. {w.chinese}</Text>
                </Group>
              </Group>
              <Stack spacing={0} align={"center"}>
                <Text fz={"sm"} fs={"italic"}>{example.sentence}</Text>
                <Text fz={"sm"} fs={"italic"}>{example.translation}</Text>
              </Stack>
              {/*<Skeleton width={400} height={400}/>*/}
              <AspectRatio ratio={1} w={400} h={400} mah={400}>
                <Container style={{
                  background: `url(${example.img_url})`,
                  backgroundPosition: "-400px -400px",
                  backgroundSize: "800px 800px"
                }} />
              </AspectRatio>
              <Divider my={"sm"} w={"100%"}/>
              {/*Synonym*/}
              <SimpleGrid cols={2} w={400}>
                {
                  synonyms.map(synonym => {
                    return (
                      <Synonym key={synonym.synonym} synonym={synonym}/>
                    );
                  })
                }
              </SimpleGrid>
            </Flex>
          </ScrollArea>
      </Paper>
    );
};

export {
    Word
}