import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { HtmlValidate } from "html-validate";
import * as csstree from "css-tree";

const failures = [];

function fail(message) {
    failures.push(message);
    console.error("FAIL", message);
}

function pass(message) {
    console.log("PASS", message);
}

function sha256(file) {
    return createHash("sha256").update(readFileSync(file)).digest("hex");
}

const hashes = {
    "brand/lockups/signal-horizontal.svg": "85459232bf51e7bf7c94225fd4f2cd6b71a681b6d701cb4ffd6d2a142cf57a81",
    "brand/lockups/signal-stacked.svg": "11314b300284db342bc15a7c7695c23199f65f68178af45586b62d01e9ea133a",
    "source/OFFICIAL_README.md": "ed2991668e5266bc2d3e32ba3b4b8f2106f8af7cb28caa294db1cedd0d2c8393",
    "source/OFFICIAL_README.es.md": "73ccf6105a7496f394f9e131d82ce63ea8172b41c99634f85493267c1caef9e9",
    "source/learn.json": "fd24c7b5b716ca92f13dacdca5f940b618528e71a17efe8a435ea6583ca6c7ae",
    "learn.json": "fd24c7b5b716ca92f13dacdca5f940b618528e71a17efe8a435ea6583ca6c7ae"
};

for (const [file, expected] of Object.entries(hashes)) {
    if (!existsSync(file)) {
        fail(`missing ${file}`);
        continue;
    }
    const actual = sha256(file);
    if (actual !== expected) {
        fail(`${file} sha256 ${actual} != ${expected}`);
    } else {
        pass(`${file} sha256`);
    }
}

if (existsSync("style.css")) {
    fail("style.css must not exist; the exercise asks for styles.css");
} else {
    pass("style.css is absent");
}

const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");

const patterns = [
    [/body\s*{\s*background\s*:\s*black\s*;\s*}/, "body background black"],
    [/\.postcard\s*{[^}]*background\s*:\s*white\s*;/, ".postcard background white"],
    [/\.postcard\s*{[^}]*width\s*:\s*400px\s*;/, ".postcard width 400px"],
    [/\.postcard\s*{[^}]*height\s*:\s*300px\s*;/, ".postcard height 300px"],
    [/\.postcard\s*{[^}]*margin\s*:\s*auto\s*;/, ".postcard margin auto"],
    [/\.postcard-header\s*{[^}]*display\s*:\s*flex\s*;/, ".postcard-header display flex"],
    [/\.postcard-body\s*{[^}]*display\s*:\s*flex\s*;/, ".postcard-body display flex"],
    [/\.body-left\s+p:first-child\s*{[^}]*margin-top\s*:\s*0\s*;/, "first paragraph margin-top 0"],
    [/input\s*{[^}]*border\s*:\s*none\s*;/, "input border none"],
    [/input\s*{[^}]*border-bottom\s*:\s*1px\s+solid\s+grey\s*;/, "input border-bottom grey"],
    [/\.postcard-footer\s*{[^}]*text-align\s*:\s*center\s*;/, "footer text-align center"],
    [/overflow\s*:\s*hidden\s*;/, "overflow hidden"]
];

for (const [pattern, label] of patterns) {
    if (pattern.test(css)) pass(label);
    else fail(`CSS missing ${label}`);
}

if (/\*\s*{\s*border\s*:\s*1px\s*dashed\s*red/.test(css)) {
    fail("debug red borders are still present");
} else {
    pass("debug red borders removed");
}

try {
    csstree.parse(css);
    pass("CSS parses");
} catch (error) {
    fail(`CSS parse error: ${error.message}`);
}

const texts = [
    "My Postcard",
    "Look how awesome! This is a postcard that I created using HTML5 and CSS3 during my 4Geeks Academy Course!",
    "This is so cool, can't wait to start doing more stuff!",
    'placeholder="Some Name"',
    'placeholder="Some Email"',
    'placeholder="Some comment"',
    "Send My Postcard",
    "https://raw.githubusercontent.com/breatheco-de/exercise-postcard/e63a7916530cc850bd92aa1c2e19191837fb5c80/.learn/assets/4geeks.png",
    'href="styles.css"',
    "fonts.googleapis.com",
    'class="postcard-header"',
    'class="postcard-body"',
    'class="postcard-footer"',
    'class="body-left"',
    'class="body-right"',
    "<form",
    'lang="en"'
];

for (const text of texts) {
    if (html.includes(text)) pass(`html contains ${text.slice(0, 48)}`);
    else fail(`html missing ${text}`);
}

if (!html.trimEnd().endsWith("</html>")) {
    fail("</html> is not the end of index.html");
} else {
    pass("</html> ends the document");
}

const htmlvalidate = new HtmlValidate({
    extends: ["html-validate:recommended"],
    rules: {
        "doctype-style": "off",
        "tel-non-breaking": "off"
    }
});
const report = await htmlvalidate.validateString(html, "index.html");
if (!report.valid) {
    for (const result of report.results) {
        for (const message of result.messages) {
            fail(`HTML ${message.ruleId} line ${message.line}: ${message.message}`);
        }
    }
} else {
    pass("html-validate recommended");
}

function channel(hex) {
    const value = parseInt(hex, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
    const raw = hex.replace("#", "");
    const r = channel(raw.slice(0, 2));
    const g = channel(raw.slice(2, 4));
    const b = channel(raw.slice(4, 6));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground, background) {
    const lighter = Math.max(luminance(foreground), luminance(background));
    const darker = Math.min(luminance(foreground), luminance(background));
    return (lighter + 0.05) / (darker + 0.05);
}

const pairs = [
    ["postcard text", "#111111", "#FFFFFF", 4.5],
    ["placeholder", "#767676", "#FFFFFF", 4.5],
    ["button label", "#141414", "#BEBEBE", 4.5],
    ["button hover", "#141414", "#A3A3A3", 4.5],
    ["button active", "#141414", "#8D8D8D", 4.5],
    ["footer note", "#505E70", "#F7F8FA", 4.5],
    ["skip link", "#FFFFFF", "#B53A17", 4.5],
    ["error text", "#A32A26", "#FFFFFF", 4.5],
    ["success text", "#236344", "#FFFFFF", 4.5],
    ["focus on white", "#164DCC", "#FFFFFF", 3],
    ["focus on button", "#164DCC", "#BEBEBE", 3]
];

for (const [name, foreground, background, minimum] of pairs) {
    const ratio = contrast(foreground, background);
    if (ratio < minimum) fail(`${name} contrast ${ratio.toFixed(2)} < ${minimum}`);
    else pass(`${name} contrast ${ratio.toFixed(2)}`);
}

const tokens = JSON.parse(readFileSync("tokens/tokens.json", "utf8"));
let tokensOk = true;
for (const [name, value] of Object.entries(tokens.color)) {
    if (!css.includes(value)) {
        tokensOk = false;
        fail(`token color ${name} (${value}) missing from styles.css`);
    }
}
if (tokensOk) pass("SIGNAL color tokens present in styles.css");

if (failures.length) {
    console.error(`\n${failures.length} failure(s)`);
    process.exit(1);
}

console.log("\nvalidate.mjs OK");
