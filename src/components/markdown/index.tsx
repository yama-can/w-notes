"use client";

import { useEffect } from "react";
import markdownToHtml from "zenn-markdown-html";
import "./content-css.scss";

export default function Markdown({ children }: { children: string }) {

	useEffect(() => {

		import("zenn-embed-elements");

	});

	return (
		<div
			className="znc"
			dangerouslySetInnerHTML={{ __html: markdownToHtml(children) }}
		/>
	);

}
