# aidd-async

Personal plugin marketplace hosting `aidd-async`, an asynchronous-collaboration plugin for Claude Code, built to compose with the [AI-Driven Development framework](https://github.com/ai-driven-dev/framework).

## Install

```
/plugin marketplace add cyrilhouillon/aidd-async
/plugin install aidd-async@aidd-async
```

The repository is private, so the machine adding the marketplace needs git credentials for it (an authenticated `gh` CLI or an SSH key).

## Content

| Plugin | Skill | Purpose |
| ------ | ----- | ------- |
| [aidd-async](plugins/aidd-async/README.md) | [async-brainstorm](plugins/aidd-async/skills/01-async-brainstorm/SKILL.md) | Clarify a vague idea through rounds of GitHub PR comments, one probing round per invocation, the thread carrying the state. |
