const nxPreset = require('@nx/jest/preset').default;

// The Nx preset transforms TypeScript with ts-jest. The remaining jest project
// (libs/ui) sets its own babel-jest transforms, and the TypeScript projects run
// on vitest, so ts-jest is not installed and its transform is dropped here.
module.exports = { ...nxPreset, transform: {} };
