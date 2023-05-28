import {Button, Center, createStyles, Flex, Grid, MultiSelect, Select, Stepper, Text, TextInput} from "@mantine/core";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mantine/hooks";
import {Section} from "../layout/section.tsx";
import {useRecoilState} from "recoil";
import {userState} from "../user/user.state.ts";
import {useForm} from "@mantine/form";

const useStyles = createStyles((theme) => ({
  stepBody: {
    '@media (max-width: 600px)': {
      display: "none",
    },
    display: "initial"
  },
  content: {
    height: "100%"
  }
}))

const TotalSteps = 3;

const Onboarding = () => {
    const form = useForm({
      initialValues: {
        name: "",
        scene: "",
        tags: []
      }
    })

    const [step, setStep] = useState(0);
    const [user, setUser] = useRecoilState(userState);

    const [scenes, setScenes] = useState([
      { value: "Ecommerce & SaaS", label: "Ecommerce & SaaS" },
      { value: "coming soon", label: "More coming soon!", disabled: true }
    ]);
    const [tags, setTags] = useState([
      { value: "business_english", label: "Business English" },
      { value: "campus", label: "Campus", disabled: true },
    ]);

    const { classes } = useStyles();
    const narrow = useMediaQuery("(max-width: 600px)");

    const navigate = useNavigate();

    useEffect(() => {
      if(user.onboarded) {
        setStep(TotalSteps);
      } else {
        setStep(0);
      }
    }, [user.id, user.onboarded]);

    return (
        <Flex direction={"column"} justify={"space-between"} w={"100%"} h={"90vh"}>
          <Stepper active={step} size="sm" maw={"64rem"} w={"100%"} m={"0 auto"} style={{flexGrow: 10}} classNames={{...classes}}>
            <Stepper.Step label="First step" description="Self intro">
              <Center h={"100%"}>
                <Section title={"Describe yourself"}>
                  <TextInput
                    placeholder="The name you want to be called by"
                    size={"lg"}
                    {...form.getInputProps("name")}
                  />
                </Section>
              </Center>
            </Stepper.Step>
            <Stepper.Step label="Second step" description="Choose scene">
              <Center h={"100%"}>
                <Section title={"Expected scenario"}>
                  <Select
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onCreate={(query) => {
                      const normalized_query = String(query).toLowerCase().trim().replace(/\s+/g, "_");
                      const item = { value: normalized_query, label: query };
                      setScenes((current) => [...current, item]);
                      return item;
                    }}
                    data={scenes}
                    size={"lg"}
                    {...form.getInputProps("scene")}
                  />
                </Section>
              </Center>
            </Stepper.Step>
            <Stepper.Step label="Third step" description="Choose interests">
              <Center h={"100%"}>
                <Section title={"Interested domain"}>
                  <MultiSelect
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onCreate={(query) => {
                      const normalized_query = String(query).toLowerCase().trim().replace(/\s+/g, "_");
                      const item = { value: normalized_query, label: query };
                      setTags((current) => [...current, item]);
                      return item;
                    }}
                    data={tags}
                    placeholder="Pick all that you like"
                    size={"lg"}
                    {...form.getInputProps("tags")}
                  />
                </Section>
              </Center>
            </Stepper.Step>
            <Stepper.Step label="Finish" description="">
              <Center h={"100%"}>
                <Section title={"That's it, you're all set!"}></Section>
              </Center>
            </Stepper.Step>
          </Stepper>
          <Grid w={"100%"} justify={"space-around"} maw={"600px"} ml={"auto"} mr={"auto"}>
            <Grid.Col span={narrow ? 9 : 3}>
              <Button variant={"default"} size={"xl"} radius={"sm"} w={"100%"} miw={"120px"}
                  onClick={() => step > 0 && setStep(step - 1)}
              >
                <Text fw={"300"} fz={"24px"}>
                  Back
                </Text>
              </Button>
            </Grid.Col>
            <Grid.Col span={9}>
              <Button variant={"gradient"} size={"xl"} radius={"sm"} w={"100%"}
                  onClick={() => {
                    if(step < TotalSteps) {
                      setStep(step + 1)
                      return;
                    }
                    // Handle submit
                    setUser((current) => ({
                      ...current,
                      ...form.values,
                      onboarded: true,
                      id: user.id
                    }));
                    navigate("/words/0");
                  }}
              >
                <Text fw={"300"} fz={"24px"}>
                  {
                    step < TotalSteps ? "Next" : "Get started"
                  }
                </Text>
              </Button>
            </Grid.Col>
          </Grid>
        </Flex>
    )
}

export { Onboarding }