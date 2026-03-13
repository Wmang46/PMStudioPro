# PMStudioPro — Setup Guide

Manual setup instructions for getting the project running on a new Windows PC.
If PowerShell is available, run `.\setup.ps1` instead — it automates all of this.

---

## Prerequisites

### 1. Node.js (>= 22.12.0)

Download from https://nodejs.org/en/download and install the LTS version.

Verify:
```
node --version
```
Should output `v22.12.0` or higher.

### 2. Git

Download from https://git-scm.com/download/win and install.

Verify:
```
git --version
```

---

## Setup Steps

### 3. Install dependencies

From the project root (`G:\PMStudioPro`):
```
npm install
```

### 4. Verify git remote

```
git remote -v
```

Should show:
```
origin  https://github.com/Wmang46/PMStudioPro.git (fetch)
origin  https://github.com/Wmang46/PMStudioPro.git (push)
```

If missing, add it:
```
git remote add origin https://github.com/Wmang46/PMStudioPro.git
```

If it points to the wrong URL:
```
git remote set-url origin https://github.com/Wmang46/PMStudioPro.git
```

### 5. SSH key (for deployment only)

Check if you already have a key:
```
dir %USERPROFILE%\.ssh\id_ed25519
```

If not, generate one:
```
ssh-keygen -t ed25519 -C "pmstudiopro-deploy"
```

Accept the default path (`~/.ssh/id_ed25519`) and optionally set a passphrase.

Then add the public key to the DigitalOcean droplet:
```
type %USERPROFILE%\.ssh\id_ed25519.pub | ssh root@134.199.194.51 "cat >> ~/.ssh/authorized_keys"
```

Or manually paste the contents of `~/.ssh/id_ed25519.pub` into the droplet's `~/.ssh/authorized_keys` file.

> **Note:** SSH is only needed for deploying to production. Local development works without it.

### 6. Test the build

```
npm run build
```

Should complete without errors and produce a `dist/` folder.

---

## Quick Reference

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Preview build | `npm run preview` |
| Deploy | `git push origin main && ssh root@134.199.194.51 'bash /opt/sites/pmstudiopro/deploy.sh'` |

**Live site:** https://pmstudiopro.com
**GitHub:** https://github.com/Wmang46/PMStudioPro

---

## Troubleshooting

**"node is not recognized"** — Node.js isn't in your PATH. Reinstall Node.js and check "Add to PATH" during setup, or add it manually.

**"npm install" fails with permissions** — Run PowerShell as Administrator, or check that the drive isn't write-protected.

**Build fails** — Make sure you ran `npm install` first. If it still fails, delete `node_modules` and `package-lock.json`, then run `npm install` again.

**SSH connection refused** — Verify the droplet is running at `134.199.194.51` and that your public key is in its `~/.ssh/authorized_keys`.

**Git push rejected** — Pull first: `git pull origin main --rebase`, then push again.
