import type { NextApiRequest , NextApiResponse } from "next";
import { Admin } from "@repo/db";
import jwt from "jsonwebtoken"
import { ensureDbConnected } from "@/lib/dbConnect";
const SECRET = "Se3ret"

type Data = {
     token?: string;
     message?: string;
     name?: string;
}

export default async function handler(
     req: NextApiRequest,
     res: NextApiResponse<Data>
){
     await ensureDbConnected()
     const {username , password} = req.body
     const admin = await Admin.findOne({username});
     if(admin){
          res.status(401)
     }

     res.status(200).json({token: username})  // set token here
}