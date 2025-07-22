# Salah Sal's Professional Blog

This repository contains the source code for my personal and professional blog, hosted at [salah-sal.github.io](https://salah-sal.github.io). The blog is built with Jekyll and features multilingual support for English and Arabic.

## Key Features & Technologies

- **Jekyll:** Static site generator.
- **jekyll-polyglot:** For multilingual support (English & Arabic).
- **jekyll-paginate-v2:** For language-aware blog post pagination.
- **Giscus:** Comments system powered by GitHub Discussions.
- **Dynamic Theming:** Light and dark mode support that syncs with Giscus comments.
- **Custom CSS:** With Noto Sans Arabic for great readability in both languages.
- **SEO:** Using `jekyll-seo-tag` and `jekyll-sitemap` for better search engine visibility.

## Local Development

To set up and run this Jekyll site locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Salah-Sal/Salah-Sal.github.io.git
    cd Salah-Sal.github.io
    ```
2.  **Install dependencies:**
    Make sure you have Ruby and Bundler installed. Then run:
    ```bash
    bundle install
    ```
3.  **Serve the site:**
    ```bash
    bundle exec jekyll serve --livereload
    ```
    The site will typically be available at `http://localhost:4000`.

## Writing Posts

Blog posts are written in Markdown and located in the `_posts` directory.

### Filename Convention
Use the format `YYYY-MM-DD-your-title-slug.md`.

### Front Matter
Each post must start with YAML front matter. Key fields:
- `layout: post`
- `title: "Your Post Title"`
- `date: YYYY-MM-DD HH:MM:SS +/-ZZZZ`
- `categories: [category1, category2]`
- `lang: en` (or `ar` for Arabic)

### Translating Posts
To provide a translation for an existing post:
1.  Create a new file with the same date and slug, but append the language code to the filename (e.g., `2024-05-15-my-post.ar.md`).
2.  In the front matter of the translated post, set `lang: ar` and translate the `title`.
3.  Translate the body of the post.

## Managing UI Translations

User interface text is managed in YAML files within the `_data/locales/` directory (`en.yml` for English, `ar.yml` for Arabic). Edit these files to change or add UI strings.
