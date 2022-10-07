import dynamic from "next/dynamic"

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,

  loading: () => <div>Loading...</div>,
})

/**
 * Custom Rich Text Editor
 * @param {import("@mantine/rte").RichTextEditorProps} props
 * @returns {JSX.Element}
 */
export default function RichTextEditorCustom(props) {
  return (
    <RichTextEditor
      controls={[
        ["bold", "italic", "underline", "strike"],
        ["h1", "h2", "h3", "h4", "h5", "h6"],
        ["unorderedList", "orderedList"],
        ["link", "image", "video", "blockquote"],
        ["alignLeft", "alignCenter", "alignRight"],
        ["sup", "sub"],
      ]}
      {...props}
    />
  )
}
