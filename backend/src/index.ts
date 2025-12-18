import express from 'express'
import { signinInputs } from "@harcharan_singh_/dummy_package"

const app = express()
const port = 3000;
app.use(express.json())

app.post('/signup', (req, res) => {
    const body = req.body;
    const response = signinInputs.safeParse(body);
    console.log("body is ", body)
    console.log("response is ", response)
    try {
        if(response.success) {
            res.json({
                message: "Signup successful"
            })
        } else {
            res.json({
                message: "Something up with inputs"
            })
        }
    } catch(e) {
        console.error(e)
        res.status(403)
        res.json({
            message: "Invalid request..."
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

