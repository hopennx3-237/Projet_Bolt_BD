/*
  # Create cities table

  1. New Tables
    - `cities`
      - `id` (uuid, primary key)
      - `num` (integer, auto-increment)
      - `libelle` (text, unique city name)
      - `description` (text, optional city description)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `cities` table
    - Add policy for authenticated users to read all cities
    - Add policy for authenticated users to create/update/delete cities

  3. Data
    - Insert demo cities (Douala, Yaoundé, Bafoussam)
*/

CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  num SERIAL UNIQUE NOT NULL,
  libelle text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cities are readable by authenticated users"
  ON cities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert cities"
  ON cities FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update cities"
  ON cities FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete cities"
  ON cities FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO cities (libelle, description) VALUES
  ('Douala', 'Capitale économique du Cameroun'),
  ('Yaoundé', 'Capitale politique du Cameroun'),
  ('Bafoussam', 'Chef-lieu de la région de l''Ouest')
ON CONFLICT (libelle) DO NOTHING;
