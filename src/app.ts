import express, { Request } from "express"
import multer from "multer"
import path from "path"
import fs from "fs"
import cors from "cors"
import bodyParser from "body-parser"

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void
type FileFilterCallback = (error: Error | null, acceptFile: boolean) => void

const app = express()

app.use("/image", express.static("public/image"))

app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
    origin: process.env.ORIGIN,
  })
)

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    let destination = path.join(__dirname, `../${req.params[0]}`)
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true })
    }
    cb(null, destination)
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    const extension = file.originalname.toLowerCase().split(".").pop()
    const userFileName = req.body.name.toLowerCase().split(" ").join("-")
    const fileName = `${userFileName}.${extension}`
    cb(null, fileName)
  },
})

const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    if (!req.body.name) {
      return cb(new Error("Please provide a file name in the name field!"))
    }

    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error("Only .png, .jpg, and .jpeg formats are allowed!"))
    }
  },
})

app.post("/upload/*", upload.single("image"), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error("Please upload a file")
    return next(error)
  }
  res.send(file)
})

app.get("/", (req, res) => {
  res.send("Welcome to uploading image tools")
})

app.listen(8004, () => {
  console.log("Server is listening on port http://localhost:8004")
})
