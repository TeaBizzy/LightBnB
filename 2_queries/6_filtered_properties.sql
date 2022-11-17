SELECT properties.*, avg(rating) as average_rating
FROM properties
JOIN property_reviews ON property_id = properties.id
WHERE properties.city LIKE $1 AND cost_per_night >= $2 AND cost_per_night <= $3
GROUP BY properties.id
HAVING avg(rating) >= $4
ORDER BY cost_per_night
LIMIT $5;