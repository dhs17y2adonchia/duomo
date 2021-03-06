/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/duomo/helpers/variants" as *;

@mixin background-color($variants...) {
	@include variants($variants...) using ($v) {
		#{variant(bg-indigo-500, $v)} {
			background-color: var(--indigo-500);
		}
	}
}

@at-root {
	@include background-color(root, responsive, hover, focus, group-hover, group-focus);
}
`)
	// prettier-ignore
	expect(result).toBe(`
/* variant=root */
.bg-indigo-500 {
	background-color: var(--indigo-500);
}

/* variant=hover */
.hover\\:bg-indigo-500:hover {
	background-color: var(--indigo-500);
}

/* variant=focus */
.focus\\:bg-indigo-500:focus {
	background-color: var(--indigo-500);
}

/* variant=group-hover */
.group:hover.group-hover\\:bg-indigo-500, .group:hover .group-hover\\:bg-indigo-500 {
	background-color: var(--indigo-500);
}

/* variant=group-focus */
.group:focus.group-focus\\:bg-indigo-500, .group:focus .group-focus\\:bg-indigo-500 {
	background-color: var(--indigo-500);
}

/* variant=responsive */
@media (min-width: 512px) {
	.xs\\:bg-indigo-500 {
		background-color: var(--indigo-500);
	}
}
@media (min-width: 640px) {
	.sm\\:bg-indigo-500 {
		background-color: var(--indigo-500);
	}
}
@media (min-width: 768px) {
	.md\\:bg-indigo-500 {
		background-color: var(--indigo-500);
	}
}
@media (min-width: 1024px) {
	.lg\\:bg-indigo-500 {
		background-color: var(--indigo-500);
	}
}
@media (min-width: 1280px) {
	.xl\\:bg-indigo-500 {
		background-color: var(--indigo-500);
	}
}
@media (min-width: 1536px) {
	.\\32 xl\\:bg-indigo-500 {
		background-color: var(--indigo-500);
	}
}
`.trim())
})
