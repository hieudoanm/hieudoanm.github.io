package io.github.hieudoanm.landify

/** The canonical valid document, mirroring the Go original's `validDoc`. */
val VALID_DOC: String = """
site:
  name: Landify
  mark: "🌄"
  description: A landing page.
  nav:
    - label: Features
      href: "#features"
hero:
  badge: "🚀 New"
  headline: Your headline goes here.
  subheadline: Describe what you offer.
  primary:
    label: Get started
    href: "#cta"
  secondary:
    label: Learn more
    href: "#demo"
  image:
    src: "assets/hero.png"
    alt: Product image or screenshot
features:
  heading: Features
  items:
    - icon: "⚡"
      title: Zero build step
      body: Open index.html anywhere.
demo:
  heading: Demo
  video:
    src: "assets/demo.mp4"
    poster: "assets/demo.jpg"
cta:
  icon: "🪄"
  heading: Make your mark.
  body: Go live today.
  button:
    label: Get the template
    href: https://example.com
footer:
  copyright: "© 2026 Landify"
  links:
    - label: Features
      href: "#features"
""".trimIndent() + "\n"
