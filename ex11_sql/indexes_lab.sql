-- создаём таблицу
CREATE TABLE visits (
                        id SERIAL PRIMARY KEY,
                        user_id INTEGER NOT NULL,
                        visit_time TIMESTAMP NOT NULL,
                        url TEXT NOT NULL,
                        user_agent TEXT
);

-- вставляем 2000000 записей
INSERT INTO visits (user_id, visit_time, url, user_agent)
SELECT
    (random() * 100000)::int,                           -- user_id
    NOW() - (random() * INTERVAL '365 days'),  -- visit_time
    'https://example.com/page/' || (random()*1000)::int,
    'Mozilla/5.0'
FROM generate_series(1, 2000000);

-- проверяем
SELECT COUNT(*) FROM visits;

-- очистка планой запросов (очистка кеша) - перед каждым экспериментом
DISCARD PLANS;
DISCARD ALL;


-- ТЕСТ 1
-- запрос без индекса
EXPLAIN ANALYZE SELECT * FROM visits WHERE user_id = 12345;

-- создаём B-tree индекс
CREATE INDEX idx_visits_user_id ON visits(user_id);

-- повторяем эксперимент
DISCARD PLANS;
DISCARD ALL;
EXPLAIN ANALYZE SELECT * FROM visits WHERE user_id = 12345;


-- ТЕСТ 2
-- запрос без индекса по времени визита
DISCARD PLANS;
DISCARD ALL;
SELECT * FROM visits WHERE visit_time > NOW() - INTERVAL '1 day';

-- создаём B-tree индекс
CREATE INDEX idx_visits_user_id ON visits(visit_time);

-- повторяем эксперимент
DISCARD PLANS;
DISCARD ALL;

SELECT * FROM visits WHERE visit_time > NOW() - INTERVAL '1 day';


-- ТЕСТ 3
-- запрос без индекса по времени визита
DISCARD PLANS;
DISCARD ALL;
EXPLAIN ANALYZE
SELECT * FROM visits WHERE user_id = 12345 AND visit_time > NOW() - INTERVAL '7 days';

-- создаём B-tree индекс
CREATE INDEX idx_visits_user_time ON visits(user_id, visit_time);

-- повторяем эксперимент
DISCARD PLANS;
DISCARD ALL;

EXPLAIN ANALYZE
SELECT * FROM visits WHERE user_id = 12345 AND visit_time > NOW() - INTERVAL '7 days';