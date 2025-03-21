# DiffScope Test Repository

This repository contains carefully crafted test cases for DiffScope, a tool that detects function-level changes in Git commits.

## Purpose

The purpose of this repository is to provide consistent, predictable test cases for verifying DiffScope's function detection capabilities. Each commit demonstrates specific types of function changes that DiffScope should be able to detect.

## Structure

The repository is organized by programming language:

```
test-repo/
├── python/          # Python test cases
├── javascript/      # JavaScript test cases
├── typescript/      # TypeScript test cases
├── java/            # Java test cases
├── c_cpp/           # C and C++ test cases
├── go/              # Go test cases
└── COMMIT_MAP.md    # Documents each commit with its purpose
```

## Test Cases

Each language directory contains files that demonstrate different types of function changes:

1. **Basic Function Changes**
   - Simple function modifications (body changes)
   - Parameter changes (signature changes)
   - Docstring/comment changes

2. **Complex Function Changes**
   - Function renames
   - Function moves between files
   - Nested function changes
   - Anonymous functions and lambdas

3. **Edge Cases**
   - Special language features (decorators, generators, etc.)
   - Large functions with minor changes
   - Whitespace-only changes

## How to Use

This repository is intended to be used as a Git submodule within the DiffScope project. The integration tests in DiffScope reference specific commits in this repository to verify function detection.

To generate a new test case:

1. Make changes to the relevant files
2. Create a commit with a descriptive message
3. Document the commit in `COMMIT_MAP.md`
4. Reference the commit in DiffScope's integration tests

## Commit Map

See `COMMIT_MAP.md` for a detailed map of all test commits and what they demonstrate.