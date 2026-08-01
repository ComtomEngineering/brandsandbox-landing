# BrandSandbox Landing Site

Static marketing site for BrandSandbox, including the protocol, services, case studies, and insights pages.

## Local preview

This project is plain HTML, CSS, and browser JavaScript. Serve the repository root with any static file server so root-relative assets and form pages resolve correctly:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Structure

- `index.html` — homepage.
- `protocol.html`, `services.html`, `case-studies.html`, and `insights.html` — supporting pages.
- `forms/` — embedded request-test and strategist-chat interfaces, plus their shared modal scripts.
- `img/` — brand and favicon assets.
- `whitepapers/` — downloadable BrandSandbox documents.

## Forms and chat

The site includes two browser-based interactions:

- The request-test modal collects contact and validation details.
- The strategist chat opens from the homepage and creates a chat session before exchanging messages.

Both are designed to communicate with the companion API service. This repository contains no API credentials, database settings, or deployment secrets. Configure and run the backend separately for submissions and chat to work.
