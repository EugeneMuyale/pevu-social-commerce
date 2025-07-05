-- Migration: Make fullName and username columns nullable in user_profiles
ALTER TABLE user_profiles ALTER COLUMN full_name DROP NOT NULL;
ALTER TABLE user_profiles ALTER COLUMN username DROP NOT NULL; 