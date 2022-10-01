import { useLocalStorage } from "@mantine/hooks";
import { createContext } from "react";
import { SECTIONS } from "../utils/constants";

export const FeedBackItemsContext = createContext();

export default function FeedBackItemsProvider({ children }) {
  const [feedback, setFeedback] = useLocalStorage({
    key: "feedback",
    defaultValue: {
      overallFeedback: "",
      introduction: "",
      [SECTIONS.EMPATHIZE]: {
        didWell: [],
        mistakes: [],
      },
      [SECTIONS.DEFINE]: {
        didWell: [],
        mistakes: [],
      },
      [SECTIONS.IDEATE]: {
        didWell: [],
        mistakes: [],
      },
      [SECTIONS.PROTOTYPE]: {
        didWell: [],
        mistakes: [],
      },
      [SECTIONS.TESTING]: {
        didWell: [],
        mistakes: [],
      },
    },
  });

  return (
    <FeedBackItemsContext.Provider
      value={{
        feedback,
        setFeedback,
      }}
    >
      {children}
    </FeedBackItemsContext.Provider>
  );
}
