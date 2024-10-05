"use client";

import { useEffect } from "react";
import markdownToHtml from "zenn-markdown-html";

export default async function Editor({ data }: { data: string }) {

	useEffect(() => {

		import("zenn-embed-elements");

		document.querySelector("textarea#editor-value")!!.addEventListener("input", (e) => {

			document.querySelector("div#editor-view")!!.innerHTML = markdownToHtml((e.target as HTMLTextAreaElement).value);

		});

	});

	return (
		<div className="editor">
			<textarea name="data" defaultValue={data} id="editor-value" />
			<div
				className="znc"
				id="editor-view"
				dangerouslySetInnerHTML={{ __html: markdownToHtml(data) }}
			/>
		</div>
	)

}