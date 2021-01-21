const db=require('../database')

module.exports.getHeroes=(req,res)=>{
    let heroImagesList
    db.serialize(()=>{
        db.all(`SELECT * FROM Heroes_Images ORDER BY hero_id`,(err,rows)=>{
            if(err){
                console.log('Ошибка получения данных картинок')
                res.status(501).send(err)
            }
            else
                heroImagesList=rows
        })
        db.all(`SELECT * FROM Heroes ORDER BY id`,(err, rows)=>{
            if(err){
                console.log('Ошибка получения данных Героев')
                res.status(502).send(err)
            }
            else{
                rows.forEach(hero=>{
                    //цикл обьединения картинок и информации героев в один обьект
                    hero.imageArray=[]
                    heroImagesList.forEach(image=>{
                        if(image.hero_id===hero.id)
                            hero.imageArray.push(image.image)
                    })
                })
                res.send(rows)
            }
        })
    })
}
module.exports.createHeroes=(req,res)=>{
    db.serialize(()=>{
        db.run(`INSERT INTO Heroes (nickname, realName, originDescription, superpowers, catchPhrase)
        VALUES ("${req.body.nickname}", "${req.body.realName}", "${req.body.originDescription}", "${req.body.superpowers}", "${req.body.catchPhrase}")`
        ,function (err){
            if(err){
                console.error('Errorr'+err)
                return res.status(503).send(err)
            }
            else{
                let heroId=this.lastID
                req.body.imageArray.map(image=>{
                    db.run(`INSERT INTO Heroes_Images (hero_id, image)
                    VALUES (${heroId}, "${image.dataUrl}")`,err=>{
                        if(err)
                            return res.status(504).send(err)
                    })
                })
                res.send({success: 'true'})
            }
            // sqlImages=`INSERT INTO Heroes_Images (hero_id, image) 
            // VALUES ` + req.body.imageArray.map(image=>`(${heroId}, "${image.dataUrl}")`).join(', ')
        })
        // db.run(sqlImages,err=>{
        //     if(err){
        //         console.error(err)
        //         return res.status(504).send(err)
        //     }
        //     res.send('Success')
        // })
        

    })
}
module.exports.deleteHeroes=(req,res)=>{
    db.serialize(()=>{
        db.run(`DELETE FROM Heroes WHERE id = ${req.body.id}`,err=>{
            if(err){
                console.error('Errorr'+err)
                return res.status(505).send(err)
            }
        })
        db.run(`DELETE FROM Heroes_Images WHERE hero_id = ${req.body.id}`,err=>{
            if(err){
                console.error('Errorr'+err)
                return res.status(506).send(err)
            }
            else
                res.send({success: 'true'})
        })
    })
}
module.exports.updateHeroes=(req,res)=>{
    db.serialize(()=>{
        db.run(`UPDATE Heroes SET 
        nickname = '${req.body.nickname}',
        realName = '${req.body.realName}',
        originDescription = '${req.body.originDescription}',
        superpowers = '${req.body.superpowers}',
        catchPhrase = '${req.body.catchPhrase}'
        WHERE id = ${req.body.id}`
        ,function (err){
            if(err){
                console.error('Errorr'+err)
                return res.status(507).send(err)
            }
            else{
                db.run(`DELETE FROM Heroes_Images WHERE hero_id = ${req.body.id}`,err=>{
                    if(err){
                        console.error('Errorr'+err)
                        return res.status(508).send(err)
                    }
                    else{
                        req.body.imageArray.map(image=>{
                            db.run(`INSERT INTO Heroes_Images (hero_id, image)
                            VALUES (${req.body.id}, "${image.dataUrl}")`,err=>{
                                if(err)
                                    return res.status(509).send(err)
                            })
                        })
                        res.send({success: 'true'})
                    }    
                })
            }
        })
    })
}
