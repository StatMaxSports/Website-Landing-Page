# Directive: Create GitHub Repository

## Goal
Create a new GitHub repository for the project using the GitHub API and a Personal Access Token (PAT).

## Inputs
- `GITHUB_PAT`: Scoped PAT stored in `.env`.
- `REPO_NAME`: Name of the repository to create.
- `DESCRIPTION`: Optional description for the repository.

## Tools
- `execution/create_github_repo.py`: Python script to perform the API call.

## Steps
1. Ensure `GITHUB_PAT` is present in the `.env` file.
2. Run `execution/create_github_repo.py` with the desired repository name.
3. Capture the remote URL from the script output.
4. Initialize git (if not already done).
5. Add the remote: `git remote add origin <URL>`.
6. Push to main: `git push -u origin main`.

## Edge Cases
- **Repository already exists**: Script should handle 422 error or check existence first.
- **Invalid Token**: Script should report 401 Unauthorized.
- **Network Issues**: Script should retry or report failure.
