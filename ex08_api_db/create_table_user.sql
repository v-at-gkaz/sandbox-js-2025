CREATE TABLE public.users (
    id serial4 NOT NULL PRIMARY KEY,
    "login" varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    CONSTRAINT login_uniq UNIQUE (login)
);