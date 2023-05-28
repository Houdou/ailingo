import {Button, Center, createStyles, Flex, Grid, MultiSelect, Stepper, Text, TextInput} from "@mantine/core";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mantine/hooks";
import {Section} from "../layout/section.tsx";

const useStyles = createStyles((theme) => ({
  content: {
    height: "100%"
  }
}))

const Onboarding = () => {
    const [step, setStep] = useState(0);

    const [data, setData] = useState([
      { value: "saas", label: "Saas" },
      { value: "business_english", label: "Business English" },
      // { value: "saas", label: "Saas" },
    ]);
    const { classes } = useStyles();
    const narrow = useMediaQuery("(max-width: 600px)");

    const navigate = useNavigate();

    return (
        <Flex direction={"column"} justify={"space-between"} w={"100%"} h={"90vh"}>
          <Stepper active={step} size="sm" maw={"64rem"} w={"100%"} m={"0 auto"} style={{flexGrow: 10}} classNames={{content: classes.content}}>
            <Stepper.Step label="First step" description="Self intro">
              <Center h={"100%"}>
                <Section title={"Describe yourself"}>
                  <TextInput
                    placeholder="The name you want to be called by"
                    size={"lg"}
                  />
                </Section>
              </Center>
            </Stepper.Step>
            <Stepper.Step label="Second step" description="Choose interests">
              <Center h={"100%"}>
                <Section title={"Interested domain"}>
                  <MultiSelect
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onCreate={(query) => {
                      const normalized_query = String(query).toLowerCase().trim().replace(/\s+/g, "_");
                      const item = { value: normalized_query, label: query };
                      setData((current) => [...current, item]);
                      return item;
                    }}
                    data={data}
                    placeholder="Pick all that you like"
                    size={"lg"}
                  />
                </Section>
              </Center>
            </Stepper.Step>
            <Stepper.Step label="Final step" description="Get your">
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
                    if(step < 2) {
                      setStep(step + 1)
                      return;
                    }
                    // Handle submit
                    navigate("/words/1");
                  }}
              >
                <Text fw={"300"} fz={"24px"}>
                  {
                    step < 2 ? "Next" : "Get started"
                  }
                </Text>
              </Button>
            </Grid.Col>
          </Grid>
        </Flex>
    )
}

export { Onboarding }