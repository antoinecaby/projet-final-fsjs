import express from "express";
import bodyParser from "body-parser";
import mariadb from "mariadb";
import cors from "cors";
import bcrypt from "bcrypt";

const pool = mariadb.createPool({
  host: "mysql-antoineprojetfsjs.alwaysdata.net",
  user: "339027_admin",
  password: "xoknC@$?K!4sY?Jm",
  database: "antoineprojetfsjs_projet_final_fsjs",
  connectionLimit: 5,
});

const app = express();
app.use(bodyParser.json());

// ---------- ---------- ---------- ---------- ----------
// A partir d'ici, les fonctions permettent de gérer les users (login, register, update, delete)

// Fetch pour login

app.post("/api/auth/login", async (req, res) => {
  const user = req.body;
  console.log("login request for user", user);

  const connection = await pool.getConnection();
  try {
    const queryResult = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [user.email]
    );
    console.log(queryResult);
    if (queryResult.length > 0) {
      const storedPassword = queryResult[0].mdp;
      const isAdmin = queryResult[0].admin;

      const passwordMatch = await bcrypt.compare(user.mdp, storedPassword);

      if (passwordMatch) {
        // Vérifier si un token existe déjà pour cet utilisateur
        const tokenExists = await connection.query(
          "SELECT * FROM user_token WHERE id_user = ?",
          [queryResult[0].id]
        );

        if (tokenExists.length === 0) {
          // Création d'un token aléatoire
          const token = String(
            `${user.email}-${Number(new Date()).toString(36)}`
          );
          // Ajout du token dans la BDD (pour l'associer au user)
          await connection.query(
            "INSERT INTO user_token (id_user, token) VALUES (?, ?)",
            [queryResult[0].id, token]
          );
          res.json({ token, isAdmin });
        } else {
          res.json({ token: tokenExists[0].token, isAdmin });
        }
      } else {
        res.status(401).json({ message: "Mot de passe incorrect" });
      }
    } else {
      res
        .status(401)
        .json({ message: "Aucun utilisateur trouvé avec cet email" });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la vérification de l'utilisateur",
    });
  } finally {
    await connection.end();
  }
});

// Fetch pour register un user

app.post("/api/auth/register", async (req, res) => {
  const user = req.body;
  console.log("register request for user", user);

  const connection = await pool.getConnection();
  try {
    const existingUser = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [user.email]
    );

    if (existingUser.length > 0) {
      res.status(409).json({
        message: "Un utilisateur existe déjà avec cette adresse mail",
      });
    } else {
      const hashedPassword = await bcrypt.hash(user.mdp, 1);

      await connection.query(
        "INSERT INTO users (email, mdp, admin) VALUES (?, ?, 0)",
        [user.email, hashedPassword]
      );

      res.json({ message: "Utilisateur créé avec succès" });
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la création de l'utilisateur",
    });
  } finally {
    await connection.end();
  }
});

// Fetch pour update un user

app.post("/api/auth/update", async (req, res) => {
  const user = req.body;
  console.log("update request for user", user);

  const connection = await pool.getConnection();
  try {
    const existingUser = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [user.email]
    );

    if (existingUser.length > 0) {
      const hashedPassword = await bcrypt.hash(user.mdp, 1);
      console.log(hashedPassword);

      await connection.query("UPDATE users SET mdp = ? WHERE email = ?", [
        hashedPassword,
        user.email,
      ]);

      res.json({
        message: "Modification de mot de passe effectuée avec succès",
      });
    } else {
      res.status(409).json({
        message: "L'utilisateur n'existe pas",
      });
    }
  } catch (error) {
    console.error("Erreur lors de la modification de l'utilisateur :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la modification de l'utilisateur",
    });
  } finally {
    await connection.end();
  }
});

// Fetch pour supprimer un user

