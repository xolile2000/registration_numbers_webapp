create table towns(
	id serial not null primary key,
	townname text not null,
    townstring text not null
);



create table regNumbers (
	id serial not null primary key,
    reg text not null,
	town_id int,
	foreign key (town_id) references towns(id)
);
insert into towns(townname,townstring) values ('Cape town','CA');
insert into towns(townname,townstring) values ('Bellville','CY');
insert into towns(townname,townstring) values ('Paarl','CJ');
