/**
 * Release helper — bumps version, generates changelog from conventional commits,
 * and creates a Git tag. Run: bun scripts/release.ts <major|minor|patch>
 *
 * Reads the current version from the root package.json, bumps it according to the
 * specified level, writes the changelog entry, commits, and tags.
 *
 * The actual npm publish and GitHub release creation are handled by the existing
 * publish.yml and release.yml workflows, which trigger on tag push.
 */

import { $ } from "bun";
import { readFileSync, writeFileSync } from "node:fs";

const level = Bun.argv[2];
if (!level || !["major", "minor", "patch"].includes(level)) {
  console.error("Usage: bun scripts/release.ts <major|minor|patch>");
  process.exit(1);
}

const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
const [major, minor, patch] = pkg.version.split(".").map(Number);

const next = {
  major: `${major + 1}.0.0`,
  minor: `${major}.${minor + 1}.0`,
  patch: `${major}.${minor}.${patch + 1}`,
}[level];

const date = new Date().toISOString().slice(0, 10);

const tags = await $`git tag --sort=-creatordate`.text();
const lastTag = tags.split("\n")[0]?.trim();
const range = lastTag ? `${lastTag}..HEAD` : "HEAD";

const log = await $`git log ${range} --pretty=format:"%s"`.text();
const commits = log
  .split("\n")
  .filter(Boolean)
  .filter((c) => !c.startsWith("Merge"));

function categorize(prefix: string): string[] {
  return commits
    .filter((c) => c.startsWith(prefix))
    .map((c) => `- ${c.slice(prefix.length).trim()}`);
}

const sections: Record<string, string[]> = {
  Added: categorize("feat:"),
  Fixed: categorize("fix:"),
  Changed: categorize("refactor:"),
};
const other = [
  ...categorize("chore:"),
  ...categorize("docs:"),
  ...categorize("test:"),
];

const entry = [
  `## ${next} (${date})`,
  "",
  ...Object.entries(sections)
    .filter(([, items]) => items.length > 0)
    .flatMap(([label, items]) => [`### ${label}`, "", ...items, ""]),
  ...(other.length > 0 ? [`### Other`, "", ...other, ""] : []),
].join("\n");

const changelog = readFileSync("CHANGELOG.md", "utf-8");
const insertionPoint = changelog.indexOf("## ");
const newChangelog =
  insertionPoint >= 0
    ? changelog.slice(0, insertionPoint) + entry + "\n" + changelog.slice(insertionPoint)
    : changelog + "\n" + entry;

writeFileSync("CHANGELOG.md", newChangelog);

pkg.version = next;
writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");

const tag = `v${next}`;
await $`git add package.json CHANGELOG.md`;
await $`git commit -m "chore: release ${tag}"`;
await $`git tag ${tag}`;

console.log(`\nReleased ${tag}. Push with:`);
console.log(`  git push origin main --tags`);
console.log(`\nPublish and GitHub release workflows will trigger on tag push.`);
