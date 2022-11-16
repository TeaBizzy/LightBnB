INSERT INTO users (name, email, password)
  VALUES 
    ('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, postal_code)
  VALUES
    (1, 'Stud Shack', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 9600, 2, 1, 1, 'Canada', 'Big Man Ave', 'Montreal', 'Quebec', 'X1C3R2'),
    (2, 'Bachelor Bunker', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 12800, 6, 4, 4, 'Austrailia', 'Shrimp on the Barbie Dr', 'Sydney', 'New South Wales', 'RCG112'),
    (3, 'Hunt Camp', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 69420, 12, 6, 10, 'Canada', 'Dollar St', 'Port Lorring', 'Ontario', 'S3X4S5');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
  VALUES
    ('2018-09-11', '2018-09-26', 2, 3),
    ('2019-01-04', '2019-02-01', 2, 2),
    ('2023-10-01', '2023-10-14', 1, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
  VALUES
    (3, 2, 1, 3, 'message'),
    (2, 2, 2, 4, 'message'),
    (3, 1, 3, 4, 'message');