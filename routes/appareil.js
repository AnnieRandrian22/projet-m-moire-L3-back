const express = require('express');
const connection = require('../connection');
const router = express.Router();


//recupérations
router.get("/getAll", (req, res) => {
    sql = "select * from appareil";
    connection.query(sql, (err, result) => {
        if (!err) {
            return res.status(200).json(result)
        } else {
            return res.status(500).json(err)
        }

    })

});
//recupération
router.get("/get/:id", (req, res) => {
    const idApp = req.params.id;
    sql = "select * from appareil where idApp=?";
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
    const appareil = req.body;
    sql = "insert into appareil(designationApp, typeApp, dateArrive, marqueApp,nombreApp) values(?,?,?,?,?)";
    connection.query(sql, [appareil.designationApp, appareil.typeApp, appareil.dateArrive, appareil.marqueApp, appareil.nombreApp], (err, result) => {
        if (!err) {
            return res.status(200).json("L'appareil a bien été enregistré!")
        } else {
            return res.status(500).json(err);
            console.log("une erreur est survénue pendant l'opération")
        }

    })

});

//mise à jour
router.put("/maj", (req, res) => {
    const appareil = req.body;
sql = "update appareil set designationApp=?, typeApp=?, dateArrive=?, marqueApp=?, nombreApp=? where idApp=?";
connection.query(sql, [appareil.designationApp, appareil.typeApp, appareil.dateArrive, appareil.marqueApp, appareil.nombreApp, appareil.idApp], (err, result) => {
        if (!err) {
            return res.status(200).json("Mise à jour éffectué")
        } else {

            console.log("une erreur est survénue pendant l'opération")
        }

    })
});

//supression
router.delete("/delete/:id", (req, res) => {
    const idApp = req.params.id;n
    sql = "delete from appareil where idApp=?";
    connection.query(sql, [idApp], (err, result) => {
        if (!err) {
            return res.status(200).json("Suppression éffectué")
        } else {
            return res.status(500).json(err)
        }

    })
});




// *********************************************************

router.get("/omeoDoly/:zvtr", (req, res) => {
    const x = req.params.zvtr;
    console.log("ao fa omena ", x)
});


router.delete("/delete", (req, res) => {
    const corps = req.body;
    console.log("voafafa ny ", corps.type);
    return res.status(200).json("voafafa ny " + corps.type)
});
router.post("/add", (req, res) => {
    const appareil = req.body;
    console.log(appareil.nomApp);
});
router.get("/get/:baba", (req, res) => {
    const idApp = req.params.baba;
    console.log(idApp);
});

// *********************************************************

//recupération somme des nombres non rendu
router.get("/getSomme", (req, res) => {
    //const lisitra= req.body;
    sql =`select SUM(lignecomsortie.nombreApp) AS sommeAppareil FROM lignecomsortie
            JOIN sortie ON lignecomsortie.idSortie = sortie.idSortie WHERE is_Rendu=false`;
    connection.query(sql, (err, result) => {
        if (!err) {
            return res.status(200).json(result)
            console.log(result)
        } else {
            console.log(err);
            return res.status(500).json(err)
        }
    })

});


//recupération liste des appareils selctionné
router.post("/sortieApp", (req, res) => {
    const DH = new Date();
    const localDate= DH.toISOString().split('T')[0];
    const localTime= DH.toLocaleTimeString();
    const {listApp, delegInfo} = req.body;

    sql3= "INSERT into sortie(matiere, parcours, nomDelegue, numCE, niveau, DSortie, HSortie, is_rendu) values(?,?,?,?,?,?,?,?)" //fandefasana ny ifomation'ny délégué any @ sortie
    connection.query(sql3,[delegInfo.matiere, delegInfo.parcours, delegInfo.nomDelegue,
        delegInfo.numCE,delegInfo.niveau,localDate, localTime,0], (err3, result3) => {
        if(err3){
            console.log("erreur 3", err3)
            return res.status(500).json(err3) 
        }
        const idSortie = result3.insertId; // idSortie an'ilay sortie natao vo teo
        console.log(idSortie)
        for(let idApp of Object.keys(listApp)){
            const valeur = listApp[idApp];
            const nbrUtilise = valeur.nbrUtilise;
            sql = "SELECT nombreApp FROM appareil WHERE idApp=?"; //maka ny nombre'ny appareil hiray atao mise à jour rehefa séléctonné any @ table sortie
            connection.query(sql, [idApp],(err, result) => {
            if (!err) {
                const nbrDispo = result[0].nombreApp;  //haza ny nombre'ny appareil iray (natao anaty var nbrDispo)
                let newNbr = nbrDispo - nbrUtilise;     //newNbr: ny isan'ny appareil sisa rehefa nangalana
                sql2 = "UPDATE appareil SET nombreApp=?  WHERE idApp=?";    //natao update any @ mysql (satria efa nangalana)
                connection.query(sql2,[newNbr, idApp], (err2, result2) => {
                    if(err2){ 
                        console.log("erreur 2", err2)
                        return res.status(500).json(err2)
                    }
                    else{
                        sql3= "INSERT into lignecomsortie(idSortie, nombreApp, idApp) values(?,?,?)" //fandeafasana ny information'ny appareil izay nalain'ny délégué iray any @ table ligne de commande
                        connection.query(sql3,[idSortie, nbrUtilise, idApp], (err3, result3) => {
                            if(err3){
                                console.log("erreur 3", err3)
                                return res.status(500).json(err3) 
                            }

                        })
                    } 
                })
            } else {
                console.log(err);
                return res.status(500).json(err)
            }
        })
        }
        
        return res.status(200).json({message: "Opération effectuée avec succès"}) 
 
    })
    
});

//recupération somme des nombres
// router.get("/getSomme", (req, res) => {
//     //const lisitra= req.body;
//     sql = "select SUM(nombreApp) AS sommeAppareil FROM sortie";
//     connection.query(sql, (err, result) => {
//         if (!err) {
//             return res.status(200).json(result)
//         } else {
//             console.log(err);
//             return res.status(500).json(err)
//         }
//     })

// });


//recupération appareil disponible

router.get("/getAppDispo", (req, res) => {
    //const lisitra= req.body;
    sql = `SELECT (SELECT SUM(nombreApp) FROM appareil) - (select SUM(lignecomsortie.nombreApp) AS sommeAppareil FROM lignecomsortie
    JOIN sortie ON lignecomsortie.idSortie = sortie.idSortie WHERE is_Rendu=true) AS difference 
    WHERE (SELECT SUM(nombreApp) FROM appareil) >= (select SUM(lignecomsortie.nombreApp) AS sommeAppareil FROM lignecomsortie
    JOIN sortie ON lignecomsortie.idSortie = sortie.idSortie WHERE is_Rendu=true)`;
    connection.query(sql, (err, result) => {
        if (!err) {
            return res.status(200).json(result)
        } else {
            console.log(err);
            return res.status(500).json(err)
        }
    })
});

module.exports = router;
// sql="update appareil set designation=gaga, type=trata, marque=lala where id=1"