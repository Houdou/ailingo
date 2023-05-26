import {Center, Flex} from "@mantine/core";
import "./app.css";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Onboarding} from "./onboarding/onboarding.tsx";
import {Words} from "./words/words.tsx";
import {Story} from "./story/story.tsx";

const App = () => {
    const router = createBrowserRouter(
        [
            { path: '/', element: <Onboarding /> },
            { path: "/words/:word", element: <Words /> },
            { path: "/story", element: <Story /> },
        ]
    );

    return (
        <Center id="app" p={"20px"} w={"100%"}>
          <Flex direction={"column"} justify={"space-between"} align={"center"} w={"100%"} h={"100%"}>
            <RouterProvider router={router} />
          </Flex>
        </Center>
    )
}

export default App