let axios = require("axios")
let  mongoose = require('mongoose')
const cryptoModel= require("../model/cryptoModel")





let getCrypto = async function(req,res){
    try{
        let options={
            method:"get",
            url:`https://api.coincap.io/v2/assets`,
            headers:{
                Authorization : "Bearer e251a148-16a9-4178-af56-7d3839492ef2"
            }
            
        }
        let result = await axios(options)
        let details= result.data
        let coins = details.data

        let coinarr = coins.map(a=>{
            return {
                symbol:a.symbol,
                name:a.name,
                marketCapUsd:a.marketCapUsd,
                priceUsd:a.princeUsd,
                changePercent24Hr:a.changePercent24Hr
            }
        })
        coinarr = coinarr.sort((a,b)=>{
            a.changePercent24Hr-b.changePercent24Hr
        })
        await cryptoModel.deleteMany()
        
        for(let i=0; i<100; i++){
            await cryptoModel.create(coinarr[i])
        }
        let sortedCoins = await cryptoModel.find()
        return res.status(200).send({status:true, msg:sortedCoins})
    }
    catch(err){
        return  res.status(500).send({ msg: err.message })

    }
}








module.exports.getCrypto= getCrypto