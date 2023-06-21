# upload-tools
This repo contains uploading file app into vps. This app using typescript lang.

Feel free to contribute.

## Install
- install package with npm `npm i`
- run app with `npm run dev` to run in development mode


## How to upload
- path: `/upload/{path}`
- method: *POST*
- body: 
-   type: form-data
-   key: image
-   value: file_name

Example:

```
/upload/public/image
{
   fieldname: "image",
   originalname: "sample-image.jpeg",
   filename: "sample-image.jpeg",
}
```
