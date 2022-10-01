import { useCallback, useContext } from "react";
import { v4 } from "uuid";
import { FeedBackItemsContext } from "../contexts/FeedBackItemsContext";
import { SECTIONS } from "../utils/constants";

export default function useFeedBack() {
  const { feedback, setFeedback } = useContext(FeedBackItemsContext);

  const createReport = useCallback(
    (name) => {
      const id = v4();
      setFeedback({
        id,
        name,
        introduction: "",
        overallFeedback: "",
        [SECTIONS.EMPATHIZE]: {
          mistakes: [],
          didWell: [],
        },
        [SECTIONS.DEFINE]: {
          mistakes: [],
          didWell: [],
        },
        [SECTIONS.IDEATE]: {
          mistakes: [],
          didWell: [],
        },
        [SECTIONS.PROTOTYPE]: {
          mistakes: [],
          didWell: [],
        },
        [SECTIONS.TESTING]: {
          mistakes: [],
          didWell: [],
        },
      });
      return id;
    },
    [setFeedback]
  );

  const addNewParagraph = useCallback(
    (section, type) => {
      const newItem =
        type === "mistakes"
          ? {
              id: v4(),
              screenshot: "",
              explanationText: "",
              overcomeText: "",
              variables: [],
              section,
              type,
              stale: true,
            }
          : {
              id: v4(),
              screenshot: "",
              text: "",
              variables: [],
              section,
              type,
              stale: true,
            };
      setFeedback((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [type]: [...prev[section][type], newItem],
        },
      }));
    },
    [setFeedback]
  );

  const removeParagraph = useCallback(
    (section, type, id) => {
      setFeedback((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [type]: prev[section][type].filter((para) => para.id !== id),
        },
      }));
    },
    [setFeedback]
  );

  const commitParagraph = useCallback(
    (id, newValue) => {
      setFeedback((prev) => ({
        ...prev,
        [newValue.section]: {
          ...prev[newValue.section],
          [newValue.type]: prev[newValue.section][newValue.type].map((item) =>
            item.id === id ? { ...newValue, stale: false } : item
          ),
        },
      }));
    },
    [setFeedback]
  );

  const makeParagraphStale = useCallback(
    (section, type, id) => {
      setFeedback((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [type]: prev[section][type].map((item) =>
            item.id === id ? { ...item, stale: true } : item
          ),
        },
      }));
    },
    [setFeedback]
  );

  const getStaleParagraph = useCallback(
    (section) => {
      return [feedback[section].mistakes, feedback[section].didWell]
        .flatMap((elem) => elem)
        .find((item) => item.stale === true);
    },
    [feedback]
  );

  const getParagraph = useCallback(
    (section, type, id) => {
      return feedback[section][type].find((item) => item.id === id);
    },
    [feedback]
  );

  const addIntroduction = useCallback(
    (text) => {
      setFeedback((prev) => ({
        ...prev,
        introduction: text,
      }));
    },
    [setFeedback]
  );

  const addOverallFeedback = useCallback(
    (text) => {
      setFeedback((prev) => ({
        ...prev,
        overallFeedback: text,
      }));
    },
    [setFeedback]
  );

  return {
    feedback,
    createReport,
    addNewParagraph,
    removeParagraph,
    commitParagraph,
    makeParagraphStale,
    getStaleParagraph,
    getParagraph,
    addIntroduction,
    addOverallFeedback,
  };
}
