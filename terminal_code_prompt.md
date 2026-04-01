# Terminal Loading Screen Prompt

**Prompt to recreate the terminal loading screen:**
"Create a terminal-style intro sequence for a portfolio website. It should have a Mac-style terminal window UI (with red/yellow/green close buttons) and write out system booting messages one line at a time to simulate loading. Include a blinking cursor at the end. After typing is finished, the rest of the hero content should fade in smoothly."

## Reference HTML
```html
<div class="terminal-card terminal reveal">
  <div class="terminal-topbar">
    <div class="terminal-dots" aria-hidden="true">
      <span class="dot dot-close"></span>
      <span class="dot dot-minimize"></span>
      <span class="dot dot-maximize"></span>
    </div>
    <div class="terminal-title">bash - portfolio</div>
  </div>
  <div class="terminal-body" aria-live="polite" aria-label="Terminal introduction">
    <div id="terminal-output" class="terminal-output"></div>
    <div class="terminal-line terminal-cursor-wrap">
      <span class="terminal-prompt">&gt;</span>
      <span id="terminal-cursor" class="terminal-cursor" aria-hidden="true"></span>
    </div>
  </div>
</div>
```

## Reference JavaScript
```javascript
const terminalOutput = document.getElementById("terminal-output");
const introLines = [
  "booting system...",
  "loading Mohit.exe...",
  "initializing components: [████████████████████]",
  "status: ready",
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createLine = (text) => {
  const row = document.createElement("div");
  row.className = "typed-line";
  const prompt = document.createElement("span");
  prompt.className = "line-label";
  prompt.textContent = "> ";
  const content = document.createElement("span");
  content.className = "line-text";
  row.append(prompt, content);
  terminalOutput.appendChild(row);
  return typeText(content, text);
};

const typeText = async (node, text) => {
  node.textContent = "";
  for (let index = 0; index < text.length; index += 1) {
    node.textContent += text[index];
    await wait(28); // typing speed
  }
};

const runIntro = async () => {
  for (const line of introLines) {
    await createLine(line);
    await wait(220); // pause between lines
  }
};
runIntro();
```
