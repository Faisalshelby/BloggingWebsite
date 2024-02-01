-- Your database initialisation SQL here
DROP TABLE IF EXISTS web_comments;
DROP TABLE IF EXISTS web_article;
DROP table if exists web_users;

-- Users Table
create table if not exists web_users(
    id int not null auto_increment,
    firstname text,
    lastname text,
    username varchar(200) not null ,
    password varchar(200) not null ,
    avatar text not null default '/images/avatars/avatar1.png',
    primary key (id),
    constraint unique_username unique (username)
);

-- Articles Table , TODO Add Likes for articles
CREATE TABLE IF NOT EXISTS web_article(
    id int not null auto_increment,
    content text,
    creator_id int not null ,
    primary key (id),
    FOREIGN KEY (creator_id) references web_users(id)
                                      );
-- Comments Table , TODO Comments section reorganise
CREATE TABLE IF NOT EXISTS web_comments(
                                           comment_id int not null auto_increment,
                                           comment_content text,
                                           user_id int,
                                           article_id int,
                                           date_time timestamp,
                                           PRIMARY KEY (comment_id),
    FOREIGN KEY (user_id) references web_users(id),
    FOREIGN KEY (article_id) references web_article(id)
);

INSERT INTO web_users(id, firstname, lastname, username, password,avatar) values
                                                                (1,'user','one','user1','password','/images/avatars/avatar1.png'),
                                                                (2,'user','two','user2','password2','/images/avatars/avatar2.png'),
                                                                (3,'user','three','user3','passwor3','/images/avatars/avatar3.png');

INSERT INTO web_article(id, content, creator_id) VALUES
                                                     (1,'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi etiam dignissim diam quis enim lobortis. Platea dictumst vestibulum rhoncus est pellentesque. Pretium aenean pharetra magna ac placerat. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Turpis egestas pretium aenean pharetra. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Integer malesuada nunc vel risus commodo viverra maecenas accumsan. Mauris augue neque gravida in fermentum et sollicitudin ac. Ornare arcu odio ut sem nulla pharetra.</p>',2),
                                                     (2,'<p>In iaculis nunc sed augue lacus viverra. Odio ut sem nulla pharetra diam sit amet nisl suscipit. Vitae auctor eu augue ut lectus arcu bibendum at varius. Tincidunt augue interdum velit euismod in. Sed libero enim sed faucibus turpis in eu mi bibendum. Nibh ipsum consequat nisl vel. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mattis molestie a iaculis at erat pellentesque. Quam viverra orci sagittis eu volutpat. Mattis aliquam faucibus purus in massa tempor nec feugiat nisl. Dignissim sodales ut eu sem integer vitae justo eget. Est ante in nibh mauris cursus. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Gravida rutrum quisque non tellus. Amet dictum sit amet justo donec enim diam vulputate. Pretium lectus quam id leo. Facilisi etiam dignissim diam quis. Nec tincidunt praesent semper feugiat nibh sed. Leo in vitae turpis massa sed elementum tempus egestas.</p>',3);


INSERT INTO web_comments (comment_content, user_id, article_id, date_time) VALUES
                                                                               ('comment 1',2,1,NOW()),
                                                                                ('comment 2',1,2,NOW());
