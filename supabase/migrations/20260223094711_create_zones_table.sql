/*
  # Create zones table

  1. New Tables
    - `zones`
      - `id` (uuid, primary key)
      - `num` (integer, auto-increment, unique zone number)
      - `villes` (text, cities covered by zone)
      - `libelle` (text, zone label/name)
      - `descriptions` (text, detailed zone description)
      - `nom_chef_agence` (text, agency manager name)
      - `telephone` (text, contact phone number)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `zones` table
    - Add policy for authenticated users to read all zones
    - Add policy for authenticated users to create/update/delete zones

  3. Data
    - Insert 5 demo zones with sample data
*/

CREATE TABLE IF NOT EXISTS zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  num SERIAL UNIQUE NOT NULL,
  villes text NOT NULL,
  libelle text NOT NULL UNIQUE,
  descriptions text,
  nom_chef_agence text,
  telephone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE zones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Zones are readable by authenticated users"
  ON zones FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert zones"
  ON zones FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update zones"
  ON zones FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete zones"
  ON zones FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO zones (villes, libelle, descriptions, nom_chef_agence, telephone) VALUES
  ('Douala, Buea, Limbé', 'Zone Littoral', 'Zone côtière couvrant les villes principales', 'Jean Dupont', '+237 6 71 23 45 67'),
  ('Yaoundé, Soa', 'Zone Centre', 'Zone centrale administrative', 'Marie Kamdem', '+237 6 81 34 56 78'),
  ('Bafoussam, Mbouda', 'Zone Ouest', 'Zone montagneuse de l''ouest', 'Pierre Fotso', '+237 6 91 45 67 89'),
  ('Garoua, Ngaoundéré', 'Zone Nord', 'Zone nord-camerounaise', 'Ahmed Hassan', '+237 6 61 56 78 90'),
  ('Bertoua, Battouri', 'Zone Est', 'Zone forestière de l''est', 'Sophie Nkomo', '+237 6 51 67 89 01')
ON CONFLICT (libelle) DO NOTHING;
