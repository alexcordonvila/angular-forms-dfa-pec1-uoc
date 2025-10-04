const fs = require("fs");
const path = require("path");

function getVersion(pkg) {
  try {
    const packageJsonPath = require.resolve(`${pkg}/package.json`, {
      paths: [process.cwd()],
    });
    const version = require(packageJsonPath).version;
    return version || "No version found";
  } catch (err) {
    return "Not installed";
  }
}

const packages = [
  "@angular/core",
  "@angular/cli",
  "typescript",
  "@types/node",
  "rxjs",
  "zone.js"
];

console.log("📦 Angular project dependencies:\n");
packages.forEach(pkg => {
  console.log(`${pkg.padEnd(15)} -> ${getVersion(pkg)}`);
});
