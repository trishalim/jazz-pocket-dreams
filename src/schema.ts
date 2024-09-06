import { CoMap, co } from "jazz-tools";

export class Book extends CoMap {
  title = co.string;
  author = co.string;
  // scoreAdventurous? = co.number;
  // scoreMysterious? = co.number;
  // scoreEmotional? = co.number;
  // scoreInspiring? = co.number;
  // scoreFunny? = co.number;
  // scoreLightHearted? = co.number;
}
