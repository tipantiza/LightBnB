DELETE  FROM users;
DELETE  FROM properties;
DELETE  FROM reservations;
DELETE  FROM property_reviews;

INSERT INTO users(name, email, password) 
VALUES ('Landon', 'landontipantiza@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('Jalayna', 'jalaynatipantiza@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('Rheema', 'rheematimmer@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.')
;
INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code, number_of_bedrooms, number_of_bathrooms, parking_spaces, cost_per_night) 
VALUES (2, 'blank corner', 'description','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fhouse%2F&psig=AOvVaw0jmktOxm5UrCzMAv8C9xZy&ust=1593121222703000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPj90J21m-oCFQAAAAAdAAAAABAD', 'https://thearchitectsdiary.com/wp-content/uploads/2020/04/pexels-photo-186077.jpeg', 'canada', '126 cooper cres', 'saskatoon', 'saskatchewan', 's7e 3h6', 3, 6, 1, 100) ,
       (1,'fun glad', 'description','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2Fphotos%2Fhouse&psig=AOvVaw0jmktOxm5UrCzMAv8C9xZy&ust=1593121222703000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPj90J21m-oCFQAAAAAdAAAAABAM', 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&w=1000&q=80', 'canada', '128 cooper cres', 'saskatoon', 'saskatchewan', 's7e 7m6', 12, 1, 4, 300),
       (1,'game fill', 'description','https://www.google.com/url?sa=i&url=https%3A%2F%2Fboty.archdaily.com%2Fus%2F2020%2Fcandidates%2F128864%2Fhouse-in-the-landscape-slash-niko-architect&psig=AOvVaw0jmktOxm5UrCzMAv8C9xZy&ust=1593121222703000AABAY', 'https://i.pinimg.com/originals/90/97/a5/9097a56138d7eef3a9b91bb76c6c2212.jpg', 'canada', '127 cooper cres', 'saskatoon', 'saskatchewan', 'd9s s8h', 1, 7, 0, 100)
;
INSERT INTO reservations(start_date, end_date, property_id, guest_id) 
VALUES ('2020-06-25', '2020-06-30', 1, 1),
       ('2020-07-13', '2020-07-20', 2, 3),
       ('2020-12-1', '2020-12-15', 3, 2)
;
INSERT INTO property_reviews(guest_id, property_id, reservation_id, message, rating) 
VALUES (1, 1, 1, 'message', 4),
       (3, 2, 2, 'message', 2),
       (2, 3, 3, 'message', 3.5)
;