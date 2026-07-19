# Atomic Design

This document explains the methodology behind the component library. It is based
on Brad Frost's original article,
[_Atomic Design_](https://bradfrost.com/blog/post/atomic-web-design/), mapped
onto how this boilerplate is actually organised.

> We're not designing pages, we're designing systems of components. —
> [Stephen Hay](https://bradfrost.com/blog/mobile/bdconf-stephen-hay-presents-responsive-design-workflow/)

As the craft of web design evolves, we recognise the need to develop thoughtful
**design systems** rather than creating simple collections of web pages. A lot
of work in this area focuses on foundations for color, typography, grids, and
texture — important, but ultimately subjective. What matters more is _what our
interfaces are comprised of_ and how we can construct design systems in a more
methodical way.

The inspiration comes from chemistry: all matter is comprised of atoms. Those
atomic units bond together to form molecules, which in turn combine into more
complex organisms — ultimately creating all matter in our universe. Interfaces
work the same way. Break entire interfaces down into fundamental building blocks
and work up from there.

## The five levels

Atomic design is a methodology for creating design systems with five distinct
levels:

1. [Atoms](#atoms)
2. [Molecules](#molecules)
3. [Organisms](#organisms)
4. [Templates](#templates)
5. [Pages](#pages)

```txt
ATOMS -> MOLECULES -> ORGANISMS -> TEMPLATES -> PAGES
```

Each level lives in its own directory in `src/components/`:

```txt
src/
├── atoms/        # 256 components (16 domains × 16)
├── molecules/    # 256 components (16 domains × 16)
├── organisms/    # 256 components (16 domains × 16)
└── templates/    # 257 page-level layouts (16 domains + shared/)
```

## Atoms

Atoms are the basic building blocks of matter. Applied to web interfaces, atoms
are our HTML tags — a form label, an input, or a button. Atoms can also include
more abstract elements like color palettes, fonts, and even invisible aspects of
an interface like animations.

Like atoms in nature they are fairly abstract and often not terribly useful on
their own. However, they are good as a reference in the context of a pattern
library, because you can see all your global styles laid out at a glance.

In this project atoms are **small, presentational, dependency-free building
blocks** in `src/components/atoms/`. Examples:

- `Button`, `Badge`, `Tag`, `Avatar` — visual primitives
- `TextField`, `Checkbox`, `Radio`, `Select` — form primitives
- `Spinner`, `Skeleton`, `Progress`, `ProgressRing` — feedback primitives
- `Icon`, `Kbd`, `Separator`, `Divider` — decorative primitives

They stay independent of business logic so they can be combined freely.

## Molecules

Things start getting more interesting and tangible when we start combining
atoms. **Molecules are groups of atoms bonded together** and are the smallest
fundamental units of a compound. These molecules take on their own properties
and serve as the backbone of our design systems.

For example, a form label, input, or button aren't too useful by themselves, but
combine them together as a form and now they can actually do something together.

Building up to molecules from atoms encourages a _"do one thing and do it well"_
mentality. While molecules can be complex, as a rule of thumb they are
relatively simple combinations of atoms built for reuse.

In this project molecules are **combinations of atoms** in
`src/components/molecules/`. Examples of molecules composed from atoms:

- `SearchBar` — composed of `TextField` + `IconButton`
- `TagInput` — composed of `TextField` + `Tag`
- `RadioGroup` — wraps the `Radio` atom into a controlled group
- `CheckboxGroup` — wraps the `Checkbox` atom into a controlled group
- `FormRow` — composes a `label` + input + hint into one row

## Organisms

Molecules give us building blocks to work with, and we can now combine them to
form **organisms** — groups of molecules joined together to form a relatively
complex, distinct section of an interface.

This is where things get increasingly concrete. A client might not be terribly
interested in the molecules of a design system, but with organisms we can see
the final interface beginning to take shape. Dan Mall uses _element collages_,
which articulate ideas for a few key organisms to facilitate client
conversations and shape the visual direction (all without having to construct
full comps).

Organisms can consist of similar and/or different molecule types. A masthead
organism might consist of diverse components like a logo, primary navigation,
search form, and a list of social media channels — while a "product grid"
organism might consist of the same molecule repeated over and over again.

Building up from molecules to organisms encourages creating standalone,
portable, reusable components.

In this project organisms are **complex UI sections** in
`src/components/organisms/`. Examples that compose molecules and atoms:

- `AuthForm` — composes `TextField` + `PasswordField` + `Button`
- `FAQSection` — wraps the `Accordion` molecule
- `ChatWindow` — wraps the `ChatBubble` molecule
- `StatsGrid` — wraps the `Stat` molecule
- `ProfileCard` — wraps the `Avatar` atom
- `CommandMenu` — keyboard-navigable palette of commands

## Templates

At the template stage, we break the chemistry analogy to get into language that
makes more sense to our clients and our final output. **Templates consist mostly
of groups of organisms stitched together to form pages.** It's here where we
start to see the design coming together and start seeing things like layout in
action.

Templates are very concrete and provide context to all these relatively abstract
molecules and organisms. In this methodology templates begin their life as
wireframes, but over time increase fidelity to ultimately become the final
deliverable.

In this project templates are **page-level layout shells** in
`src/components/templates/`, grouped by domain (`shared`, `app`, `auth`, `blog`,
`store`, `landing`, and more). A template arranges organisms into a layout — for
example the workspace shell uses a sticky header, a sidebar, and a `main`
content area, while a landing template combines `Hero`, `FeatureGrid`,
`TestimonialSection`, `CTASection`, and `Footer`.

## Pages

**Pages are specific instances of templates.** Here, placeholder content is
replaced with real representative content to give an accurate depiction of what
a user will ultimately see.

Pages are the highest level of fidelity and because they are the most tangible,
they are typically where most people in the process spend most of their time,
and where most reviews revolve.

The page stage is essential because it is where we test the effectiveness of the
design system. Viewing everything in context allows us to loop back and modify
our molecules, organisms, and templates to better address the real context of
the design.

Pages are also the place to test variations in templates. What does a headline
of 40 characters look like versus one of 340 characters? What does a shopping
cart look like with one item versus ten items with a discount code applied?
These specific instances influence how we loop back through and construct our
system.

In this project each page is a **thin `'use client'` wrapper** that renders a
template, one per route in `src/app/`. See [PAGES.md](PAGES.md) for the route
table and [TEMPLATES.md](TEMPLATES.md) for the template catalogue.

## Why atomic design

In a lot of ways, this is how we have been doing things all along — even if not
always consciously.

- **Clear methodology** — a concrete process for crafting design systems;
  clients and team members can appreciate the concept of design systems by
  actually seeing the steps laid out in front of them.
- **Abstract to concrete** — we can create systems that promote consistency and
  scalability while simultaneously showing things in their final context.
- **Assembling rather than deconstructing** — we craft a system right out of the
  gate instead of cherry-picking patterns after the fact.

## How the boilerplate enforces it

- Each level has a dedicated folder and a barrel `index.ts` export.
- Tests are colocated per component and gated at 90% coverage (Jest), so every
  level is exercised in isolation and in combination.
- The component demo (`Atomic` on the home page → `AtomsLevel` /
  `MoleculesLevel` / `OrganismsLevel`) renders every atom, molecule, and
  organism with interactive state, making the abstract-to-concrete progression
  visible in one place.
- [CONVENTIONS.md](CONVENTIONS.md) and [ADDING.md](ADDING.md) codify how new
  pieces are added at each level.

## Further reading

- [Atomic Design — Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)
- [Atomic Design book — Brad Frost](http://atomicdesign.bradfrost.com/)
- [Pattern Lab](http://patternlab.io/) — the tool built to create atomic design
  systems
- [Rif element collages — Dan Mall](https://v3.danmall.com/articles/rif-element-collages/)
