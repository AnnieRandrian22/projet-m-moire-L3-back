const express = require('express');
const connection = require('../connection');
const router = express.Router();

//recupérations
router.get("/getAll", (req, res) => {
    sql = "select * from demande";
    connection.query(sql, (err, result) => {
        if (!err) {
            return res.status(200).json(result)
        } else {
            return res.status(500).json(err)
        }
    })
});

//recupérations sur le popup détails
router.get("/getAllDetails/:id", (req, res) => {
    const idApp = req.params.id;
    sql = "select nomHotel, lieuHotel, contactHotel, nomNegoc from demande where idHotel=?";
    connection.query(sql, [idApp],(err, result) => {
        if (!err) {
            return res.status(200).json(result[0])
        } else {
            return res.status(500).json(err)
        }

    })

});

//recupération
router.get("/get/:id", (req, res) => {
    const idApp = req.params.id;
    sql = "select * from demande where idHotel=?";
    connection.query(sql, [idApp],(err, result) => {
        if (!err) {
            return res.status(200).json(result[0])
        } else {
            return res.status(500).json(err)
        }

    })

});



//ajout
router.post("/add", (req, res) => {
    const demande = req.body;
    sql = "insert into demande(nomHotel, lieuHotel, dateDemande, contactHotel, statusDemande, nomNegoc) values(?,?,?,?,?,?)";
    connection.query(sql, [demande.nomHotel, demande.lieuHotel, demande.dateDemande, demande.contactHotel, 'En attente', demande.nomNegoc], (err, result) => {
        if (!err) {
            return res.status(200).json("Le demande a bien été enregistré!")
        } else {
            return res.status(500).json(err);
            console.log("une erreur est survénue pendant l'opération")
        }

    })

});

//mise à jour
router.put("/maj", (req, res) => {
    const demande = req.body;
sql = "update demande set nomHotel=?, lieuHotel=?, dateDemande=? where idHotel=?";
connection.query(sql, [demande.nomHotel, demande.lieuHotel, demande.dateDemande, demande.idHotel], (err, result) => {
        if (!err) {
            return res.status(200).json("Mise à jour éffectué")
        } else {

            console.log("une erreur est survénue pendant l'opération")
        }
    })
});

//supression
router.delete("/delete/:id", (req, res) => {
    const idHotel = req.params.id;
    sql = "delete from demande where idHotel=?"; 
    connection.query(sql, [idHotel], (err, result) => {
        if (!err) {
            return res.status(200).json("Suppression éffectué")
        } else {
            return res.status(500).json(err)
        }
    })
});

//ajout demande aprouvé dans utilisateur
router.post("/add", (req, res) => {
    const utilisateur = req.body;
    sql = "insert into utilisateur(nomHotel, lieuHotel) values(?,?)";
    connection.query(sql, [utilisateur.nomHotel, utilisateur.lieuHotel], (err, result) => {
        if (!err) {
            return res.status(200).json("Le demande a bien été enregistré!")
        } else {
            return res.status(500).json(err);
            console.log("une erreur est survénue pendant l'opération")
        }

    })

});

module.exports = router;