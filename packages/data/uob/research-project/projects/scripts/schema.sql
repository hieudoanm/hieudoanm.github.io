-- Research project explorer: analytical store.
-- Source text stays in md/ and csv/; this database holds every entity, fact,
-- configuration value and derived score as queryable rows.

PRAGMA foreign_keys = ON;

-- ---------------------------------------------------------------- taxonomy --

CREATE TABLE IF NOT EXISTS schema_meta (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- One label set for two purposes: 'subject' areas and 'method' areas. Keeping
-- them in one table lets a preference and a text match share a category_id.
-- A label may exist in both dimensions ("Software & tool development"), so the
-- unique key is the pair, not the name.
CREATE TABLE IF NOT EXISTS category (
    id         INTEGER PRIMARY KEY,
    name       TEXT NOT NULL,
    dimension  TEXT NOT NULL CHECK (dimension IN ('subject', 'method')),
    sort_order INTEGER NOT NULL DEFAULT 0,
    UNIQUE (name, dimension)
);

-- The keyword rules themselves, mirrored from scripts/taxonomy.py on every
-- build so the rules behind any label stay inspectable in SQL.
CREATE TABLE IF NOT EXISTS category_keyword (
    category_id INTEGER NOT NULL REFERENCES category (id) ON DELETE CASCADE,
    pattern     TEXT NOT NULL,
    PRIMARY KEY (category_id, pattern)
);

-- ---------------------------------------------------------------- entities --

CREATE TABLE IF NOT EXISTS project (
    id                        INTEGER PRIMARY KEY,
    source_code               TEXT NOT NULL UNIQUE,
    title                     TEXT NOT NULL,
    summary                   TEXT,
    topic                     TEXT,
    methodology               TEXT,
    project_type              TEXT,
    ethics_status             TEXT,
    ethics_note               TEXT,
    supervisor_field          TEXT,
    programmes_raw            TEXT,
    optional_modules          TEXT,
    recommended_practical     TEXT,
    recommended_data_module   TEXT,
    skills_requirements       TEXT,
    seed_references           TEXT,
    comments                  TEXT,
    source_file               TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS supervisor (
    id             INTEGER PRIMARY KEY,
    name           TEXT NOT NULL UNIQUE,
    email          TEXT,
    website        TEXT,
    research_focus TEXT,
    -- 'verified' focus came from a staff profile; 'unverified' means no
    -- profile was found. An unverified focus must never score as a poor match.
    focus_status   TEXT NOT NULL CHECK (focus_status IN ('verified', 'unverified', 'missing'))
);

-- ----------------------------------------------------------------- bridges --

-- Co-supervision is real, so this is many-to-many and keeps display order.
CREATE TABLE IF NOT EXISTS project_supervisor (
    project_id    INTEGER NOT NULL REFERENCES project (id) ON DELETE CASCADE,
    supervisor_id INTEGER NOT NULL REFERENCES supervisor (id) ON DELETE CASCADE,
    ordinal       INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (project_id, supervisor_id)
);

-- 'relevant programmes' arrives comma-joined; store one row per programme.
CREATE TABLE IF NOT EXISTS project_programme (
    project_id INTEGER NOT NULL REFERENCES project (id) ON DELETE CASCADE,
    programme  TEXT NOT NULL,
    PRIMARY KEY (project_id, programme)
);

-- Multi-label assignments, each with the phrase that triggered it and the
-- project section it came from. This is the audit trail for every label.
CREATE TABLE IF NOT EXISTS project_category (
    project_id   INTEGER NOT NULL REFERENCES project (id) ON DELETE CASCADE,
    category_id  INTEGER NOT NULL REFERENCES category (id) ON DELETE CASCADE,
    evidence     TEXT,
    source_field TEXT,
    PRIMARY KEY (project_id, category_id)
);

CREATE TABLE IF NOT EXISTS supervisor_category (
    supervisor_id INTEGER NOT NULL REFERENCES supervisor (id) ON DELETE CASCADE,
    category_id   INTEGER NOT NULL REFERENCES category (id) ON DELETE CASCADE,
    evidence      TEXT,
    PRIMARY KEY (supervisor_id, category_id)
);

-- ----------------------------------------------------------- configuration --
-- Typed rather than one label/value file, so SQL can check the config itself.

CREATE TABLE IF NOT EXISTS interest (
    category_id   INTEGER PRIMARY KEY REFERENCES category (id) ON DELETE CASCADE,
    priority      REAL NOT NULL CHECK (priority >= 0 AND priority <= 5),
    ranked_weight REAL NOT NULL DEFAULT 0,
    notes         TEXT
);

CREATE TABLE IF NOT EXISTS method_preference (
    category_id   INTEGER PRIMARY KEY REFERENCES category (id) ON DELETE CASCADE,
    priority      REAL NOT NULL CHECK (priority >= 0 AND priority <= 5),
    ranked_weight REAL NOT NULL DEFAULT 0,
    notes       TEXT
);

-- Covers subject and method multipliers alike; category.dimension says which.
CREATE TABLE IF NOT EXISTS category_weight (
    category_id INTEGER PRIMARY KEY REFERENCES category (id) ON DELETE CASCADE,
    weight      REAL NOT NULL CHECK (weight >= 0)
);

CREATE TABLE IF NOT EXISTS dimension_weight (
    dimension TEXT PRIMARY KEY,
    weight    REAL NOT NULL CHECK (weight >= 0),
    notes     TEXT
);

CREATE TABLE IF NOT EXISTS programme (
    name TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS skill (
    name   TEXT PRIMARY KEY,
    rating REAL CHECK (rating >= 0 AND rating <= 5)
);

CREATE TABLE IF NOT EXISTS skill_goal (
    name     TEXT PRIMARY KEY,
    priority REAL CHECK (priority >= 0 AND priority <= 5)
);

CREATE TABLE IF NOT EXISTS project_type_preference (
    name TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS exclusion (
    kind  TEXT NOT NULL CHECK (kind IN ('category', 'project_type', 'ethics_status')),
    value TEXT NOT NULL,
    PRIMARY KEY (kind, value)
);

-- Manual 1-5 ratings. NULL means "not reviewed", never "poor fit".
CREATE TABLE IF NOT EXISTS feasibility_rating (
    project_id      INTEGER PRIMARY KEY REFERENCES project (id) ON DELETE CASCADE,
    skill_fit       REAL CHECK (skill_fit BETWEEN 1 AND 5),
    workload_fit    REAL CHECK (workload_fit BETWEEN 1 AND 5),
    resource_access REAL CHECK (resource_access BETWEEN 1 AND 5),
    notes           TEXT
);

-- ------------------------------------------------------------ score history --

-- One row per build so configurations can be compared instead of overwritten.
CREATE TABLE IF NOT EXISTS score_run (
    id                INTEGER PRIMARY KEY,
    created_at        TEXT NOT NULL,
    label             TEXT,
    config_hash       TEXT NOT NULL,
    active_dimensions TEXT,
    note              TEXT
);

CREATE TABLE IF NOT EXISTS project_score (
    run_id                 INTEGER NOT NULL REFERENCES score_run (id) ON DELETE CASCADE,
    project_id             INTEGER NOT NULL REFERENCES project (id) ON DELETE CASCADE,
    total                  REAL NOT NULL,
    rank                   INTEGER,
    interest_match         REAL,
    method_match           REAL,
    supervisor_focus_match REAL,
    feasibility            REAL,
    programme_fit          REAL,
    project_type_fit       REAL,
    information_completeness REAL,
    requirement_review     TEXT,
    PRIMARY KEY (run_id, project_id)
);

-- The audit trail behind every score: which category contributed how much,
-- for the project and for its supervisors separately.
CREATE TABLE IF NOT EXISTS score_contribution (
    run_id        INTEGER NOT NULL REFERENCES score_run (id) ON DELETE CASCADE,
    project_id    INTEGER NOT NULL REFERENCES project (id) ON DELETE CASCADE,
    scope         TEXT NOT NULL CHECK (scope IN ('project', 'method', 'supervisor')),
    category_id   INTEGER NOT NULL REFERENCES category (id) ON DELETE CASCADE,
    contribution  REAL NOT NULL,
    PRIMARY KEY (run_id, project_id, scope, category_id)
);

-- The labels that actually matched, which is not the same set as the labels
-- that contributed: an inherited family match contributes under one label while
-- the text matched the other.
CREATE TABLE IF NOT EXISTS score_match (
    run_id      INTEGER NOT NULL REFERENCES score_run (id) ON DELETE CASCADE,
    project_id  INTEGER NOT NULL REFERENCES project (id) ON DELETE CASCADE,
    scope       TEXT NOT NULL CHECK (scope IN ('project', 'method', 'supervisor')),
    category_id INTEGER NOT NULL REFERENCES category (id) ON DELETE CASCADE,
    PRIMARY KEY (run_id, project_id, scope, category_id)
);

CREATE TABLE IF NOT EXISTS supervisor_score (
    run_id        INTEGER NOT NULL REFERENCES score_run (id) ON DELETE CASCADE,
    supervisor_id INTEGER NOT NULL REFERENCES supervisor (id) ON DELETE CASCADE,
    focus_match   REAL,
    project_count INTEGER NOT NULL,
    PRIMARY KEY (run_id, supervisor_id)
);

-- ------------------------------------------------------------------- views --

CREATE VIEW IF NOT EXISTS latest_run AS
SELECT id, created_at, label, config_hash, active_dimensions
FROM score_run
ORDER BY id DESC
LIMIT 1;

-- Project facts with every list already collapsed, ready for a CSV export.
CREATE VIEW IF NOT EXISTS v_project_export AS
SELECT p.id AS project_id,
       p.source_code,
       p.title,
       p.project_type,
       p.ethics_status,
       p.topic,
       p.methodology,
       p.skills_requirements,
       p.recommended_practical,
       p.recommended_data_module,
       p.optional_modules,
       p.source_file,
       (SELECT group_concat(name, '; ') FROM (
            SELECT s.name AS name FROM project_supervisor x JOIN supervisor s ON s.id = x.supervisor_id
             WHERE x.project_id = p.id ORDER BY x.ordinal)) AS supervisors,
       (SELECT group_concat(email, '; ') FROM (
            SELECT s.email AS email FROM project_supervisor x JOIN supervisor s ON s.id = x.supervisor_id
             WHERE x.project_id = p.id AND s.email IS NOT NULL ORDER BY x.ordinal)) AS supervisor_emails,
       (SELECT group_concat(website, '; ') FROM (
            SELECT s.website AS website FROM project_supervisor x JOIN supervisor s ON s.id = x.supervisor_id
             WHERE x.project_id = p.id AND s.website IS NOT NULL ORDER BY x.ordinal)) AS supervisor_websites,
       (SELECT group_concat(research_focus, ' | ') FROM (
            SELECT s.research_focus AS research_focus FROM project_supervisor x
              JOIN supervisor s ON s.id = x.supervisor_id
             WHERE x.project_id = p.id ORDER BY x.ordinal)) AS supervisor_research_focus,
       (SELECT group_concat(focus_status, '; ') FROM (
            SELECT s.focus_status AS focus_status FROM project_supervisor x
              JOIN supervisor s ON s.id = x.supervisor_id
             WHERE x.project_id = p.id ORDER BY x.ordinal)) AS supervisor_focus_status,
       (SELECT group_concat(pp.programme, ', ') FROM project_programme pp
         WHERE pp.project_id = p.id) AS programmes,
       (SELECT group_concat(name, '; ') FROM (
            SELECT c.name AS name FROM project_category x JOIN category c ON c.id = x.category_id
             WHERE x.project_id = p.id AND c.dimension = 'subject' ORDER BY c.name)) AS categories,
       (SELECT group_concat(name, '; ') FROM (
            SELECT c.name AS name FROM project_category x JOIN category c ON c.id = x.category_id
             WHERE x.project_id = p.id AND c.dimension = 'method' ORDER BY c.name)) AS methods,
       (SELECT group_concat(name || ': ' || evidence, '; ') FROM (
            SELECT c.name AS name, x.evidence AS evidence FROM project_category x
              JOIN category c ON c.id = x.category_id
             WHERE x.project_id = p.id AND c.dimension = 'subject' ORDER BY c.name)) AS category_evidence,
       (SELECT group_concat(name || ': ' || evidence, '; ') FROM (
            SELECT c.name AS name, x.evidence AS evidence FROM project_category x
              JOIN category c ON c.id = x.category_id
             WHERE x.project_id = p.id AND c.dimension = 'method' ORDER BY c.name)) AS method_evidence,
       (SELECT count(*) FROM project_category x JOIN category c ON c.id = x.category_id
         WHERE x.project_id = p.id AND c.dimension = 'subject') AS category_count,
       (SELECT count(*) FROM project_category x JOIN category c ON c.id = x.category_id
         WHERE x.project_id = p.id AND c.dimension = 'method') AS method_count
FROM project p;

-- Every category that contributed to a score, in either scope.
CREATE VIEW IF NOT EXISTS v_contributions AS
SELECT sc.run_id, sc.project_id, sc.scope, c.name AS category, sc.contribution
FROM score_contribution sc
JOIN category c ON c.id = sc.category_id;

-- Every label that matched a preference, per scope.
CREATE VIEW IF NOT EXISTS v_matches AS
SELECT m.run_id, m.project_id, m.scope, c.name AS category
FROM score_match m
JOIN category c ON c.id = m.category_id;

-- One row per project-supervisor-interested-category triangle. This is the
-- table to query for "which supervisors cover my interests, and how".
CREATE VIEW IF NOT EXISTS v_supervisor_interest AS
SELECT sc.supervisor_id,
       s.name AS supervisor,
       c.id AS category_id,
       c.name AS category,
       i.priority,
       i.ranked_weight,
       w.weight AS csv_multiplier,
       sc.evidence
FROM supervisor_category sc
JOIN supervisor s ON s.id = sc.supervisor_id
JOIN category c ON c.id = sc.category_id
LEFT JOIN interest i ON i.category_id = c.id
LEFT JOIN category_weight w ON w.category_id = c.id
WHERE s.focus_status = 'verified';

-- Supervisor alignment for the most recent build, for leaderboards and graphs.
CREATE VIEW IF NOT EXISTS v_supervisor_score AS
SELECT ss.supervisor_id, s.name, s.email, s.website, s.research_focus,
       s.focus_status, ss.focus_match, ss.project_count,
       (SELECT group_concat(name, '; ') FROM (
            SELECT c.name AS name FROM supervisor_category sc JOIN category c ON c.id = sc.category_id
             WHERE sc.supervisor_id = s.id ORDER BY c.name)) AS focus_categories,
       (SELECT group_concat(title, ' | ') FROM (
            SELECT p.title AS title FROM project_supervisor x JOIN project p ON p.id = x.project_id
             WHERE x.supervisor_id = s.id ORDER BY p.title)) AS project_titles
FROM supervisor_score ss
JOIN supervisor s ON s.id = ss.supervisor_id
JOIN latest_run r ON r.id = ss.run_id;

-- The ranking of the most recent build, with contribution text inlined.
CREATE VIEW IF NOT EXISTS v_ranking_export AS
SELECT ps.rank,
       ps.total,
       ps.interest_match,
       ps.method_match,
       ps.supervisor_focus_match,
       ps.feasibility,
       ps.information_completeness,
       ps.programme_fit,
       ps.project_type_fit,
       ps.requirement_review,
       pe.*,
       (SELECT group_concat(category, '; ') FROM (
            SELECT category FROM v_matches v WHERE v.run_id = ps.run_id
             AND v.project_id = ps.project_id AND v.scope = 'project')) AS matching_interests,
       (SELECT group_concat(category, '; ') FROM (
            SELECT category FROM v_matches v WHERE v.run_id = ps.run_id
             AND v.project_id = ps.project_id AND v.scope = 'method')) AS matching_methods,
       (SELECT group_concat(category, '; ') FROM (
            SELECT category FROM v_matches v WHERE v.run_id = ps.run_id
             AND v.project_id = ps.project_id AND v.scope = 'supervisor')) AS matching_supervisor_focus,
       (SELECT group_concat(category || '=' || contribution, '; ')
          FROM (SELECT category, contribution FROM v_contributions v
                 WHERE v.run_id = ps.run_id AND v.project_id = ps.project_id
                   AND v.scope = 'project' ORDER BY contribution DESC)) AS project_contributions,
       (SELECT group_concat(category || '=' || contribution, '; ')
          FROM (SELECT category, contribution FROM v_contributions v
                 WHERE v.run_id = ps.run_id AND v.project_id = ps.project_id
                   AND v.scope = 'supervisor' ORDER BY contribution DESC)) AS supervisor_contributions
FROM project_score ps
JOIN latest_run r ON r.id = ps.run_id
JOIN v_project_export pe ON pe.project_id = ps.project_id;

