# Your Professional Blog

A place where I share my thoughts and expertise

## Local Development

To set up and run this Jekyll site locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/[USERNAME]/[REPOSITORY_NAME].git
    cd [REPOSITORY_NAME]
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
- `layout: post` (Usually fixed)
- `title: "Your Post Title"`
- `date: YYYY-MM-DD HH:MM:SS +/-ZZZZ` (e.g., `2024-05-15 10:00:00 -0400`)
- `categories: [category1, category2]` (Optional list of categories)
- `lang: en` (For English posts, or other language codes like `ar` for translations)

### Translating Posts
To provide a translation for an existing post (e.g., from English to Arabic):
1.  Create a new file with the same date and slug, but append the language code to the filename. For example, if the English post is `2024-05-15-my-cool-post.md`, the Arabic version would be `2024-05-15-my-cool-post.ar.md`.
2.  In the front matter of the translated post (`.ar.md` file):
    - Set `lang: ar` (or the respective language code).
    - Translate the `title`.
    - Keep the `date` and `categories` generally the same as the original post (categories can be translated if you have a system for it, but often kept consistent for simplicity).
3.  Translate the body of the post into the target language.

## Managing UI Translations

User interface text (like navigation links, button labels, static text) is managed in YAML files within the `_data/locales/` directory:
- `_data/locales/en.yml` for English
- `_data/locales/ar.yml` for Arabic

Edit these files to change or add UI strings. The Liquid tag `{{ site.data.locales[site.active_lang].your_string_key }}` is used in templates to display these strings.

## Key Features & Technologies

- **Jekyll:** Static site generator.
- **jekyll-polyglot:** For multilingual support (English & Arabic).
- **jekyll-seo-tag:** Automates common SEO metadata.
- **jekyll-sitemap:** Generates `sitemap.xml`.
- **jekyll-paginate-v2:** For blog post pagination.
- **Giscus:** Comments system powered by GitHub Discussions.
- **Rouge:** For syntax highlighting in code blocks.
- **Noto Sans Arabic:** Web font for Arabic text.

---
*This README was last updated/reviewed by an automated process.*
