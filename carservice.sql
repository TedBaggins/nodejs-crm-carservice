--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id character varying(40) NOT NULL,
    fio character varying(60) NOT NULL,
    birthday character varying(40),
    phone character varying(20)
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: cars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cars (
    id character varying(40) NOT NULL,
    mark character varying(20),
    model character varying(20),
    number character varying(20) NOT NULL,
    year integer,
    passport character varying(20),
    client_id character varying(40)
);


ALTER TABLE public.cars OWNER TO postgres;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id character varying(40) NOT NULL,
    fio character varying(60) NOT NULL,
    birthday character varying(50),
    phone character varying(20),
    passport character varying(20),
    driver_license character varying(20)
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- Name: managers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.managers (
    id character varying(40) NOT NULL,
    fio character varying(60) NOT NULL,
    birthday character varying(40),
    phone character varying(20)
);


ALTER TABLE public.managers OWNER TO postgres;

--
-- Name: masters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.masters (
    id character varying(40) NOT NULL,
    fio character varying(60) NOT NULL,
    birthday character varying(40),
    phone character varying(20)
);


ALTER TABLE public.masters OWNER TO postgres;

--
-- Name: orderreports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orderreports (
    id character varying(40) NOT NULL,
    description text,
    order_id character varying(40),
    master_id character varying(40)
);


ALTER TABLE public.orderreports OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id character varying(40) NOT NULL,
    sum integer,
    created_at character varying(40),
    closed_at character varying(40),
    client_id character varying(40),
    car_id character varying(40),
    manager_id character varying(40),
    master_id character varying(40),
    status_id character varying(40)
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: ordersservices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ordersservices (
    id character varying(40) NOT NULL,
    order_id character varying(40),
    service_id character varying(40)
);


ALTER TABLE public.ordersservices OWNER TO postgres;

--
-- Name: orderstatuses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orderstatuses (
    id character varying(40) NOT NULL,
    name character varying(40)
);


ALTER TABLE public.orderstatuses OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id character varying(40) NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id character varying(40) NOT NULL,
    name character varying(150) NOT NULL,
    price integer
);


ALTER TABLE public.services OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying(40) NOT NULL,
    login character varying(20) NOT NULL,
    email character varying(60),
    password character varying,
    role_id character varying(40),
    manager_id character varying(40),
    master_id character varying(40),
    admin_id character varying(40)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.admins VALUES ('7b82b195-1d26-4c92-a60b-28d3097027a2', 'Ермолаев Даниил Михайлович', '485553600000', '79650443566');
INSERT INTO public.admins VALUES ('fc7c3113-4a44-497f-ba8a-47eeea4514cd', 'Зорин Александр Тимурович', '300834000000', '79053668943');


--
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: managers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.managers VALUES ('4d5e7540-e012-4f5b-b756-9bfd8cccd74f', 'Лаврова Виктория Максимовна', '684450000000', '79514504432');
INSERT INTO public.managers VALUES ('e821a025-b410-466f-98d1-8530745d3162', 'Мельников Савелий Даниилович', '634770000000', '79053670875');


--
-- Data for Name: masters; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.masters VALUES ('12cd708c-b8c5-4304-8920-867a4aac9ea0', 'Попов Фёдор Артёмович', '298328400000', '79860454377');
INSERT INTO public.masters VALUES ('9c056b7e-cb89-4923-8c6f-bb921361a0f6', 'Борисов Даниил Тимофеевич', '443653200000', '79990553673');


--
-- Data for Name: orderreports; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ordersservices; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: orderstatuses; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles VALUES ('a2d062b9-14b6-407a-98c4-225fa98d8141', 'admin');
INSERT INTO public.roles VALUES ('436635e5-a097-450c-9564-3e5b3532d27f', 'manager');
INSERT INTO public.roles VALUES ('9b753566-5e21-4f1c-b879-60b2cd12da26', 'master');


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES ('8926abe8-0587-427c-92b3-733a9ac1043e', 'admin', 'admin@mail.com', '$2y$08$LlWru5UUWeoNGjhRkeG4huTjF9cnCeSX1QRJzw2Aie8PRyEAAomFy', 'a2d062b9-14b6-407a-98c4-225fa98d8141', NULL, NULL, NULL);
INSERT INTO public.users VALUES ('62a7ec18-cd4f-496f-8b29-44f233ba1b66', 'manager', 'manager@mail.com', '$2y$08$bASdIf3TJmplFJG5O0eUZOqdSRNNdDRHtPEsqKqFSEQSWa6v9AUh2', '436635e5-a097-450c-9564-3e5b3532d27f', NULL, NULL, NULL);
INSERT INTO public.users VALUES ('e7b8b14c-bf8a-4c11-9e49-9b03797c7819', 'master', 'master@mail.com', '$2y$08$yC7nWXu4OZ5f9FHEtPyxtuQadg.ozxdEfPWDh6SFjJVcAZFpeSRoG', '9b753566-5e21-4f1c-b879-60b2cd12da26', NULL, NULL, NULL);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: cars cars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: managers managers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.managers
    ADD CONSTRAINT managers_pkey PRIMARY KEY (id);


--
-- Name: masters masters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.masters
    ADD CONSTRAINT masters_pkey PRIMARY KEY (id);


--
-- Name: orderreports orderreports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderreports
    ADD CONSTRAINT orderreports_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: ordersservices ordersservices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordersservices
    ADD CONSTRAINT ordersservices_pkey PRIMARY KEY (id);


--
-- Name: orderstatuses orderstatuses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderstatuses
    ADD CONSTRAINT orderstatuses_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cars cars_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id);


--
-- Name: orderreports orderreports_master_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderreports
    ADD CONSTRAINT orderreports_master_id_fkey FOREIGN KEY (master_id) REFERENCES public.masters(id);


--
-- Name: orderreports orderreports_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderreports
    ADD CONSTRAINT orderreports_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: orders orders_car_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_car_id_fkey FOREIGN KEY (car_id) REFERENCES public.cars(id);


--
-- Name: orders orders_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id);


--
-- Name: orders orders_manager_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_manager_id_fkey FOREIGN KEY (manager_id) REFERENCES public.managers(id);


--
-- Name: orders orders_master_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_master_id_fkey FOREIGN KEY (master_id) REFERENCES public.masters(id);


--
-- Name: orders orders_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.orderstatuses(id);


--
-- Name: ordersservices ordersservices_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordersservices
    ADD CONSTRAINT ordersservices_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: ordersservices ordersservices_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordersservices
    ADD CONSTRAINT ordersservices_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id);


--
-- Name: users users_admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.admins(id);


--
-- Name: users users_manager_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_manager_id_fkey FOREIGN KEY (manager_id) REFERENCES public.managers(id);


--
-- Name: users users_master_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_master_id_fkey FOREIGN KEY (master_id) REFERENCES public.masters(id);


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

