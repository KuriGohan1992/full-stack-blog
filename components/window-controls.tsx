"use client";

function returnToBlog() {
	window.location.assign("/blog");
}

export function WindowControls() {
	return (
		<div className="title-bar-controls">
			<button type="button" aria-label="Minimize" onClick={returnToBlog} />

			<button type="button" aria-label="Maximize" disabled />

			<button type="button" aria-label="Close" onClick={returnToBlog} />
		</div>
	);
}
