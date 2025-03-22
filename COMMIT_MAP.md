# Commit Map for DiffScope Test Repository

This document maps test commits to their intended test cases. Each commit is designed to demonstrate specific function change detection capabilities.

## Initial Commits

| Commit Description | SHA (to be filled) | Test Case Type | Languages | Files |
|-------------------|-------------------|---------------|-----------|-------|
| Initial setup with basic functions | 2fd3a0971b52ee66d0adcf3109f33e8471dcc365 | Baseline | Python, JavaScript | python/basic_functions.py, javascript/basic_functions.js |

## File-Level Change Tests

| Commit Description | SHA (to be filled) | Test Case Type | Languages | Files |
|-------------------|-------------------|---------------|-----------|-------|
| File additions | 558cc160009d86d7c177fd38ed58e46ffc5061b5 | File-level changes | Python, JavaScript | python/util_functions.py, javascript/util_functions.js |
| File removals | 4f02b1f4e2ea2a60c6985d6e96e09456f0bbaac5 | File-level changes | Python, JavaScript | python/to_be_removed.py, javascript/to_be_removed.js |
| File renames | e7c362c043dd51a0cb5f8ccfdc19a5c6006c735f | File-level changes | Python, JavaScript | python/old_name.py → python/new_name.py, javascript/old_name.js → javascript/new_name.js |

## Function Body Change Tests

| Commit Description | SHA (to be filled) | Test Case Type | Languages | Files |
|-------------------|-------------------|---------------|-----------|-------|
| Simple function body changes | abe36dca02ef139cfb420ae3b4f1832aad3180fb | Body changes | Python, JavaScript | python/basic_functions.py, javascript/basic_functions.js |
| Complex function body changes | ec126041b29733d929677a0dd2a7ac2d946deca0 | Body changes | Python, JavaScript | python/complex_functions.py, javascript/complex_functions.js |
| Whitespace-only changes | bff6fe821ffa0ef1aa20d0ddf19ba2d17c5deca9 | Body changes | Python, JavaScript | python/whitespace_changes.py, javascript/whitespace_changes.js |

## Function Signature Change Tests

| Commit Description | SHA (to be filled) | Test Case Type | Languages | Files |
|-------------------|-------------------|---------------|-----------|-------|
| Parameter additions | 37cdc0412f419908d9447f4c5bc4864eeb08953f | Signature changes | Python, JavaScript | python/signature_changes.py, javascript/signature_changes.js |
| Parameter removals | 240523f37894b3baefb1c0d399fb3a2bed4afcca | Signature changes | Python, JavaScript | python/signature_changes.py, javascript/signature_changes.js |
| Parameter renames | 4b847842337cc54e98539651f90160a37e1f2383 | Signature changes | Python, JavaScript | python/signature_changes.py, javascript/signature_changes.js |
| Default parameter changes | 8e36d9aa2f82282abd24d70b768aeb5694ccff19 | Signature changes | Python, JavaScript | python/signature_changes.py, javascript/signature_changes.js |

## Function Docstring/Comment Change Tests

| Commit Description | SHA (to be filled) | Test Case Type | Languages | Files |
|-------------------|-------------------|---------------|-----------|-------|
| Docstring changes | 5375ad36bbcd3b464fd30eafe0060cbf554291f2 | Docstring changes | Python | python/docstring_changes.py |
| Comment changes | 5375ad36bbcd3b464fd30eafe0060cbf554291f2 | Docstring changes | JavaScript | javascript/comment_changes.js |

## Function Rename Tests

| Commit Description | SHA (to be filled) | Test Case Type | Languages | Files |
|-------------------|-------------------|---------------|-----------|-------|
| Simple function renames | 359f4b2af8e3cf7973ca874479058c0abeafe406 | Renamed functions | Python, JavaScript | python/renamed_functions.py, javascript/renamed_functions.js |
| Function renames with minor body changes | 8dc985695d41da492f95d3ab3d4582a5268f8faa | Renamed functions | Python, JavaScript | python/renamed_functions.py, javascript/renamed_functions.js |
| Function renames with signature changes | 09040ddd2a0196e16a015d399304c8cf8d629c82 | Renamed functions | Python, JavaScript | python/renamed_functions.py, javascript/renamed_functions.js |

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
