alter table missing_person add column file_group_id integer null;
alter table missing_person add constraint file_group_fk foreign key (file_group_id) references file_group (id);
