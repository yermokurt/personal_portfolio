# KurtOS

KurtOS is my personal portfolio reimagined as an interactive operating system.

Instead of building another portfolio where you simply scroll through an About section, skills, projects, and contact information, I wanted to create something that feels more like exploring my own digital workspace.

The idea behind KurtOS is simple: if my portfolio is supposed to represent me, why shouldn't the experience itself tell you something about who I am?

## Why I Built It This Way

I've always liked portfolios that have personality.

I didn't want mine to just be a collection of project cards and technology badges. I wanted people to be able to explore it and gradually discover the different things I'm interested in.

I'm a developer, but I'm also interested in design, games, systems, and experimenting with interfaces. KurtOS brings those interests together into one experience.

The interface is inspired by desktop operating systems, particularly macOS, but it isn't meant to be a recreation of macOS. I used the familiar idea of files, applications, windows, a desktop, and a dock as the foundation, then designed my own portfolio experience around it.

That's why it became **KurtOS**.

## A Portfolio You Can Explore

My projects are represented as files instead of traditional portfolio cards.

You can open applications, browse project files, preview deployed websites, inspect the technologies I've used, read about me, view my resume, or just explore the desktop.

Projects such as MotoWatch, TaiSync, and The 1PM Club exist as `.project` files inside the system.

The goal is to make looking through my work feel less like reading a portfolio and more like exploring the computer of the person who built it.

## The Terminal

One of my favorite additions is the KurtOS Terminal.

I've enjoyed working with the command line, especially while using Ubuntu for development and school projects. Even though the visual direction of KurtOS is more inspired by macOS, I still wanted the CLI to be part of it because it represents another side of how I work with computers.

So I built a simulated terminal and filesystem directly into the portfolio.

You can navigate around KurtOS with commands such as:

```bash
ls
cd projects
pwd
cat about/kurt.txt
projects
skills
open motowatch.project
```

And don't forget to try out the command 

```bash
sudo kurtctl restart
```

## Run KurtOS Locally

To run KurtOS on your own machine:

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-repository-folder>
npm install
```

### 2. Start the dev server
npm run dev

### 3. To verify the Production Build
npm run build
npm run start
npm run lint
npx tsc --noEmit

