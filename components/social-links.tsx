import Image from "next/image";

const socialLinks = [
	{
		href: "https://github.com/KuriGohan1992",
		label: "GitHub",
		image: "/socials/old-github.png",
	},
	{
		href: "https://www.linkedin.com/in/cham-mendez/",
		label: "LinkedIn",
		image: "/socials/old-linkedin.png",
	},
	{
		href: "mailto:chammendez92905@gmail.com",
		label: "Email",
		image: "/socials/old-mail.png",
	},
] as const;

export function SocialLinks() {
	return (
		<ul className="space-y-2">
			{socialLinks.map((link) => {
				const isEmail = link.href.startsWith("mailto:");

				return (
					<li key={link.label}>
						<a
							href={link.href}
							target={isEmail ? undefined : "_blank"}
							rel={isEmail ? undefined : "noreferrer"}
							className="site-link flex items-center gap-2"
						>
							<Image
								src={link.image}
								alt=""
								width={32}
								height={32}
								className="size-8 object-contain"
							/>

							<span>{link.label}</span>
						</a>
					</li>
				);
			})}
		</ul>
	);
}
