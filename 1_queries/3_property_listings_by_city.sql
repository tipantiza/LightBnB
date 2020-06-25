SELECT properties.*, AVG(rating) as average_rating
FROM properties
JOIN property_reviews ON property_id = properties.id
WHERE city like '%ancouv%'
GROUP BY properties.id
HAVING AVG(property_reviews.rating) >= 4
ORDER by cost_per_night
LIMIT 10
;