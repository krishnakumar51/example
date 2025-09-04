import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// WebScraper AI Custom Colors
				'scraper-bg': {
					primary: 'hsl(var(--scraper-bg-primary))',
					secondary: 'hsl(var(--scraper-bg-secondary))',
					card: 'hsl(var(--scraper-bg-card))',
					'card-hover': 'hsl(var(--scraper-bg-card-hover))',
				},
				'scraper-text': {
					primary: 'hsl(var(--scraper-text-primary))',
					secondary: 'hsl(var(--scraper-text-secondary))',
					muted: 'hsl(var(--scraper-text-muted))',
				},
				'scraper-accent': {
					primary: 'hsl(var(--scraper-accent-primary))',
					secondary: 'hsl(var(--scraper-accent-secondary))',
					success: 'hsl(var(--scraper-accent-success))',
					warning: 'hsl(var(--scraper-accent-warning))',
				},
				'scraper-border': {
					DEFAULT: 'hsl(var(--scraper-border))',
					hover: 'hsl(var(--scraper-border-hover))',
				},
				'scraper-input': 'hsl(var(--scraper-input-bg))',
			},
			backgroundImage: {
				'scraper-gradient-primary': 'var(--scraper-gradient-primary)',
				'scraper-gradient-card': 'var(--scraper-gradient-card)',
				'scraper-gradient-glow': 'var(--scraper-gradient-glow)',
			},
			boxShadow: {
				'scraper-sm': 'var(--scraper-shadow-sm)',
				'scraper-md': 'var(--scraper-shadow-md)',
				'scraper-lg': 'var(--scraper-shadow-lg)',
				'scraper-glow': 'var(--scraper-shadow-glow)',
			},
			transitionProperty: {
				'scraper': 'var(--scraper-transition)',
				'scraper-fast': 'var(--scraper-transition-fast)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
