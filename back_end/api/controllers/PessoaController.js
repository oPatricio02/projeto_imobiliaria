const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginAuth = require('../functions/LoginAuth');
const database = require('../models')


class PessoaController {

    static async getPessoas(req, res) {
        try {
            const allPessoas = await database.Pessoas.findAll()
            return res.status(200).json(allPessoas)
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    static async getPessoaById(req, res) {
        const { id } = req.params
        try {
            const selectedPessoas = await database.Pessoas.findOne(
                {
                    where:
                    {
                        id: Number(id)
                    }
                })
            if (selectedPessoas) { // Verifica se é nulo
                return res.status(200).json(selectedPessoas)
            } else {
                return res.status(400).json({ message: 'ID de pessoa não encontrado' })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async getPessoaByToken(req, res) {
        
        try {
            const selectedPessoasToken = await database.Pessoas.findOne(
                {
                    where:
                    {
                        id: req.app.locals.payload.loginPessoas.id
                    }
                })
            if (selectedPessoasToken) { // Verifica se é nulo
                return res.status(200).json(selectedPessoasToken)
            } else {
                return res.status(400).json({ message: 'ID de pessoa não encontrado' })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async login(req, res) {
        const loginUser = req.body;
        try {

            const loginPessoas = await database.Pessoas.findOne(
                {
                    where:
                    {
                        usuario: String(req.body.usuario)
                    }
                })
            if (loginPessoas) {
                const validationLogin = loginAuth(loginPessoas.hash, req.body.hash);
                if (!validationLogin.validation) {
                    res.status(401).json({
                        message: validationLogin.message
                    })
                }
                else {
                    const secretKey = 'teste123';
                    const token = jwt.sign({ loginPessoas }, secretKey, { expiresIn: 3600 }); //1 hora para expirar
                    
                    return res.json({ auth: true, token }).status(200)
                }
            } else {
                return res.status(400).json({ message: 'ID de pessoa não encontrado' })
            }
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    static async createPessoa(req, res) {
        const Pessoas = req.body
        req.body.hash = bcrypt.hashSync(req.body.hash, 4)
        try {
            const newPessoas = await database.Pessoas.create(Pessoas)
            return res.status(201).json(newPessoas)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async updatePessoa(req, res) {
        const { id } = req.params
        const Pessoas = req.body
        try {
            await database.Pessoas.update(Pessoas,
                {
                    where:
                    {
                        id: Number(id)
                    }
                })
            const updatedPessoas = await database.Pessoas.findOne(
                {
                    where:
                    {
                        id: Number(id)
                    }
                })
            return res.status(200).json(updatedPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updatePessoaByToken(req, res) {
        const Pessoas = req.body
        try {
            await database.Pessoas.update(Pessoas,
                {
                    where:
                    {
                        id: req.app.locals.payload.loginPessoas.id
                    }
                })
            const updatedPessoas = await database.Pessoas.findOne(
                {
                    where:
                    {
                        id: req.app.locals.payload.loginPessoas.id
                    }
                })
            return res.status(200).json(updatedPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletePessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy(
                {
                    where:
                    {
                        id: Number(id)
                    }
                })
            return res.status(200).json({ message: `Pessoa de id: ${id},deletada com sucesso` })
        } catch (error) {
            return res.status(500).json(error)
        }
    }


}

module.exports = PessoaController
