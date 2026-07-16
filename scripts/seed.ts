import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../lib/db/schema";
import { posts } from "../lib/db/schema";

config({
	path: ".env.local",
});

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL is not defined in .env.local.");
}

const sql = neon(databaseUrl);

const db = drizzle(sql, {
	schema,
});

type NewPost = typeof posts.$inferInsert;

const seedPosts: NewPost[] = [
	{
		title: "Free Will is an Illusion",
		slug: "free-will-is-an-illusion",
		body: `As humans, most of us prefer not to talk about free will. We do not even want to consider the possibility that we might not have it. However, much of philosophy argues against the idea that we are in control. But if there is something that we can agree on, it is that almost all of us feel like we have free will—we feel that we have control over the decisions we make. Yet there are numerous logical arguments that can prove otherwise.

First of all, let us define what being “free” means. Being free is defined by Google as “not under the control or in the power of another; able to act or be done as one wishes.” So let us consider what needs to happen in order for us to have free will—to act as we wish.

To begin, we would need to be aware of and in control of everything that influences our decisions. This includes our mood, our environment, the influence of other people, and the influence of our past experiences. Clearly, this does not happen, and complete control over these influences is impossible.

Others might think, “Even if I am not in control of those things, I can still choose freely whether I eat rice or bread for breakfast.” Not really. Imagine this scenario: rice or bread. Why would you choose one over the other? Why would I choose bread over rice? In order for me to choose bread, I would need to want bread more than rice.

Are we even in control of what we want? The answer is no. Presumably, you do not want to put ketchup in cottage cheese. Can you choose to want that? I do not mean whether you could physically do it. I am asking whether you can make yourself genuinely want to do it.

Think of something you want and try not to want it. Think of something you do not want and try to want it. It is simply not possible through choice alone. We are just born with—or shaped into—many of our wants.

My second point is somewhat different: being human means not being completely free. My personal definition of being free is being able to do what one wishes to do. If I say that I want to fly, would I magically be able to do it? If I say that I want to go back in time, can I do it? If I say that I want this argumentative essay to finish itself, would it suddenly be completed and ready to submit?

The answer to all of these questions is a definite no. If I am unable to do what I wish, does that mean I am not free? In an absolute sense, yes. Being limited is the opposite of being completely free, and humans are limited to what is humanly possible.

If I were a god, perhaps the answers to those ridiculous questions could be yes. But we are not gods. We cannot control space, we cannot control time, and we cannot control countless forces that determine the boundaries of our lives.

For anyone who believes in an omniscient being—a being that knows everything that has happened and everything that will happen—there is another difficulty. In my case, I believe in the God described in the Holy Bible. If God is all-knowing, then God already knows everything that will happen throughout my life and throughout the world's future.

That suggests that our future is already known and inevitable. No matter who we are, we cannot escape what an omniscient being already knows will occur. Once again, we do not appear to be free in the absolute sense.

Lastly, anything that you purposely do in your life is either because you want to do it or because you are forced to do it. Try to think of an activity you performed that was neither wanted nor forced.

An example might be eating vegetables instead of sweets despite hating vegetables and loving candy. Does this prove me wrong? Not really. Why would you eat the vegetables? Perhaps you want to be healthy. Perhaps your parents forced you and you want to obey them. Anything that you intentionally do has some want, pressure, or cause behind it.

This is what ultimately convinced me that humans do not possess free will in the way we commonly imagine it. Anything we do is done because we want to do it or because we are forced to do it.

If we are forced, the action is clearly not free. But we have also established that we do not choose the wants that motivate us. Therefore, actions caused by our wants are not entirely free either.

Being forced to do something is not free will, and wanting to do something is also not necessarily an act of free will because we did not freely choose the want itself. Yet everything we do appears to come from one of these two sources.

Hence, I conclude that free will is an illusion. I use the word “illusion” because we all feel as though we have free will. I think I do. My classmates think they do. Almost everybody else feels the same way. But in the end, none of us may be truly free.

Our lives are governed by causality. We do not control our wants, we are bound by human limitations, and countless causes outside our awareness shape our actions.

“Man can do what he wills, but he cannot will what he wills.” — Arthur Schopenhauer

Our free will may be an illusion. How this statement affects you is seemingly up to you—but perhaps even that reaction will be determined by your environment, mood, past experiences, and the influence of other people.

The world may be a finished book, and we may merely be characters following the script. We were not even the ones who chose the names we would carry in this story. How, then, could we believe that we are fully in control?`,
		coverImage: "/posts/free-will.jpg",
		contentFormat: "plain",
		tags: ["personal", "reflection", "philosophy"],
		createdAt: new Date("2026-07-16T09:00:00+08:00"),
		updatedAt: new Date("2026-07-16T09:00:00+08:00"),
	},
	{
		title: "Old Web Page Designs Are Actually Good",
		slug: "old-web-page-designs-are-actually-good",
		body: `## The old web felt personal

Modern websites are often technically excellent. They are responsive, accessible, consistent, and optimized for conversion. Yet many of them also feel as though they were assembled from the same collection of cards, gradients, rounded buttons, and carefully measured whitespace.

Old personal websites frequently ignored those conventions. They used tiled backgrounds, visible borders, strange typefaces, animated GIFs, tiny badges, guestbooks, and navigation systems that made sense only to their creators.

Those choices were not always usable, but they communicated something important: **a person made this place**.

## Imperfection can become identity

A perfectly consistent interface is easy to understand, but inconsistency can become memorable. A peculiar title graphic, an unnecessary sidebar, or an oddly specific background image can give a website an identity that survives long after a polished template has been forgotten.

That does not mean we should abandon responsive design or accessibility. It means that technical quality and personality do not need to oppose each other.

## What I want to preserve

With Chronicle, I want to borrow the strongest qualities of the old web:

- visible authorship;
- playful experimentation;
- pages that feel like places;
- design decisions that do not exist only to maximize engagement;
- content that is not trapped inside a social-media feed.

The best approach is not to reproduce every limitation of 1999. It is to combine the individuality of the old web with the engineering knowledge we have now.

A website can be responsive, semantic, and accessible while still being strange, personal, and unmistakably its creator's own.`,
		coverImage: null,
		contentFormat: "markdown",
		tags: ["technology", "design", "reflection"],
		createdAt: new Date("2026-07-14T09:00:00+08:00"),
		updatedAt: new Date("2026-07-14T09:00:00+08:00"),
	},
	{
		title: "Nixie Tubes Are 1000x Cooler Than 7-Segment Displays",
		slug: "nixie-tubes-are-cooler-than-seven-segment-displays",
		body: `## A number should not look this interesting

A seven-segment display performs its job extremely well. It is inexpensive, efficient, durable, easy to control, and readable from a distance. If the only objective is to display a number, it is the rational choice.

A Nixie tube is almost the opposite.

Inside each glass tube is a stack of individually shaped metal cathodes, one for every numeral. When high voltage is applied to a selected cathode, the surrounding gas produces an orange glow around the shape of that number.

The digit is not simulated using a grid. The numeral itself physically exists inside the tube.

## Why the impractical option wins

Nixie tubes require specialized power circuitry. They generate heat, consume more power, are no longer manufactured at the scale they once were, and eventually wear out. Replacement tubes can also be expensive.

None of that makes them less fascinating.

Their appeal comes partly from the fact that the technology is visible. You can see the layered numerals behind the glass. When the display changes, the glow appears at a slightly different depth because another cathode in the stack has been activated.

A seven-segment display communicates information. A Nixie tube turns the same information into an event.

## Objects can have emotional value

Calling Nixie tubes “better” would be dishonest if the comparison were purely technical. Seven-segment displays win almost every practical category.

But objects are not valued only by efficiency.

We also value craftsmanship, history, physical presence, and the feeling an object creates when we interact with it. A mechanical watch does not outperform a digital clock at keeping time, yet people still find meaning in its mechanism.

My Nixie clock is unnecessary, inefficient, and far more expensive than an ordinary digital clock. That is precisely why it feels special. It exists not because displaying the time is difficult, but because displaying it beautifully can still matter.`,
		coverImage: null,
		contentFormat: "markdown",
		tags: ["technology", "design", "personal"],
		createdAt: new Date("2026-07-12T09:00:00+08:00"),
		updatedAt: new Date("2026-07-12T09:00:00+08:00"),
	},
	{
		title: "Leisure Purchases Disguised as Investments",
		slug: "leisure-purchases-disguised-as-investments",
		body: `It is easy to call an expensive purchase an investment when the word “investment” makes the decision feel more responsible.

A new computer becomes an investment in productivity. Premium headphones become an investment in focus. A mechanical keyboard becomes an investment in ergonomics. A carefully designed desk setup becomes an investment in long-term health.

Sometimes those statements are true. A tool that saves time, protects health, or directly enables paid work can produce measurable value. But the label can also become a convenient way to avoid admitting a simpler truth: we wanted something because it looked enjoyable.

The distinction matters because an investment is expected to produce a return. That return does not always need to be financial, but it should still be identifiable. Does the purchase save time? Does it reduce pain? Does it enable work that could not otherwise be completed? Does it remain useful long enough to justify its cost?

If the only honest answer is that the object is pleasurable to own, then it is probably a leisure purchase. That is not automatically bad.

The problem is not spending money on enjoyment. The problem is pretending that every desire is a carefully calculated financial decision.

Calling a leisure purchase what it really is creates a healthier question: can I afford this enjoyment without harming my savings, responsibilities, or future plans?

That question is less flattering than “Is this an investment?” but it is usually more useful.

A purchase can also contain both elements. A good chair may reduce discomfort while also making a workspace look better. A powerful computer may support paid work while also being enjoyable to use. The categories are not always absolute.

The goal is not to feel guilty about buying things. It is to avoid using the language of investing as permission to ignore opportunity cost.

Sometimes the most financially responsible sentence is simply: “This will not make me money. I just like it, and I have decided that the enjoyment is worth the price.”`,
		coverImage: null,
		contentFormat: "plain",
		tags: ["personal", "reflection", "finance"],
		createdAt: new Date("2026-07-10T09:00:00+08:00"),
		updatedAt: new Date("2026-07-10T09:00:00+08:00"),
	},
	{
		title: "My Experience With the Ferris Sweep",
		slug: "my-experience-with-the-ferris-sweep",
		body: `## Why I tried a 34-key keyboard

The Ferris Sweep looks incomplete when compared with a conventional keyboard. It has only thirty-four keys, no number row, no dedicated arrow cluster, and no function keys. Even symbols that are normally available with a single press must be accessed through layers.

At first, this sounds like needless inconvenience.

The idea, however, is that every key should remain close to the fingers' resting positions. Instead of moving an entire hand toward a distant key, the user holds a layer key and presses something already within reach.

## The adjustment period

The beginning was slow.

Characters that had been automatic for years suddenly required conscious thought. Numbers, brackets, punctuation, navigation, and keyboard shortcuts all had to be relearned through a new layout.

The most difficult part was not memorizing where keys were located. It was resisting the instinct to reach for positions that no longer existed.

Progress came through repetition rather than insight. Each successful use of a layer made the next attempt slightly more automatic.

## What became better

The split layout allows each half to follow the natural position of the hands. My shoulders do not need to rotate inward as much as they do on a standard keyboard.

The reduced key count also means less finger travel. Backspace, Enter, navigation, numbers, and symbols can all be brought underneath the fingers through thumb keys and layers.

Once the layout became familiar, the keyboard stopped feeling small. A normal keyboard began to feel unnecessarily large.

## What remains inconvenient

A compact layout is not automatically superior for every task.

Unfamiliar software shortcuts can be harder to discover. Gaming may require a separate layer or another keyboard. Other people cannot easily use the computer without learning the layout. Switching between the Ferris Sweep and a conventional keyboard can also create momentary confusion.

The keyboard rewards customization, but that means the user must decide how every layer should behave. A bad layout can make thirty-four keys feel restrictive; a thoughtful one can make them feel sufficient.

## My conclusion

The Ferris Sweep did not instantly make me type faster, and it is not a universal productivity upgrade. Its greatest benefit is that it encouraged me to design the keyboard around my hands rather than forcing my hands to adapt to a standard layout.

It requires patience, experimentation, and a willingness to become temporarily worse at typing. For me, that learning period was worth it.`,
		coverImage: null,
		contentFormat: "markdown",
		tags: ["technology", "personal", "design"],
		createdAt: new Date("2026-07-08T09:00:00+08:00"),
		updatedAt: new Date("2026-07-08T09:00:00+08:00"),
	},
];

async function seedDatabase() {
	console.log("Seeding posts...");

	for (const post of seedPosts) {
		await db
			.insert(posts)
			.values(post)
			.onConflictDoUpdate({
				target: posts.slug,
				set: {
					title: post.title,
					body: post.body,
					coverImage: post.coverImage,
					contentFormat: post.contentFormat,
					tags: post.tags,
					updatedAt: new Date(),
				},
			});

		console.log(`Seeded: ${post.title}`);
	}

	console.log(`Finished seeding ${seedPosts.length} posts.`);
}

seedDatabase().catch((error: unknown) => {
	console.error("Database seeding failed:", error);
	process.exitCode = 1;
});
