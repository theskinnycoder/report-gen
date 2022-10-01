import { useContext } from "react";
import { FeedBackItemsContext } from "../contexts/FeedBackItemsContext";
import { mapJSONtoRichText } from "../utils/functions";

export default function useRichText() {
  const { feedback } = useContext(FeedBackItemsContext);

  const richText = mapJSONtoRichText(feedback);

  return {
    richText,
  };
}
