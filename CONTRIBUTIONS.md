[Contributions template used](https://github.com/nayafia/contributing-template/blob/master/CONTRIBUTING-template.md)

## Introduction

Thanks you for considering working on my project, I really appreciate it!

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

## What kinds of contributions we're looking for.

Improving documentation, bug triaging, or writing tutorials are all examples of helpful contributions. Modifications to front end may be appropriate, but remember the context of the project, and feel free to reachout to me beforehand before you spend too much time potentially writing something that may not be applicable.

## What kinds of contributions we're NOT looking for.

We're working towards a MVP at this stage, and hence, complex code for the sake of contributions is detrimental to the end goal. Your goal if contributing, is to prioritise simplicity, especially with the context of the project. Overly complex and fancy looking UI might look good to you and I, but remember who this system is designed for, as it may impact the performance of various screen-readers if we have fancy front-end components.

## Developer Expectations

Be considerate of your fellow developers. If you have decided to work on something, create an issue, so that other developers can see what parts of the project are 'claimed' so to speak. Similarly, before you create an issue, confirm that it is, in fact, not being worked on already.

Obviously, you can message eachother outside of the bounds of this repository, the above paragraph is more in reference to online developers who would be contributing to an opensource project.

## Your First Contribution

A great way to get started is by improving or adding documentation. This helps you understand how the project works while also supporting other contributors. Don’t add documentation just for the sake of it—focus on clarity, accuracy, and usefulness. If you're unsure whether something is worth documenting, feel free to check with me first.

Here are some meaningful examples of first contributions:

### Helpful Documentation Contributions

Clarifying setup steps
If you ran into confusion when installing or running the project, improving the setup instructions helps everyone.

Example:
Add missing step explaining how to install ffmpeg before running npm run dev.

### Explaining a feature or interaction

If you understand how something works internally, summarise it in clear language so others don’t have to reverse-engineer it.

Example:
A short explanation of how the pause event triggers the OCR processing.

### Improving accessibility notes

This project is accessibility-focused — documenting screen reader behavior or keyboard navigation is very valuable.

Example:
Document how JAWS reads the OCR output container, and how headings / ARIA roles help with clarity.

### Adding code comments (where helpful)

Only when comments explain why something is done, not what the code literally does.

ie `sum = a + b` should not have the comment `#sum is the value of a plus b`, use your intuition, if it is clear what it is doing, then don't comment it.

### What Not to Do

- Don’t rewrite working features without discussion.
- Don’t add long explanations where code is already clear.
- Don’t commit style-only changes (indentation, spacing, renaming variables to your preference).

## Getting Started

Before contributing, please take a moment to:
Read the README — understand the purpose and accessibility goals of the project.
Check the existing GitHub Issues — tasks, bugs, and feature ideas are listed there.
If nothing stands out or you're unsure where to begin, reach out to me directly.
I’m happy to guide you to something that matches your skill level and interests.

Tip: Your very first contribution does not need to be code. Documentation, comments, cleanup, or accessibility improvements are equally valuable.

## Code, commit message and labeling conventions

To keep the codebase consistent and accessible for screen reader users, please follow these conventions:

### Python (Backend)

Follow PEP 8 style guidelines.
Use snake_case for variables and function names.
Use PascalCase for classes.
Keep functions small and purposeful.
Add comments that explain why, not just what.

### React / JavaScript (Frontend)

Use camelCase for variables and functions.
Use PascalCase for React component names.
Prefer function components with hooks.
Keep UI elements and state changes screen-reader friendly (ARIA roles where useful).

### Commit Messages

Keep commit messages clear and descriptive:

`type: short description
More detail if needed.`

#### examples

fix: correct null reference when video is paused early
docs: add explanation of OCR frame processing pipeline
feat: add keyboard shortcut for pause + OCR

### PR Labels (when opening a pull request)

Use labels that describe the nature of your change:
| Label | Use When… |
| --------------- | -------------------------------------------------- |
| `docs` | You changed or added documentation. |
| `fix` | You resolved a bug. |
| `feature` | You added a new feature. |
| `accessibility` | You improved screen reader / UX accessibility. |
| `refactor` | You reorganized code without functionality change. |

will finialise this section by 13/11/2025

## How to suggest a feature or enhancement

If you have an idea that could improve the project, please open a GitHub Issue using the format below.

Before posting:

Make sure the feature aligns with the project’s purpose (accessibility-first learning)

If you’re unsure — just reach out. I’d rather discuss early than have you spend time on something out-of-scope.

## Feature Request Template

### What is the feature?

Explain what you want to add or change.

### Why is this needed?

Describe the problem it solves, especially in terms of accessibility, usability, or student outcomes.

### How do you imagine it working?

Provide a rough example, workflow, or UI idea. It doesn't need to be perfect.

### Additional context (optional)

Screenshots, sketches, similar tools, or references.