app.post("/api/auth/supp", async (req, res) => {
  const user = req.body;
  console.log("delete request for user", user);

  const connection = await pool.getConnection();
  try {
    const queryResult = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [user.email]
    );
    console.log(queryResult);
    if (queryResult.length > 0) {
      const storedPassword = queryResult[0].mdp;

      const passwordMatch = await bcrypt.compare(user.mdp, storedPassword);

      if (passwordMatch) {
        const connection = await pool.getConnection();
        await connection.query("DELETE FROM users WHERE email = ?", [
          user.email,
        ]);
        await connection.end();

        // Envoyer la réponse après avoir supprimé l'utilisateur avec succès
        res.json({ message: "Utilisateur supprimé avec succès" });
      } else {
        res.status(401).json({ message: "Mot de passe incorrect" });
      }
    } else {
      res
        .status(401)
        .json({ message: "Aucun utilisateur trouvé avec cet email" });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la vérification de l'utilisateur",
    });
  } finally {
    await connection.end();
  }
});

// ---------- ---------- ---------- ---------- ----------
// A partir d'ici, les fonctions permettent de gérer les champions (add, update, delete)

// Fonction qui récupère la liste de tout les champions éxistants

app.get("/api/characters", async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const characters = await connection.query(
      "SELECT id, name, aatype, description FROM characters"
    );

    res.json(characters);
  } catch (error) {
    console.error("Erreur lors de la récupération des personnages :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des personnages",
    });
  } finally {
    await connection.end();
  }
});

// Fonction qui permet d'ajouter un champion (ADD)

app.post("/api/character/add", async (req, res) => {
  const character = req.body;
  console.log("Add character request", character);

  const connection = await pool.getConnection();
  try {
    // Vérifier si le champion existe déjà dans la base de données
    const existingCharacter = await connection.query(
      "SELECT * FROM characters WHERE name = ?",
      [character.name]
    );

    if (existingCharacter.length > 0) {
      res.status(409).json({
        message: "Ce champion existe déjà dans la base de données",
      });
    } else {
      // Ajouter le champion dans la table des champions
      await connection.query(
        "INSERT INTO characters (name, description, aatype) VALUES (?, ?, ?)",
        [character.name, character.description, character.aatype]
      );

      res.json({ message: "Champion ajouté avec succès" });
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du champion :", error);
    res.status(500).json({
      message: "Erreur serveur lors de l'ajout du champion",
    });
  } finally {
    await connection.end();
  }
});

// Fonction qui permet de modifier un champion (UPDATE)

app.post("/api/character/update", async (req, res) => {
  const updatedCharacter = req.body;
  console.log("Update character request", updatedCharacter);

  const connection = await pool.getConnection();
  try {
    // Vérifier si le champion à mettre à jour existe dans la base de données
    const existingCharacter = await connection.query(
      "SELECT * FROM characters WHERE name = ?",
      [updatedCharacter.name]
    );

    if (existingCharacter.length > 0) {
      // Mettre à jour les informations du champion dans la table des champions
      await connection.query(
        "UPDATE characters SET description = ?, aatype = ? WHERE name = ?",
        [
          updatedCharacter.description,
          updatedCharacter.aatype,
          updatedCharacter.name,
        ]
      );

      res.json({
        message: "Champion mis à jour avec succès",
      });
    } else {
      res.status(409).json({
        message: "Ce champion n'existe pas dans la base de données",
      });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du champion :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour du champion",
    });
  } finally {
    await connection.end();
  }
});

// Fonction qui permet de supprimer un champion (DELETE)

app.post("/api/character/delete", async (req, res) => {
  const deleteCharacter = req.body;
  console.log("Delete character request", deleteCharacter);

  const connection = await pool.getConnection();
  try {
    // Vérifier si le champion à mettre à jour existe dans la base de données
    const existingCharacter = await connection.query(
      "SELECT * FROM characters WHERE name = ?",
      [deleteCharacter.name]
    );

    if (existingCharacter.length > 0) {
      await connection.query("DELETE FROM characters WHERE name = ?", [
        deleteCharacter.name,
      ]);

      res.json({
        message: "Champion supprimé avec succès",
      });
    } else {
      res.status(409).json({
        message: "Ce champion n'existe pas dans la base de données",
      });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du champion :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour du champion",
    });
  } finally {
    await connection.end();
  }
});

const PORT = 3000;

app.use(cors());

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
