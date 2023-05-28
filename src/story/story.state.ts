import {atom, selector} from "recoil";
import {wordsState} from "../words/words.state.ts";
import {getStory, getFakeStory} from "./story.hook.ts";
import {userState} from "../user/user.state.ts";
import * as _ from 'lodash';

const storyState = selector<string>({
  key: 'story',
  get: async ({get}) => {
    const words = await get(wordsState);
    const user = await get(userState);
    if(!words || words.length <= 0) {
      return "";
    }

    // const {story: new_story} = await getFakeStory(words);
    // return new_story;

    const story = await getStory(words, user)
    return story;
  }
});

export {
  storyState,
}