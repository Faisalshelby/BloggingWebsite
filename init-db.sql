-- Your database initialisation SQL here
DROP TABLE IF EXISTS web_article;
DROP table if exists web_users;
create table if not exists web_users(
    id int not null auto_increment,
    firstname text,
    lastname text,
    username varchar(200) not null ,
    password varchar(200) not null ,
    primary key (id),
    constraint unique_username unique (username)
);


CREATE TABLE IF NOT EXISTS web_article(
    id int not null auto_increment,
    content text,
    creator_id int not null ,
    primary key (id),
    FOREIGN KEY (creator_id) references web_users(id)

                                      );

INSERT INTO web_users(id, firstname, lastname, username, password) values
                                                                (1,'user','one','user1','password'),
                                                                (2,'user','two','user2','password2'),
                                                                (3,'user','three','user3','passwor3');

INSERT INTO web_article(id, content, creator_id) VALUES
                                                     (1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi etiam dignissim diam quis enim lobortis. Platea dictumst vestibulum rhoncus est pellentesque. Pretium aenean pharetra magna ac placerat. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Turpis egestas pretium aenean pharetra. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Integer malesuada nunc vel risus commodo viverra maecenas accumsan. Mauris augue neque gravida in fermentum et sollicitudin ac. Ornare arcu odio ut sem nulla pharetra.',2),
                                                     (2,'In iaculis nunc sed augue lacus viverra. Odio ut sem nulla pharetra diam sit amet nisl suscipit. Vitae auctor eu augue ut lectus arcu bibendum at varius. Tincidunt augue interdum velit euismod in. Sed libero enim sed faucibus turpis in eu mi bibendum. Nibh ipsum consequat nisl vel. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mattis molestie a iaculis at erat pellentesque. Quam viverra orci sagittis eu volutpat. Mattis aliquam faucibus purus in massa tempor nec feugiat nisl. Dignissim sodales ut eu sem integer vitae justo eget. Est ante in nibh mauris cursus. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Gravida rutrum quisque non tellus. Amet dictum sit amet justo donec enim diam vulputate. Pretium lectus quam id leo. Facilisi etiam dignissim diam quis. Nec tincidunt praesent semper feugiat nibh sed. Leo in vitae turpis massa sed elementum tempus egestas.',3)


