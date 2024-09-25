create database desimaginarium;
use desimaginarium;

create table Usuarios(
	id int primary key not null auto_increment,
    name varchar(45),
    email varchar(45),
    password Varchar(45)
);

alter table Usuarios add column perfil enum('Admin','usuario') default('usuario');

create table carrinho(
	id int primary key not null auto_increment,
    carrinhoCol varchar(45),
    produtos_id INT,
    usuarios_id INT
);

create table produtos(
	id int primary key not null auto_increment,
    valor float not null,
    name varchar(45) not null,
	imagem text not null
);

create table favoritos(
	id int primary key not null auto_increment,
    Favoritados enum('Favorito', 'Não favorito') default ('Favorito'),
    produtos_id int,
    usuarios_id int
);

insert into produtos(valor,name,info_produto) values (1.500, "Capivara básica", "A Capivara Voadora básica é uma criatura mítica com asas, simbolizando a harmonia entre a terra e o céu"),
(2.000, "Capivara amarela", "A Capivara amarela é uma criatura mítica com asas, simbolizando a harmonia entre a terra e o céu.");

alter table carrinho add foreign key(produtos_id) references produtos(id);
alter table carrinho add foreign key(Usuarios_id) references Usuarios(id);
alter table favoritos add foreign key(usuarios_id) references Usuarios(id);
alter table favoritos add foreign key(produtos_id) references Produtos(id);