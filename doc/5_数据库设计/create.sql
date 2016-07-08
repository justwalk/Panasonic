-- Table: "Log"


DROP TABLE IF EXISTS "public"."Log";
CREATE TABLE "Log"
(
  id serial NOT NULL,
  type character varying,
  host_name character varying,
  "time" timestamp,
  user_name character varying,
  os character varying,
  process_id character varying,
  application character varying,
  message character varying,
  CONSTRAINT "Log_pkey" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Log"
  OWNER TO postgres;




-- Table: "Task"


DROP TABLE IF EXISTS "public"."Task";
CREATE TABLE "Task"
(
  id serial NOT NULL,
  name character varying,
  action character varying,
  memo character varying,
  execute character varying,
  cycle character varying,
  weekdays character varying,
  month_days character varying,
  date character varying,
  countdown integer,
  command character varying,
  mac character varying,
  prefix character varying,
  size integer,
  start_number integer,
  update_mode character varying,
  update_wait_time integer,
  snapshot_comment character varying,
  "time" character varying,
  computer_uuid character varying,
  computer_name character varying,
  menu_pack_id character varying,
  last_run_status character varying,
  last_run_date timestamp with time zone,
  last_run_log character varying,
  next_execution_date timestamp with time zone,
  enable boolean, -- 「有効」=true 「無効」=false
  CONSTRAINT "Task_pkey" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Task"
  OWNER TO postgres;
COMMENT ON COLUMN "Task".enable IS '「有効」=true 「無効」=false';




DROP TABLE IF EXISTS "public"."User";
CREATE TABLE "public"."User" (
"id" serial NOT NULL,
"username" varchar COLLATE "default",
"password" varchar COLLATE "default",
"name" varchar COLLATE "default",
"role" varchar COLLATE "default",
"isopen" bool DEFAULT true,
"lastreadtime" timestamptz(6),
"lastlogintime" timestamptz(6),
"width" int4,
"height" int4
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."User" ADD PRIMARY KEY ("id");





DROP TABLE IF EXISTS "public"."UserMenu";
CREATE TABLE "UserMenu"
(
  id serial NOT NULL,
  userid integer,
  menuid integer,
  CONSTRAINT "UserMenu_pkey" PRIMARY KEY (id)
)

DROP TABLE IF EXISTS "public"."Menu";
CREATE TABLE "Menu"
(
  id serial NOT NULL,
  page character varying,
  name character varying,
  classname character varying,
  description character varying,
  superior integer,
  CONSTRAINT "Menu_pkey" PRIMARY KEY (id)
)



DROP TABLE IF EXISTS "public"."ComputerInfo";
CREATE TABLE "ComputerInfo"
(
  id serial NOT NULL,
  cid integer,
  ip character varying,
  mac character varying,
  boot_menu_id integer,
  boot_menu_name character varying,
  menu_detail character varying,
  boot_image_id integer,
  boot_image_name character varying,
  os character varying,
  logon_user character varying,
  logon_time character varying,
  boot_time character varying,
  update_time timestamp with time zone,
  CONSTRAINT "ComputerInfo_pkey" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "ComputerInfo"
  OWNER TO postgres;


 DROP TABLE IF EXISTS "public"."TaskLogFile";
CREATE TABLE "TaskLogFile"
(
  id serial NOT NULL,
  taskid integer,
  folder character varying,
  CONSTRAINT "TaskLogFile_pkey" PRIMARY KEY (id)
)
