import {atom, selector} from "recoil";
import {wordsState} from "../words/words.state.ts";
import {getFakeStory} from "./story.hook.ts";

const storyState = selector<string>({
  key: 'story',
  get: async ({get}) => {
    const words = await get(wordsState);
    if(!words || words.length <= 0) {
      return "";
    }

    const {story: new_story} = await getFakeStory(words);

    const list_words = words.map(w => w.word.english);

    return new_story;
  }
});

export {
  storyState,
}