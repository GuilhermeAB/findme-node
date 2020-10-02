create table if not exists file_group (
	id SERIAL not null,
	
	primary key (id)
);

create table if not exists file (
	id SERIAL not null,
	file_group_id integer not null,
	name text null,
	file_type text not null,
	
	primary key (id),
	constraint file_group_fk foreign key (file_group_id) references file_group (id)
);
