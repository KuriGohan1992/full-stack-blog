import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ContentFormat = "plain" | "markdown";

type PostContentProps = Readonly<{
	body: string;
	contentFormat: ContentFormat;
}>;

export function PostContent({ body, contentFormat }: PostContentProps) {
	if (contentFormat === "plain") {
		return <div className="plain-post-content">{body}</div>;
	}

	return (
		<div className="markdown-post-content">
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
		</div>
	);
}
