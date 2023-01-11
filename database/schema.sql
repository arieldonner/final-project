set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."events" (
	"eventId" serial NOT NULL,
	"eventName" TEXT NOT NULL,
	"startDate" DATE NOT NULL,
	"startTime" TIME NOT NULL,
	"endTime" TIME NOT NULL,
	"locationName" TEXT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "events_pk" PRIMARY KEY ("eventId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."outfits" (
	"outfitId" serial NOT NULL,
	"userId" integer NOT NULL,
	"outfitImg" TEXT NOT NULL,
	"outfitName" TEXT NOT NULL,
	"category" TEXT NOT NULL,
	"bottoms" TEXT,
	"makeup" TEXT,
	"star" BOOLEAN NOT NULL,
	CONSTRAINT "outfits_pk" PRIMARY KEY ("outfitId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "events" ADD CONSTRAINT "events_fk2" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "outfits" ADD CONSTRAINT "outfits_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
