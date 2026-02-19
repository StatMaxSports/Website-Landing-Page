import os
import json
import sys
from urllib import request, error

def get_env_variable(key):
    try:
        with open('.env', 'r') as f:
            for line in f:
                if line.startswith(f"{key}="):
                    return line.strip().split('=', 1)[1]
    except FileNotFoundError:
        return None
    return None

def create_repo(repo_name, github_pat):
    url = "https://api.github.com/user/repos"
    data = json.dumps({
        "name": repo_name,
        "private": False,
        "description": "Landing page for Stat Max - AI-powered sports analytics."
    }).encode('utf-8')
    
    headers = {
        "Authorization": f"token {github_pat}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    }
    
    req = request.Request(url, data=data, headers=headers, method='POST')
    
    try:
        with request.urlopen(req) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            print(f"SUCCESS: Repository created at {res_data['html_url']}")
            print(f"SSH_URL: {res_data['ssh_url']}")
            print(f"CLONE_URL: {res_data['clone_url']}")
            return res_data['clone_url']
    except error.HTTPError as e:
        body = e.read().decode('utf-8')
        print(f"ERROR: {e.code} {e.reason}")
        print(f"BODY: {body}")
        if e.code == 422:
            print("Likely cause: Repository already exists.")
        sys.exit(1)
    except Exception as e:
        print(f"UNEXPECTED ERROR: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 execution/create_github_repo.py <repo_name>")
        sys.exit(1)
    
    repo_name = sys.argv[1]
    github_pat = get_env_variable("GITHUB_PAT")
    
    if not github_pat:
        print("ERROR: GITHUB_PAT not found in .env")
        sys.exit(1)
        
    create_repo(repo_name, github_pat)
