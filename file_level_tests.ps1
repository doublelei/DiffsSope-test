# PowerShell script to create file-level test cases for DiffScope
# Run this script from within the test-repo directory

# Step 1: Commit the file additions
function Commit-FileAdditions {
    Write-Host "Committing file additions..." -ForegroundColor Green
    
    # Stage the new files
    git add python/util_functions.py javascript/util_functions.py
    
    # Commit with a descriptive message
    git commit -m "Add utility function files for file addition test case"
    
    # Get the commit SHA
    $commitSha = git log -n 1 --pretty=format:"%H"
    
    # Update COMMIT_MAP.md with the commit SHA
    $commitMapContent = Get-Content -Path .\COMMIT_MAP.md -Raw
    $updatedContent = $commitMapContent -replace "File additions \| TBD \|", "File additions | $commitSha |"
    Set-Content -Path .\COMMIT_MAP.md -Value $updatedContent
    
    # Commit the updated COMMIT_MAP.md
    git add .\COMMIT_MAP.md
    git commit -m "Update COMMIT_MAP.md with file addition commit SHA"
    
    Write-Host "File addition commit created successfully!" -ForegroundColor Green
    Write-Host "Commit SHA: $commitSha" -ForegroundColor Yellow
}

# Step 2: Commit the files that will be used for rename test
function Commit-FilesToBeRenamed {
    Write-Host "Committing files that will be renamed later..." -ForegroundColor Green
    
    # Stage the files
    git add python/old_name.py javascript/old_name.js
    
    # Commit with a descriptive message
    git commit -m "Add files that will be renamed later"
    
    Write-Host "Files to be renamed have been committed successfully!" -ForegroundColor Green
}

# Step 3: Commit the files that will be removed
function Commit-FilesToBeRemoved {
    Write-Host "Committing files that will be removed later..." -ForegroundColor Green
    
    # Stage the files
    git add python/to_be_removed.py javascript/to_be_removed.js
    
    # Commit with a descriptive message
    git commit -m "Add files that will be removed later"
    
    Write-Host "Files to be removed have been committed successfully!" -ForegroundColor Green
}

# Step 4: Rename files and commit the change
function Commit-FileRenames {
    Write-Host "Performing file renames..." -ForegroundColor Green
    
    # Rename the files
    git mv python/old_name.py python/new_name.py
    git mv javascript/old_name.js javascript/new_name.js
    
    # Commit with a descriptive message
    git commit -m "Rename files for file rename test case"
    
    # Get the commit SHA
    $commitSha = git log -n 1 --pretty=format:"%H"
    
    # Update COMMIT_MAP.md with the commit SHA
    $commitMapContent = Get-Content -Path .\COMMIT_MAP.md -Raw
    $updatedContent = $commitMapContent -replace "File renames \| TBD \|", "File renames | $commitSha |"
    Set-Content -Path .\COMMIT_MAP.md -Value $updatedContent
    
    # Commit the updated COMMIT_MAP.md
    git add .\COMMIT_MAP.md
    git commit -m "Update COMMIT_MAP.md with file rename commit SHA"
    
    Write-Host "File rename commit created successfully!" -ForegroundColor Green
    Write-Host "Commit SHA: $commitSha" -ForegroundColor Yellow
}

# Step 5: Remove files and commit the change
function Commit-FileRemovals {
    Write-Host "Removing files..." -ForegroundColor Green
    
    # Remove the files
    git rm python/to_be_removed.py javascript/to_be_removed.js
    
    # Commit with a descriptive message
    git commit -m "Remove files for file removal test case"
    
    # Get the commit SHA
    $commitSha = git log -n 1 --pretty=format:"%H"
    
    # Update COMMIT_MAP.md with the commit SHA
    $commitMapContent = Get-Content -Path .\COMMIT_MAP.md -Raw
    $updatedContent = $commitMapContent -replace "File removals \| TBD \|", "File removals | $commitSha |"
    Set-Content -Path .\COMMIT_MAP.md -Value $updatedContent
    
    # Commit the updated COMMIT_MAP.md
    git add .\COMMIT_MAP.md
    git commit -m "Update COMMIT_MAP.md with file removal commit SHA"
    
    Write-Host "File removal commit created successfully!" -ForegroundColor Green
    Write-Host "Commit SHA: $commitSha" -ForegroundColor Yellow
}

# Main execution
Write-Host "Starting file-level test case creation..." -ForegroundColor Cyan
Write-Host "Make sure you are in the test-repo directory before continuing." -ForegroundColor Yellow
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow

$continue = Read-Host "Continue? (y/n)"
if ($continue -ne "y") {
    Write-Host "Aborting script." -ForegroundColor Red
    exit
}

# Execute all steps in sequence
Commit-FileAdditions
Commit-FilesToBeRenamed
Commit-FilesToBeRemoved
Commit-FileRenames
Commit-FileRemovals

Write-Host "All file-level test cases have been created successfully!" -ForegroundColor Cyan
Write-Host "Check COMMIT_MAP.md for commit SHAs." -ForegroundColor Cyan 