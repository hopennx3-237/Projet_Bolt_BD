/*
  # Create agencies table

  1. New Tables
    - `agencies`
      - `id` (uuid, primary key)
      - `num` (integer, auto-increment)
      - `libelle` (text, unique agency name)
      - `description` (text, optional agency description)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `agencies` table
    - Add policy for authenticated users to read all agencies
    - Add policy for authenticated users to create/update/delete agencies

  3. Data
    - Insert demo agencies
*/

CREATE TABLE IF NOT EXISTS agencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  num SERIAL UNIQUE NOT NULL,
  libelle text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agencies are readable by authenticated users"
  ON agencies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert agencies"
  ON agencies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update agencies"
  ON agencies FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete agencies"
  ON agencies FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO agencies (libelle, description) VALUES
  ('Agence Centrale', 'Siège principal de l''organisation'),
  ('Agence Nord', 'Branche régionale Nord'),
  ('Agence Sud', 'Branche régionale Sud'),
  ('Agence Est', 'Branche régionale Est'),
  ('Agence Ouest', 'Branche régionale Ouest')
ON CONFLICT (libelle) DO NOTHING;
