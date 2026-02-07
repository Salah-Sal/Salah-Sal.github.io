(function () {
    'use strict';

    var BATCH_SIZE = 50;
    var DEBOUNCE_MS = 300;
    var DATA_URL = '/assets/data/masader.json';

    var QUALITY_DIMS = {
        'سهولة_الوصول': 'سهولة الوصول',
        'التوثيق': 'التوثيق',
        'السلامة_الأخلاقية': 'السلامة الأخلاقية',
        'الترخيص': 'الترخيص',
        'قابلية_إعادة_الإنتاج': 'قابلية إعادة الإنتاج',
        'المراجعة_العلمية': 'المراجعة العلمية',
        'جودة_البيانات': 'جودة البيانات'
    };

    var FORM_LABELS = {
        'text': 'نصوص',
        'audio': 'صوتيات',
        'images': 'صور',
        'videos': 'فيديو'
    };

    var allDatasets = [];
    var filteredDatasets = [];
    var displayedCount = 0;

    // DOM refs
    var searchInput = document.getElementById('datasets-search');
    var filterTask = document.getElementById('filter-task');
    var filterGrade = document.getElementById('filter-grade');
    var filterForm = document.getElementById('filter-form');
    var filterYear = document.getElementById('filter-year');
    var sortBy = document.getElementById('sort-by');
    var grid = document.getElementById('datasets-grid');
    var resultsCount = document.getElementById('results-count');
    var loadMoreContainer = document.getElementById('load-more-container');
    var loadMoreBtn = document.getElementById('load-more-btn');
    var loadingEl = document.getElementById('datasets-loading');
    var emptyEl = document.getElementById('datasets-empty');
    var modalOverlay = document.getElementById('modal-overlay');
    var modalContent = document.getElementById('modal-content');
    var modalCloseBtn = document.getElementById('modal-close');

    // === Init ===
    function init() {
        fetch(DATA_URL)
            .then(function (r) {
                if (!r.ok) throw new Error('Failed to load');
                return r.json();
            })
            .then(function (data) {
                allDatasets = data;
                populateFilters();
                applyFilters();
                bindEvents();
                loadingEl.style.display = 'none';
            })
            .catch(function () {
                loadingEl.innerHTML = '<p>خطأ في تحميل البيانات.</p>';
            });
    }

    // === Filters ===
    function populateFilters() {
        var tasks = {};
        var years = {};
        allDatasets.forEach(function (d) {
            (d.Tasks || []).forEach(function (t) { tasks[t] = true; });
            if (d.Year) years[d.Year] = true;
        });

        Object.keys(tasks).sort().forEach(function (t) {
            var opt = document.createElement('option');
            opt.value = t;
            opt.textContent = t;
            filterTask.appendChild(opt);
        });

        Object.keys(years).sort(function (a, b) { return b - a; }).forEach(function (y) {
            var opt = document.createElement('option');
            opt.value = y;
            opt.textContent = y;
            filterYear.appendChild(opt);
        });
    }

    // === Search ===
    function normalize(str) {
        if (!str) return '';
        return str.replace(/[\u0610-\u061A\u064B-\u065F\u0670]/g, '').toLowerCase();
    }

    function matchesSearch(d, q) {
        var nq = normalize(q);
        var fields = [
            d['\u0627\u0644\u0627\u0633\u0645'],           // الاسم
            d['\u0627\u0644\u0627\u0633\u0645_\u0627\u0644\u0623\u0635\u0644\u064A'], // الاسم_الأصلي
            d['\u0627\u0644\u0645\u0644\u062E\u0635'],      // الملخص
            (d.Tasks || []).join(' ')
        ];
        for (var i = 0; i < fields.length; i++) {
            if (normalize(fields[i]).indexOf(nq) !== -1) return true;
        }
        return false;
    }

    // === Filter + Sort ===
    function applyFilters() {
        var q = searchInput.value.trim();
        var task = filterTask.value;
        var grade = filterGrade.value;
        var form = filterForm.value;
        var year = filterYear.value;
        var sort = sortBy.value;

        filteredDatasets = allDatasets.filter(function (d) {
            if (q && !matchesSearch(d, q)) return false;
            if (task && (d.Tasks || []).indexOf(task) === -1) return false;
            if (grade && d['\u062A\u0642\u062F\u064A\u0631_\u0627\u0644\u062C\u0648\u062F\u0629'] !== grade) return false;
            if (form && d.Form !== form) return false;
            if (year && d.Year !== parseInt(year)) return false;
            return true;
        });

        filteredDatasets.sort(getComparator(sort));

        displayedCount = 0;
        grid.innerHTML = '';
        renderBatch();
        updateCount();
    }

    function getComparator(sort) {
        switch (sort) {
            case 'quality-asc':
                return function (a, b) { return (a['\u062F\u0631\u062C\u0629_\u0627\u0644\u062C\u0648\u062F\u0629'] || 0) - (b['\u062F\u0631\u062C\u0629_\u0627\u0644\u062C\u0648\u062F\u0629'] || 0); };
            case 'year-desc':
                return function (a, b) { return (b.Year || 0) - (a.Year || 0); };
            case 'year-asc':
                return function (a, b) { return (a.Year || 0) - (b.Year || 0); };
            case 'name-asc':
                return function (a, b) {
                    return (a['\u0627\u0644\u0627\u0633\u0645'] || '').localeCompare(b['\u0627\u0644\u0627\u0633\u0645'] || '', 'ar');
                };
            default: // quality-desc
                return function (a, b) { return (b['\u062F\u0631\u062C\u0629_\u0627\u0644\u062C\u0648\u062F\u0629'] || 0) - (a['\u062F\u0631\u062C\u0629_\u0627\u0644\u062C\u0648\u062F\u0629'] || 0); };
        }
    }

    function updateCount() {
        resultsCount.textContent = filteredDatasets.length + ' مجموعة بيانات';
        emptyEl.style.display = filteredDatasets.length === 0 ? 'block' : 'none';
    }

    // === Rendering ===
    function renderBatch() {
        var end = Math.min(displayedCount + BATCH_SIZE, filteredDatasets.length);
        var frag = document.createDocumentFragment();

        for (var i = displayedCount; i < end; i++) {
            frag.appendChild(createCard(filteredDatasets[i]));
        }

        grid.appendChild(frag);
        displayedCount = end;
        loadMoreContainer.style.display = displayedCount < filteredDatasets.length ? 'block' : 'none';
    }

    function createCard(d) {
        var card = document.createElement('article');
        card.className = 'dataset-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        var grade = d['\u062A\u0642\u062F\u064A\u0631_\u0627\u0644\u062C\u0648\u062F\u0629'] || '';
        var score = d['\u062F\u0631\u062C\u0629_\u0627\u0644\u062C\u0648\u062F\u0629'] || 0;
        var tasks = (d.Tasks || []).slice(0, 2).join('\u060C ');
        var summary = truncate(d['\u0627\u0644\u0645\u0644\u062E\u0635'] || '', 120);
        var vol = formatVolume(d.Volume, d.Unit);

        card.innerHTML =
            '<div class="card-header">' +
                '<h3 class="card-title">' + esc(d['\u0627\u0644\u0627\u0633\u0645'] || d['\u0627\u0644\u0627\u0633\u0645_\u0627\u0644\u0623\u0635\u0644\u064A'] || '') + '</h3>' +
                '<span class="quality-badge ' + gradeClass(grade) + '">' + score + ' - ' + esc(grade) + '</span>' +
            '</div>' +
            '<div class="card-meta">' +
                (d.Year ? '<span>' + d.Year + '</span>' : '') +
                (d.Form ? '<span>' + esc(FORM_LABELS[d.Form] || d.Form) + '</span>' : '') +
                (tasks ? '<span>' + esc(tasks) + '</span>' : '') +
            '</div>' +
            '<p class="card-summary">' + esc(summary) + '</p>' +
            '<div class="card-footer">' + esc(vol) + '</div>';

        card.addEventListener('click', function () { openModal(d); });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(d); }
        });

        return card;
    }

    // === Modal ===
    function openModal(d) {
        document.body.style.overflow = 'hidden';
        modalOverlay.style.display = 'flex';
        modalContent.innerHTML = buildModal(d);
    }

    function closeModal() {
        document.body.style.overflow = '';
        modalOverlay.style.display = 'none';
        modalContent.innerHTML = '';
    }

    function buildModal(d) {
        var grade = d['\u062A\u0642\u062F\u064A\u0631_\u0627\u0644\u062C\u0648\u062F\u0629'] || '';
        var score = d['\u062F\u0631\u062C\u0629_\u0627\u0644\u062C\u0648\u062F\u0629'] || 0;
        var html = '';

        // Header
        html += '<div class="modal-header">';
        html += '<h2>' + esc(d['\u0627\u0644\u0627\u0633\u0645'] || '') + '</h2>';
        html += '<p class="modal-original-name">' + esc(d['\u0627\u0644\u0627\u0633\u0645_\u0627\u0644\u0623\u0635\u0644\u064A'] || '') + '</p>';
        html += '<span class="quality-badge quality-badge-lg ' + gradeClass(grade) + '">' + score + '/100 - ' + esc(grade) + '</span>';
        html += '</div>';

        // Summary
        html += section('\u0627\u0644\u0645\u0644\u062E\u0635', '<p>' + esc(d['\u0627\u0644\u0645\u0644\u062E\u0635'] || '') + '</p>');

        // Quality bars
        var breakdown = d['\u062A\u0641\u0635\u064A\u0644_\u0627\u0644\u062C\u0648\u062F\u0629'];
        if (breakdown) {
            var bars = '';
            for (var key in QUALITY_DIMS) {
                if (breakdown[key] !== undefined) {
                    var s = breakdown[key];
                    bars += '<div class="quality-bar-row">' +
                        '<span class="bar-label">' + QUALITY_DIMS[key] + '</span>' +
                        '<div class="bar-track"><div class="bar-fill" style="width:' + s + '%;background:' + scoreColor(s) + '"></div></div>' +
                        '<span class="bar-score">' + s + '</span>' +
                    '</div>';
                }
            }
            html += section('\u062A\u0641\u0635\u064A\u0644 \u0627\u0644\u062C\u0648\u062F\u0629', '<div class="quality-bars">' + bars + '</div>');
        }

        // Strengths
        html += listSection('\u0646\u0642\u0627\u0637 \u0627\u0644\u0642\u0648\u0629', d['\u0646\u0642\u0627\u0637_\u0627\u0644\u0642\u0648\u0629'], 'strengths');

        // Weaknesses
        html += listSection('\u0646\u0642\u0627\u0637 \u0627\u0644\u0636\u0639\u0641', d['\u0646\u0642\u0627\u0637_\u0627\u0644\u0636\u0639\u0641'], 'weaknesses');

        // Recommended uses
        html += listSection('\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0627\u062A \u0627\u0644\u0645\u0648\u0635\u0649 \u0628\u0647\u0627', d['\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0627\u062A_\u0627\u0644\u0645\u0648\u0635\u0649_\u0628\u0647\u0627'], 'uses');

        // Sample previews
        var inspect = d['\u0641\u062D\u0635_\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A'];
        if (inspect) {
            var samples = inspect['\u0645\u0639\u0627\u064A\u0646\u0629_\u0627\u0644\u0639\u064A\u0646\u0627\u062A'] || [];
            if (samples.length > 0) {
                var shtml = '<div class="sample-previews">';
                samples.forEach(function (s) {
                    shtml += '<div class="sample-item">' + esc(s) + '</div>';
                });
                shtml += '</div>';
                html += section('\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0639\u064A\u0646\u0627\u062A', shtml);
            }

            var issues = inspect['\u0645\u0634\u0627\u0643\u0644_\u0645\u0643\u062A\u0634\u0641\u0629'] || [];
            if (issues.length > 0) {
                html += listSection('\u0645\u0634\u0627\u0643\u0644 \u0645\u0643\u062A\u0634\u0641\u0629', issues, 'weaknesses');
            }
        }

        // Metadata
        var meta = '<dl>';
        meta += metaRow('\u0627\u0644\u0633\u0646\u0629', d.Year || '\u2014');
        meta += metaRow('\u0627\u0644\u0646\u0648\u0639', FORM_LABELS[d.Form] || d.Form || '\u2014');
        meta += metaRow('\u0627\u0644\u062D\u062C\u0645', formatVolume(d.Volume, d.Unit));
        meta += metaRow('\u0627\u0644\u062A\u0631\u062E\u064A\u0635', d.License || '\u2014');
        meta += metaRow('\u0627\u0644\u0644\u0647\u062C\u0629', d.Dialect || '\u2014');
        meta += metaRow('\u0627\u0644\u0645\u0647\u0627\u0645', (d.Tasks || []).join('\u060C ') || '\u2014');
        meta += metaRow('\u0627\u0644\u0645\u0624\u0644\u0641\u0648\u0646', (d.Authors || []).join('\u060C ') || '\u2014');
        meta += '</dl>';
        html += '<div class="modal-section modal-metadata"><h3>\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629</h3>' + meta + '</div>';

        // Links
        var links = '';
        if (d['HF Link']) links += '<a href="' + escAttr(d['HF Link']) + '" target="_blank" rel="noopener">HuggingFace</a>';
        if (d['Paper Link']) links += '<a href="' + escAttr(d['Paper Link']) + '" target="_blank" rel="noopener">\u0627\u0644\u0648\u0631\u0642\u0629 \u0627\u0644\u0628\u062D\u062B\u064A\u0629</a>';
        var sources = d['\u0627\u0644\u0645\u0635\u0627\u062F\u0631_\u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629'] || [];
        sources.forEach(function (url) {
            if (url !== d['HF Link'] && url !== d['Paper Link']) {
                links += '<a href="' + escAttr(url) + '" target="_blank" rel="noopener">' + esc(urlLabel(url)) + '</a>';
            }
        });
        if (links) {
            html += '<div class="modal-section modal-links"><h3>\u0627\u0644\u0631\u0648\u0627\u0628\u0637</h3>' + links + '</div>';
        }

        return html;
    }

    // === Helpers ===
    function esc(s) {
        if (!s) return '';
        var d = document.createElement('div');
        d.appendChild(document.createTextNode(String(s)));
        return d.innerHTML;
    }

    function escAttr(s) {
        return esc(s).replace(/"/g, '&quot;');
    }

    function truncate(s, max) {
        if (!s || s.length <= max) return s || '';
        var cut = s.lastIndexOf(' ', max);
        if (cut === -1) cut = max;
        return s.substring(0, cut) + '...';
    }

    function formatVolume(vol, unit) {
        if (!vol) return '\u2014';
        var n = Number(vol).toLocaleString('ar-SA');
        var units = {
            'tokens': '\u0631\u0645\u0632',
            'sentences': '\u062C\u0645\u0644\u0629',
            'documents': '\u0645\u0633\u062A\u0646\u062F',
            'hours': '\u0633\u0627\u0639\u0629',
            'images': '\u0635\u0648\u0631\u0629',
            'words': '\u0643\u0644\u0645\u0629'
        };
        return n + ' ' + (units[unit] || unit || '');
    }

    function gradeClass(g) {
        switch (g) {
            case '\u0645\u0645\u062A\u0627\u0632': return 'grade-excellent';
            case '\u062C\u064A\u062F': return 'grade-good';
            case '\u0645\u0642\u0628\u0648\u0644': return 'grade-acceptable';
            case '\u0636\u0639\u064A\u0641': return 'grade-poor';
            default: return '';
        }
    }

    function scoreColor(s) {
        if (s >= 80) return '#16a34a';
        if (s >= 60) return '#2563eb';
        if (s >= 40) return '#d97706';
        return '#dc2626';
    }

    function section(title, content) {
        return '<div class="modal-section"><h3>' + title + '</h3>' + content + '</div>';
    }

    function listSection(title, items, cls) {
        if (!items || items.length === 0) return '';
        var html = '<ul>';
        items.forEach(function (item) {
            html += '<li>' + esc(item) + '</li>';
        });
        html += '</ul>';
        return '<div class="modal-section ' + cls + '"><h3>' + title + '</h3>' + html + '</div>';
    }

    function metaRow(label, value) {
        return '<dt>' + label + '</dt><dd>' + esc(String(value)) + '</dd>';
    }

    function urlLabel(url) {
        try {
            var host = new URL(url).hostname.replace('www.', '');
            return host;
        } catch (e) {
            return url;
        }
    }

    // === Events ===
    function bindEvents() {
        var timeout;
        searchInput.addEventListener('input', function () {
            clearTimeout(timeout);
            timeout = setTimeout(applyFilters, DEBOUNCE_MS);
        });

        [filterTask, filterGrade, filterForm, filterYear, sortBy].forEach(function (el) {
            el.addEventListener('change', applyFilters);
        });

        loadMoreBtn.addEventListener('click', renderBatch);

        modalCloseBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) closeModal();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });
    }

    // === Start ===
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
