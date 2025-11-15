-- создаём таблицы
CREATE TABLE products (
                          id SERIAL PRIMARY KEY,
                          name TEXT NOT NULL,
                          price NUMERIC NOT NULL
);

CREATE TABLE orders (
                        id SERIAL PRIMARY KEY,
                        product_id INT REFERENCES products(id),
                        quantity INT NOT NULL CHECK (quantity > 0),
                        total NUMERIC,
                        status TEXT DEFAULT 'new'  -- new / paid / canceled
);

CREATE TABLE orders_log (
                            id SERIAL PRIMARY KEY,
                            order_id INT,
                            operation TEXT,
                            old_data JSONB,
                            new_data JSONB,
                            ts TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders_deleted (
                                id SERIAL PRIMARY KEY,
                                deleted_at TIMESTAMP DEFAULT NOW(),
                                order_data JSONB
);

CREATE TABLE product_stats (
                               product_id INT PRIMARY KEY REFERENCES products(id),
                               orders_count INT DEFAULT 0
);

-- Example 1

CREATE OR REPLACE FUNCTION orders_recalculate_total()
RETURNS TRIGGER AS $$
BEGIN
SELECT price INTO STRICT NEW.total
FROM products WHERE id = NEW.product_id;

NEW.total := NEW.total * NEW.quantity;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_recalc_total
    BEFORE INSERT OR UPDATE OF quantity, product_id
                     ON orders
                         FOR EACH ROW
                         EXECUTE FUNCTION orders_recalculate_total();

-- Example 2

CREATE OR REPLACE FUNCTION orders_audit()
RETURNS TRIGGER AS $$
BEGIN
INSERT INTO orders_log(order_id, operation, old_data, new_data)
VALUES (
           COALESCE(NEW.id, OLD.id),
           TG_OP,
           to_jsonb(OLD),
           to_jsonb(NEW)
       );
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_order_audit
    AFTER INSERT OR UPDATE
                        ON orders
                        FOR EACH ROW
                        EXECUTE FUNCTION orders_audit();

-- Example 3

CREATE OR REPLACE FUNCTION orders_archive_before_delete()
RETURNS TRIGGER AS $$
BEGIN
INSERT INTO orders_deleted(order_data)
VALUES (to_jsonb(OLD));

RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_order_archive
    BEFORE DELETE
    ON orders
    FOR EACH ROW
    EXECUTE FUNCTION orders_archive_before_delete();


-- Example 4

CREATE OR REPLACE FUNCTION forbid_updates_of_paid()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status = 'paid' THEN
        RAISE EXCEPTION 'Cannot modify a paid order';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_forbid_paid
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION forbid_updates_of_paid();


-- Example 5

CREATE OR REPLACE FUNCTION update_product_stats()
RETURNS TRIGGER AS $$
BEGIN
INSERT INTO product_stats(product_id, orders_count)
VALUES (NEW.product_id, 1)
    ON CONFLICT (product_id)
    DO UPDATE SET orders_count = product_stats.orders_count + 1;

RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_product_stats
    AFTER INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_product_stats();


-- Example 6

CREATE TABLE operations_log (
                                id SERIAL PRIMARY KEY,
                                event TEXT,
                                ts TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION log_statement_level()
RETURNS TRIGGER AS $$
BEGIN
INSERT INTO operations_log(event) VALUES (TG_OP);
RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_statement_log
    AFTER INSERT OR UPDATE OR DELETE ON orders
    FOR EACH STATEMENT -- ВАЖНО
    EXECUTE FUNCTION log_statement_level();


-- Check

INSERT INTO products(name, price) VALUES
                                      ('Laptop', 1500),
                                      ('Phone', 800),
                                      ('Mouse', 25);

-- Triggers (1,2,6)
INSERT INTO orders(product_id, quantity)
VALUES (1, 2);

-- Triggers (1,2,4,6)
UPDATE orders SET quantity = 5 WHERE id = 1;

-- status = 'paid'
UPDATE orders SET status = 'paid' WHERE id = 1;
-- СЛЕДУЮЩЕЕ ДАСТ ОШИБКУ (Trigger 4, 6)
UPDATE orders SET quantity = 10 WHERE id = 1;

-- Triggers (3,6)
DELETE FROM orders WHERE id = 1;