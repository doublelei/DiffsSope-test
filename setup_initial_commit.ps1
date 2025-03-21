# PowerShell script to setup the initial commit for DiffScope test repository
# Run this script from within the test-repo directory

# Create necessary directories if they don't exist
$directories = @(
    "python",
    "javascript", 
    "typescript", 
    "java", 
    "cpp", 
    "go"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir
        Write-Host "Created directory: $dir"
    }
}

# Make sure we're in the right directory and it's a git repo
if (-not (Test-Path .git)) {
    Write-Host "This directory does not appear to be a git repository."
    Write-Host "Please run this script from within the test-repo directory."
    exit 1
}

# Check if we have changes to commit
$status = git status --porcelain
if ($status) {
    # Changes exist, let's commit them
    Write-Host "Committing initial files to repository..."
    
    # Add all files
    git add .
    
    # Commit with initial commit message
    git commit -m "Initial commit with test functions in multiple languages"
    
    # Get the commit SHA
    $commitSha = git log -n 1 --pretty=format:"%H"
    
    # Update COMMIT_MAP.md with the initial commit SHA
    $commitMapContent = Get-Content -Path .\COMMIT_MAP.md -Raw
    $updatedContent = $commitMapContent -replace "Initial setup with basic functions \| \(SHA\) \|", "Initial setup with basic functions | $commitSha |"
    Set-Content -Path .\COMMIT_MAP.md -Value $updatedContent
    
    # Commit the updated COMMIT_MAP.md
    git add .\COMMIT_MAP.md
    git commit -m "Update COMMIT_MAP.md with initial commit SHA"
    
    Write-Host "Initial commit created successfully!"
    Write-Host "Commit SHA: $commitSha"
    Write-Host "COMMIT_MAP.md has been updated."
} else {
    Write-Host "No changes to commit. Repository is already up to date."
}

Write-Host "Setup complete. You can now start creating test cases following the instructions in PowerShell_Instructions.md" 