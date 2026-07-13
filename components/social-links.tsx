import Image from "next/image";

const socialLinks = [
	{
		href: "https://github.com/your-username",
		label: "GitHub",
		image: "/images/social/github.jpg",
	},
	{
		href: "https://www.linkedin.com/in/your-profile",
		label: "LinkedIn",
		image: "/images/social/linkedin.jpg",
	},
	{
		href: "mailto:your-email@example.com",
		label: "Email",
		image: "/images/social/email.jpg",
	},
] as const;

export function SocialLinks() {
	return (
		<section aria-labelledby="social-links-heading">
			<h2 id="social-links-heading" className="site-heading text-lg">
				Links
			</h2>

			<ul className="mt-3 space-y-3">
				{socialLinks.map((link) => {
					const isEmail = link.href.startsWith("mailto:");

					return (
						<li key={link.label}>
							<a
								href={link.href}
								target={isEmail ? undefined : "_blank"}
								rel={isEmail ? undefined : "noreferrer"}
								className="site-link flex items-center gap-3"
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
		</section>
	);
}
