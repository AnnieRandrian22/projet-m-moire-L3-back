const express = require('express');
const connection = require('../connection');
const router = express.Router();

//recupérations des données dans la table sortie pour les afficher au tableau sortie
router.get("/getAll", (req, res) => {
    //const lisitra= req.body;
    sql = `SELECT sortie.idSortie, sortie.matiere, sortie.parcours, sortie.nomDelegue, sortie.numCE, 
    sortie.niveau, sortie.Dsortie, sortie.Hsortie, sortie.is_rendu from sortie `; //SELECT sortie.idSortie, sortie.typeApp, 
    //sortie.matiere, sortie.parcours, sortie.nomDelegue, sortie.numCE, sortie.niveau,sortie.Dsortie, sortie.Hsortie, 
    //sortie.nombreApp, appareil.designationApp from sortie JOIN appareil ON sortie.idApp=appareil.idApp
    connection.query(sql, (err, result) => {
        if (!err) {
            return res.status(200).json(result)
        } else {
            console.log(err);
            return res.status(500).json(err)
        }
    })

}); 

// recupéraions de tout les appareils rendu
router.get("/getAllRendu", (req, res) => {
    //const lisitra= req.body;
    sql = `SELECT sortie.idSortie, sortie.matiere, sortie.parcours, sortie.nomDelegue, sortie.numCE, 
    sortie.niveau, sortie.Dsortie, sortie.Hsortie, sortie.is_rendu from sortie where sortie.is_rendu=1`; //SELECT sortie.idSortie, sortie.typeApp, sortie.matiere, sortie.parcours, sortie.nomDelegue, sortie.numCE, sortie.niveau,sortie.Dsortie, sortie.Hsortie, sortie.nombreApp, appareil.designationApp from sortie JOIN appareil ON sortie.idApp=appareil.idApp
    connection.query(sql, (err, result) => {
        if (!err) {
            return res.status(200).json(result)
        } else {
            console.log(err);
            return res.status(500).json(err)
        }
    })
        
}); 

//recupération ligne commande (nom appareil nalaina, isan'ny apparil nalaina ) @ alalan'ny idSortie
router.get("/getList/:idSortie", (req, res) => {
    //const lisitra= req.body;
    const idSortie = req.params.idSortie
    sql = `SELECT appareil.designationApp,lignecomsortie.nombreApp FROM lignecomsortie JOIN appareil ON lignecomsortie.idApp = appareil.idApp WHERE idSortie=?`;
    connection.query(sql, [idSortie], (err, result) => {
        if (!err) {
            return res.status(200).json(result)
        } else {
            console.log(err);
            return res.status(500).json(err)
        }
    })

});

//ajout 
router.post("/add", (req, res)=>{
    const sortie = req.body;
    sql="insert into sortie(idApp,typeApp, matiere, parcours, nomDelegue, numCE, niveau, Dsortie, Hsortie, nombreApp)values(?,?,?,?,?,?,?,?,?,?)"
    connection.query(sql, [sortie.idApp, sortie.typeApp, sortie.matiere, sortie.parcours, sortie.nomDelegue, sortie.numCE, sortie.niveau, sortie.Dsortie, sortie.Hsortie, sortie.nombreApp], (err, result) => {
        if (!err) {
            return res.status(200).json("L'appareil a bien été enregistré!")
        } else {
            return res.status(500).json(err);
            console.log("une erreur est survénue pendant l'opération")
        }
    })
})
 
//recupération
router.get("/get/:id", (req, res) => {
    const idSortie = req.params.id;
    sql = "select * from sortie where idSortie=?";
    connection.query(sql, [idSortie],(err, result) => {
        if (!err) {
            console.log(result)
            return res.status(200).json(result[0])
        } else {
            return res.status(500).json(err)
        }
    })
});


//mise à jour
router.post("/postRendu/:id", (req, res)=> {
    const idSortie = req.params.id;
    sql = "UPDATE sortie SET is_rendu=1 WHERE idSortie=?";
    connection.query(sql, [idSortie],(err, result) =>{
        if(!err) {
            return res.status(200).json(result)
        }
        else{
            return res.status(500).json(err)
        }
    })
})

//suppression



module.exports = router;