# Commit Map for DiffScope Test Repository

This document maps test commits to their intended test cases. Each commit is designed to demonstrate specific function change detection capabilities.

## Initial Commits

| Commit Description | SHA (to be filled) | Test Case Type | Languages | Files |
|-------------------|-------------------|---------------|-----------|-------|
| Initial setup with basic functions | TBD | Baseline | Python, JavaScript | python/basic_functions.py, javascript/basic_functions.js |

## Function Body Change Tests

| Commit Description | SHA (to be filled) | Test Case Type | Languages | Files |
|-------------------|-------------------|---------------|-----------|-------|
| Simple function body changes | TBD | Body changes | Python, JavaScript | python/basic_functions.py, javascript/basic_functions.js |
| Complex function body changes | TBD | Body changes | Python, JavaScript | python/complex_functions.py, javascript/complex_functions.js |
| Whitespace-only changes | TBD | Body changes | Python, JavaScript | python/whitespace_changes.py, javascript/whitespace_changes.js |

## Function Signature Change Tests

| Commit Description | SHA (to be filled) | Test Case Type | Languages | Files |
|-------------------|-------------------|---------------|-----------|-------|
| Parameter additions | TBD | Signature changes | Python, JavaScript | python/signature_changes.py, javascript/signature_changes.js |
| Parameter removals | TBD | Signature changes | Python, JavaScript | python/signature_changes.py, javascript/signature_changes.js |
| Parameter renames | TBD | Signature changes | Python, JavaScript | python/signature_changes.py, javascript/signature_changes.js |
| Default parameter changes | TBD | Signature changes | Python, JavaScript | python/signature_changes.py, javascript/signature_changes.js |

## Function Docstring/Comment Change Tests

| Commit Description | SHA (to be filled) | Test Case Type | Languages | Files |
|-------------------|-------------------|---------------|-----------|-------|
| Docstring changes | TBD | Docstring changes | Python | python/docstring_changes.py |
| Comment changes | TBD | Docstring changes | JavaScript | javascript/comment_changes.js |

## Function Rename Tests

| Commit Description | SHA (to be filled) | Test Case Type | Languages | Files |
|-------------------|-------------------|---------------|-----------|-------|
| Simple function renames | TBD | Renamed functions | Python, JavaScript | python/renamed_functions.py, javascript/renamed_functions.js |
| Function renames with minor body changes | TBD | Renamed functions | Python, JavaScript | python/renamed_functions.py, javascript/renamed_functions.js |
| Function renames with signature changes | TBD | Renamed functions | Python, JavaScript | python/renamed_functions.py, javascript/renamed_functions.js |

## Edge Case Tests

| Commit Description | SHA (to be filled) | Test Case Type | Languages | Files |
|-------------------|-------------------|---------------|-----------|-------|
| Anonymous functions and lambdas | TBD | Edge cases | Python, JavaScript | python/edge_cases.py, javascript/edge_cases.js |
| Nested functions | TBD | Edge cases | Python, JavaScript | python/nested_functions.py, javascript/nested_functions.js |
| Language-specific features (decorators, etc.) | TBD | Edge cases | Python, JavaScript | python/language_features.py, javascript/language_features.js |

## How to Add a New Test Case

1. Make changes to the relevant files
2. Commit the changes with a descriptive commit message
3. Add the commit details to this document
4. Update the integration tests in DiffScope to reference this commit 