import fs from 'fs';
import chalk from 'chalk';

const OLLAMA_API = 'http://localhost:11434/api/generate';
const SYSTEM_PROMPTS = JSON.parse(fs.readFileSync('./prompts.json', 'utf8'));

async function callAgent(model, systemPrompt, userContext) {
  try {
    const response = await fetch(OLLAMA_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        prompt: `${systemPrompt}\n\nInput Context:\n${userContext}`,
        stream: false,
        options: { temperature: 0.2, num_predict: 1024 }
      })
    });
    const data = await response.json();
    return data.response.trim();
  } catch (err) {
    console.error(chalk.red(`[Error communicating with model ${model}]:`), err.message);
    process.exit(1);
  }
}

async function orchestrateMesh(taskDescription) {
  console.log(chalk.blue.bold('\n🚀 Initializing Local Agent Mesh Pipeline...'));
  
  // Phase 1: Management Specification
  console.log(chalk.yellow('\n[1/3] 👔 Tasking Project Manager Agent (llama3)...'));
  const specs = await callAgent('llama3', SYSTEM_PROMPTS.manager, taskDescription);
  console.log(chalk.gray(specs));

  // Phase 2: Autonomous Generation
  console.log(chalk.cyan('\n[2/3] 💻 Dispatching Developer Agent (mistral)...'));
  const codeSolution = await callAgent('mistral', SYSTEM_PROMPTS.coder, specs);
  console.log(chalk.green(codeSolution));

  // Phase 3: Quality Control Gate
  console.log(chalk.magenta('\n[3/3] 🛡️ Invoking QA Reviewer Agent (codegemma)...'));
  const reviewResult = await callAgent('codegemma', SYSTEM_PROMPTS.reviewer, `Specs:\n${specs}\n\nGenerated Code:\n${codeSolution}`);
  console.log(chalk.italic(reviewResult));

  console.log(chalk.green.bold('\n✨ Pipeline completed successfully. Check output iterations above.'));
}

const targetTask = process.argv[2] || "Create a robust fast-fourier-transform utility script in Python with telemetry logs.";
orchestrateMesh(targetTask);
