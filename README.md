# 🤖 Local Agent Mesh: Offline Multi-Agent Orchestrator

An asynchronous multi-agent coordination system operating **100% locally** using Ollama. It bypasses cloud subscription models by distributing complex engineering sub-tasks across a custom network of localized open-source language models (`llama3`, `mistral`, `codegemma`).

## 🧱 Mesh Core Engine Topology
1.  **Project Manager (`llama3`):** Strips raw objectives down to atomic functional software technical specs.
2.  **Software Engineer (`mistral`):** Converts the structured specs into modular, optimized code blocks.
3.  **QA Reviewer (`codegemma`):** Evaluates vulnerabilities, memory management, and validates edge requirements.

## 🚀 Execution Guide
Ensure you have [Ollama](https://ollama.com) running on port `11434` with the models pulled:
```bash
ollama pull llama3
ollama pull mistral
ollama pull codegemma
```

### Installation & Launch
```bash
npm install
npm start "Build a secure Express.js microservice handling JWT extraction and internal rate-limiting."
```
