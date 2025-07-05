ALTER TABLE user_profiles
ALTER COLUMN social_links TYPE varchar(255) USING social_links::text; 