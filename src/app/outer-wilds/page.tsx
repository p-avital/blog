'use client'
import { header } from './header'
import { Post } from "@/components/Post";
import { ReactElement, useState } from "react";

interface Nomai {
	text: ReactElement
	next?: Nomai[]
}

function ButtonTree({ nomai, position = [], setPosition, currentPosition }: { nomai: Nomai, currentPosition: number[] | undefined, position?: number[], setPosition: (position: number[]) => any }) {
	return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
		<button onClick={() => setPosition(position)} style={{ color: currentPosition ? "white" : "black", margin: "0.3ex" }}>::)</button>
		{nomai.next ? <div style={{ display: "flex" }}>{
			nomai.next.map((monai, i) => <ButtonTree
				key={i}
				setPosition={setPosition}
				nomai={monai}
				position={[...position, i]}
				currentPosition={currentPosition?.[0] == i ? currentPosition?.slice(1) : undefined} />)
		}</div> : <></>}
	</div>
}

function TranslatorTool({ nomai }: { nomai: Nomai }) {
	const [position, setPosition] = useState([] as number[])
	let selected: Nomai | undefined = nomai
	for (const index of position) {
		selected = selected?.next?.[index]
	}
	if (!selected) {
		return <>You reached an easter egg!</>
	}
	return <div>
		<ButtonTree setPosition={setPosition} nomai={nomai} currentPosition={position} />
		<div style={{ fontFamily: "Consolas, monospace", width: "100%" }}>{selected.text}</div>
	</div>
}

export default function Page() {
	return <Post header={header}><TranslatorTool nomai={{
		text: <>Have you ever played a game that's since lived in your head rent-free?<br />
			One that changes how you perceive some of the things around you?</>,
		next: [
			{
				text: <>Outer wild is one of these games. It's done this to thousands of us.<br />
					It's like a cognito-hazard, and now, I'm gonna infect you with it ::)</>
			},
			{ text: <>Oh? You have? Was it Outer Wilds? Because if it wasn't, you should probably not go any further in this branch.</> },
		],
	}} /></Post>
}