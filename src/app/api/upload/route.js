// This file: src/app/api/upload/route.js
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('File');
  console.log(file);
  const data = await file.arrayBuffer();

  const {name,type} = file;
 

  const client = new S3Client({
    region:'ap-south-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
  })

  const id = uniqid();
  const ext = name.split('.').slice(-1)
  const newName = id + '.' + ext;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: newName,
    ACL: 'public-read',
    Body: data,
    ContentType: type
  })

  await client.send(command)

   return Response.json({name,newName,ext,type});
}

