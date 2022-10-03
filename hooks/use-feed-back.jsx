import { useCallback } from "react";
import { v4 } from "uuid";
import useDocument from "./use-document";

export default function useFeedBack(id) {
  const { updateDocument, document, loading } = useDocument("reports", id);

  const addNewParagraph = useCallback(
    async (section, type) => {
      const id = v4();
      const newItem =
        type === "mistakes"
          ? {
              id,
              screenshot: "",
              explanationText: "",
              overcomeText: "",
              section,
              type,
              stale: true,
            }
          : {
              id,
              screenshot: "",
              text: "",
              section,
              type,
              stale: true,
            };
      await updateDocument({
        ...document,
        [section]: {
          ...document[section],
          [type]: [...document[section][type], newItem],
        },
      });
      return id;
    },
    [document, updateDocument]
  );

  const removeParagraph = useCallback(
    async (section, type, id) => {
      await updateDocument({
        ...document,
        [section]: {
          ...document[section],
          [type]: document[section][type].filter((para) => para.id !== id),
        },
      });
    },
    [document, updateDocument]
  );

  const commitParagraph = useCallback(
    async (id, newValue) => {
      await updateDocument({
        ...document,
        [newValue.section]: {
          ...document[newValue.section],
          [newValue.type]: document?.[newValue?.section]?.[newValue?.type].map(
            (item) => (item?.id === id ? newValue : item)
          ),
        },
      });
    },
    [document, updateDocument]
  );

  const getParagraph = useCallback(
    (section, type, id) => {
      return document[section]?.[type]?.find((item) => item?.id === id);
    },
    [document]
  );

  const addIntroduction = useCallback(
    async (text) => {
      await updateDocument({
        ...document,
        introduction: text,
      });
    },
    [document, updateDocument]
  );

  const addOverallFeedback = useCallback(
    async (text) => {
      await updateDocument({
        ...document,
        overallFeedback: text,
      });
    },
    [document, updateDocument]
  );

  return {
    document,
    loading,
    addNewParagraph,
    removeParagraph,
    commitParagraph,
    getParagraph,
    addIntroduction,
    addOverallFeedback,
  };
}
